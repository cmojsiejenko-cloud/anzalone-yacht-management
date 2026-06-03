/**
 * Builds a static copy of the site and zips it for email / phone sharing.
 * Output: Anzalone-Website-Preview.zip (project root)
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const apiDir = path.join(root, "src", "app", "api");
const apiBackup = path.join(root, "src", "app", "_api_export_backup");

// Recover from a previous interrupted run
if (!fs.existsSync(apiDir) && fs.existsSync(apiBackup)) {
  fs.renameSync(apiBackup, apiDir);
}
const outDir = path.join(root, "out");
const stagingName = "Anzalone-Website-Preview";
const stagingDir = path.join(root, stagingName);
const zipPath = path.join(root, "Anzalone-Website-Preview.zip");

const readme = `ANZALONE YACHT MANAGEMENT — WEBSITE PREVIEW
============================================

VIEW ON YOUR PHONE
------------------
1. Download the ZIP from your email and save it.
2. Tap the ZIP file to unzip it (iPhone Files app or Android Downloads).
3. Open the folder "${stagingName}".
4. Tap "index.html" and choose Open in Safari (iPhone) or Chrome (Android).

SHARE WITH SOMEONE ELSE
-----------------------
• Attach this same ZIP file to an email and send it.
• They unzip and open index.html the same way.

WHAT'S INCLUDED
---------------
All main pages: Home, Services, About, Contact, and every service page.
Browse using the menu — no internet required after unzip.

NOTE
----
The contact form is preview-only in this offline copy (it will not send email).
For a live site with working forms, use the hosted version.

TROUBLESHOOTING
---------------
• If a page looks blank, go back to index.html and navigate from the menu.
• Use Safari on iPhone or Chrome on Android for best results.
• Keep the whole "${stagingName}" folder together — do not move only index.html.
`;

function run(cmd, args, env = {}) {
  const result = spawnSync(cmd, args, {
    cwd: root,
    env: { ...process.env, ...env },
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function rmSafe(target) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

/** Rewrite absolute URLs so pages open from phone Files app (file://) */
function relativizeStaticExport(outDir) {
  function relPrefix(depth) {
    return depth === 0 ? "." : Array(depth).fill("..").join("/");
  }

  function walk(dir, depth) {
    const prefix = relPrefix(depth);

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "_next") continue;
        walk(full, depth + 1);
        continue;
      }

      if (!/\.(html|css|js)$/.test(entry.name)) continue;

      let content = fs.readFileSync(full, "utf8");
      const root = `${prefix}/`;

      content = content
        .replace(/"\/_next\//g, `"${root}_next/`)
        .replace(/'\/_next\//g, `'${root}_next/`)
        .replace(/"\/images\//g, `"${root}images/`)
        .replace(/'\/images\//g, `'${root}images/`)
        .replace(/"\/favicon/g, `"${root}favicon`)
        .replace(/href="\/(?!\/)/g, `href="${root}`)
        .replace(/src="\/(?!\/)/g, `src="${root}`);

      fs.writeFileSync(full, content);
    }
  }

  walk(outDir, 0);
}

console.log("\n📦 Building shareable website package...\n");

// API routes block static export — temporarily move aside
let apiMoved = false;
if (fs.existsSync(apiDir)) {
  rmSafe(apiBackup);
  try {
    fs.cpSync(apiDir, apiBackup, { recursive: true });
    fs.rmSync(apiDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    apiMoved = true;
    console.log("• Paused API routes for static export");
  } catch (err) {
    console.error(
      "\nCould not pause API routes (stop `npm run dev` and close Cursor terminals, then retry).\n",
    );
    throw err;
  }
}

try {
  rmSafe(outDir);
  rmSafe(stagingDir);
  rmSafe(zipPath);

  console.log("• Running static build (may take 1–2 minutes)...\n");
  run("npm", ["run", "build"], { STATIC_EXPORT: "1" });

  if (!fs.existsSync(outDir)) {
    console.error("Build did not produce an /out folder.");
    process.exit(1);
  }

  console.log("• Making paths work offline (phone / email preview)...");
  relativizeStaticExport(outDir);

  fs.cpSync(outDir, stagingDir, { recursive: true });
  fs.writeFileSync(path.join(stagingDir, "HOW-TO-OPEN.txt"), readme, "utf8");

  console.log("\n• Creating ZIP archive...");
  if (process.platform === "win32") {
    run("powershell", [
      "-NoProfile",
      "-Command",
      `Compress-Archive -Path '${stagingName}' -DestinationPath 'Anzalone-Website-Preview.zip' -Force`,
    ]);
  } else {
    run("zip", ["-r", "Anzalone-Website-Preview.zip", stagingName]);
  }

  rmSafe(stagingDir);

  const stats = fs.statSync(zipPath);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);

  console.log("\n✅ Done!\n");
  console.log(`   File: ${zipPath}`);
  console.log(`   Size: ${sizeMb} MB`);
  console.log("\n   Attach this ZIP to an email. Recipients unzip and open index.html.\n");
} finally {
  if (apiMoved && fs.existsSync(apiBackup)) {
    rmSafe(apiDir);
    fs.cpSync(apiBackup, apiDir, { recursive: true });
    rmSafe(apiBackup);
    console.log("• Restored API routes");
  }
}
