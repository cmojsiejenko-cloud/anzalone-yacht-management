/**
 * Assemble the homepage cinematic reel from the four supplied source clips.
 * Sources stay in assets/hero-video-sources. The browser only receives the
 * encoded desktop, mobile, and poster files in public/video.
 */
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, "assets", "hero-video-sources");
const work = path.join(root, ".tmp-hero-build");
const outDir = path.join(root, "public", "video");

const ffmpeg = findTool("ffmpeg.exe");
const ffprobe = findTool("ffprobe.exe");

const SCENE_FADE = 0.5;
const LIFE_FADE = 0.38;
const LOOP_FADE_FRAMES = 20;
const LOOP_FADE = LOOP_FADE_FRAMES / 24;

const grade = {
  cruise:
    "eq=contrast=1.05:brightness=0.012:saturation=1.1:gamma=0.98,colorbalance=rs=0.04:gs=0.012:bs=-0.045:rm=0.022:gm=0.008:bm=-0.022:rh=0.042:gh=0.014:bh=-0.016",
  lifestyle:
    "eq=contrast=1.04:brightness=-0.008:saturation=1.05:gamma=1.02,colorbalance=rs=0.01:bs=0.015:bm=-0.008:bh=-0.014",
  care:
    "eq=contrast=1.06:brightness=0.008:saturation=1.07:gamma=0.99,colorbalance=rs=0.02:gs=0.005:bs=-0.024:rh=0.022:bh=-0.01",
  departure:
    "eq=contrast=1.04:brightness=-0.016:saturation=1.06:gamma=1.02,colorbalance=rs=-0.008:bs=0.03:bm=0.012:bh=0.018",
};

function findTool(name) {
  const winget = path.join(
    process.env.LOCALAPPDATA ?? "",
    "Microsoft",
    "WinGet",
    "Packages",
  );
  if (fs.existsSync(winget)) {
    const stack = [winget];
    while (stack.length) {
      const dir = stack.pop();
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) stack.push(full);
        else if (entry.name.toLowerCase() === name) return full;
      }
    }
  }
  return name.replace(".exe", "");
}

function run(args) {
  execFileSync(ffmpeg, args, { stdio: "inherit" });
}

function probe(file) {
  const raw = execFileSync(
    ffprobe,
    [
      "-v",
      "error",
      "-show_entries",
      "format=duration:stream=codec_type,width,height,avg_frame_rate,nb_frames",
      "-of",
      "json",
      file,
    ],
    { encoding: "utf8" },
  );
  const json = JSON.parse(raw);
  return {
    duration: Number(json.format.duration),
    streams: json.streams,
  };
}

function copySources() {
  fs.mkdirSync(sourceDir, { recursive: true });
  const mp4s = fs.readdirSync(root).filter((name) => name.toLowerCase().endsWith(".mp4"));
  const map = [
    ["tropical_waters", "01_yacht_cruising.mp4"],
    ["Mediterranean", "02_yacht_lifestyle.mp4"],
    ["Specialist_polishes", "03_yacht_care.mp4"],
    ["open_water", "04_yacht_departure.mp4"],
  ];
  const copied = {};
  for (const [needle, destName] of map) {
    const found = mp4s.find((name) => name.includes(needle));
    if (!found) throw new Error(`Missing source clip matching ${needle}`);
    const dest = path.join(sourceDir, destName);
    if (!fs.existsSync(dest) || fs.statSync(dest).size !== fs.statSync(path.join(root, found)).size) {
      fs.copyFileSync(path.join(root, found), dest);
    }
    copied[destName] = dest;
  }
  return copied;
}

function renderPair({ input, start, end, slow = 1, look, crop, tag }) {
  const desktop = path.join(work, `${tag}-d.mp4`);
  const mobile = path.join(work, `${tag}-m.mp4`);
  const pts = slow === 1 ? "PTS-STARTPTS" : `${slow}*(PTS-STARTPTS)`;
  const filter = [
    `[0:v]trim=start=${start}:end=${end},setpts=${pts},fps=24,${look},split=2[bd][bm]`,
    "[bd]scale=1280:720:flags=lanczos,setsar=1,format=yuv420p[vd]",
    `[bm]crop=405:720:${crop}:0,scale=540:960:flags=lanczos,unsharp=3:3:0.22:3:3:0.0,setsar=1,format=yuv420p[vm]`,
  ].join(";");
  const encode = ["-an", "-r", "24", "-c:v", "libx264", "-preset", "veryfast", "-crf", "10", "-pix_fmt", "yuv420p"];
  run([
    "-y",
    "-i",
    input,
    "-filter_complex",
    filter,
    "-map",
    "[vd]",
    ...encode,
    desktop,
    "-map",
    "[vm]",
    ...encode,
    mobile,
  ]);
  return { desktop, mobile };
}

function xfadeFiles(files, fade, out) {
  let current = files[0];
  for (let i = 1; i < files.length; i++) {
    const dest = i === files.length - 1 ? out : path.join(work, `${path.basename(out, ".mp4")}-${i}.mp4`);
    const dur = probe(current).duration;
    const offset = Math.max(0, dur - fade);
    run([
      "-y",
      "-i",
      current,
      "-i",
      files[i],
      "-filter_complex",
      `[0:v][1:v]xfade=transition=fade:duration=${fade}:offset=${offset.toFixed(5)},format=yuv420p[v]`,
      "-map",
      "[v]",
      "-an",
      "-r",
      "24",
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      "10",
      "-pix_fmt",
      "yuv420p",
      dest,
    ]);
    current = dest;
  }
  return current;
}

function loopSeam(input, fade, out) {
  const dur = probe(input).duration;
  const frame = 1 / 24;
  const alignedFade = Math.round(fade * 24) / 24;
  const start = alignedFade - frame;
  const offset = dur - start - alignedFade;
  if (offset <= 0) throw new Error(`Reel is too short to loop (${dur}s)`);
  run([
    "-y",
    "-i",
    input,
    "-filter_complex",
    [
      "[0:v]split=2[a][b]",
      `[a]trim=start=${start.toFixed(5)},setpts=PTS-STARTPTS,fps=24[tail]`,
      `[b]trim=start=0:end=${alignedFade.toFixed(5)},setpts=PTS-STARTPTS,fps=24[head]`,
      `[tail][head]xfade=transition=fade:duration=${alignedFade.toFixed(5)}:offset=${offset.toFixed(5)},format=yuv420p[v]`,
    ].join(";"),
    "-map",
    "[v]",
    "-an",
    "-r",
    "24",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "10",
    "-pix_fmt",
    "yuv420p",
    out,
  ]);
}

function deliver(input, out, crf) {
  run([
    "-y",
    "-i",
    input,
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    String(crf),
    "-profile:v",
    "high",
    "-level",
    "4.0",
    "-pix_fmt",
    "yuv420p",
    "-r",
    "24",
    "-movflags",
    "+faststart",
    "-color_primaries",
    "bt709",
    "-color_trc",
    "bt709",
    "-colorspace",
    "bt709",
    "-map_metadata",
    "-1",
    out,
  ]);
}

function review(file, label) {
  const dir = path.join(work, "review", label);
  fs.mkdirSync(dir, { recursive: true });
  const duration = probe(file).duration;
  run([
    "-y",
    "-i",
    file,
    "-vf",
    "fps=1/2,scale=640:-2",
    path.join(dir, "t%02d.jpg"),
  ]);
  run([
    "-y",
    "-sseof",
    "-0.05",
    "-i",
    file,
    "-frames:v",
    "1",
    "-update",
    "1",
    path.join(dir, "last.jpg"),
  ]);
  run([
    "-y",
    "-i",
    file,
    "-frames:v",
    "1",
    "-update",
    "1",
    path.join(dir, "first.jpg"),
  ]);
  const diff = path.join(dir, "loop-diff.jpg");
  run([
    "-y",
    "-i",
    path.join(dir, "first.jpg"),
    "-i",
    path.join(dir, "last.jpg"),
    "-filter_complex",
    "[0:v][1:v]blend=all_mode=difference,format=yuv420p[v]",
    "-map",
    "[v]",
    "-frames:v",
    "1",
    "-update",
    "1",
    diff,
  ]);
  const statsRun = spawnSync(
    ffmpeg,
    ["-i", diff, "-vf", "signalstats,metadata=mode=print:file=-", "-f", "null", "-"],
    { encoding: "utf8" },
  );
  const stats = `${statsRun.stdout ?? ""}\n${statsRun.stderr ?? ""}`;
  const mean = stats.match(/lavfi\.signalstats\.YAVG=([0-9.]+)/);
  return { duration, loopLumaDelta: mean ? Number(mean[1]) : null };
}

const fromLinear = process.argv.includes("--from-linear");
if (!fromLinear) {
fs.rmSync(work, { recursive: true, force: true });
fs.mkdirSync(work, { recursive: true });
}
fs.mkdirSync(outDir, { recursive: true });

const linearD = path.join(work, "linear-d.mp4");
const linearM = path.join(work, "linear-m.mp4");
if (!fromLinear) {
const sources = copySources();
const cruise = sources["01_yacht_cruising.mp4"];
const lifestyle = sources["02_yacht_lifestyle.mp4"];
const care = sources["03_yacht_care.mp4"];
const departure = sources["04_yacht_departure.mp4"];

const scene1 = renderPair({
  input: cruise,
  start: 0,
  end: 6.5,
  look: grade.cruise,
  crop: "450",
  tag: "s1",
});
const lifeShots = [
  { start: 0, end: 1.3, crop: "250", tag: "l1" },
  { start: 1.45, end: 2.6, crop: "150", tag: "l2" },
  { start: 2.74, end: 3.94, crop: "470", tag: "l3" },
  { start: 4.08, end: 5.22, crop: "270", tag: "l4" },
  { start: 6.9, end: 7.96, crop: "310", tag: "l5" },
].map((shot) =>
  renderPair({
    input: lifestyle,
    slow: 1.2,
    look: grade.lifestyle,
    ...shot,
  }),
);
const scene2 = {
  desktop: xfadeFiles(
    lifeShots.map((shot) => shot.desktop),
    LIFE_FADE,
    path.join(work, "s2-d.mp4"),
  ),
  mobile: xfadeFiles(
    lifeShots.map((shot) => shot.mobile),
    LIFE_FADE,
    path.join(work, "s2-m.mp4"),
  ),
};
const scene3 = renderPair({
  input: care,
  start: 2.1,
  end: 6.95,
  look: grade.care,
  crop: "500+52*t",
  tag: "s3",
});
const scene4 = renderPair({
  input: departure,
  start: 0.25,
  end: 7.15,
  look: grade.departure,
  crop: "420",
  tag: "s4",
});

xfadeFiles(
  [scene1.desktop, scene2.desktop, scene3.desktop, scene4.desktop],
  SCENE_FADE,
  linearD,
);
xfadeFiles(
  [scene1.mobile, scene2.mobile, scene3.mobile, scene4.mobile],
  SCENE_FADE,
  linearM,
);
}
const loopD = path.join(work, "loop-d.mp4");
const loopM = path.join(work, "loop-m.mp4");
loopSeam(linearD, LOOP_FADE, loopD);
loopSeam(linearM, LOOP_FADE, loopM);

const desktopOut = path.join(outDir, "anzalone-hero-desktop.mp4");
const mobileOut = path.join(outDir, "anzalone-hero-mobile.mp4");
const posterOut = path.join(outDir, "anzalone-hero-poster.webp");
deliver(loopD, desktopOut, 24);
deliver(loopM, mobileOut, 26);
run([
  "-y",
  "-i",
  desktopOut,
  "-frames:v",
  "1",
  "-update",
  "1",
  "-c:v",
  "libwebp",
  "-quality",
  "82",
  posterOut,
]);

const desktopReview = review(desktopOut, "desktop");
const mobileReview = review(mobileOut, "mobile");
const desktopInfo = probe(desktopOut);
const mobileInfo = probe(mobileOut);

const report = {
  desktop: {
    path: desktopOut,
    bytes: fs.statSync(desktopOut).size,
    ...desktopInfo,
    ...desktopReview,
  },
  mobile: {
    path: mobileOut,
    bytes: fs.statSync(mobileOut).size,
    ...mobileInfo,
    ...mobileReview,
  },
  poster: {
    path: posterOut,
    bytes: fs.statSync(posterOut).size,
  },
  audio: desktopInfo.streams.some((stream) => stream.codec_type === "audio"),
};
fs.writeFileSync(path.join(work, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
