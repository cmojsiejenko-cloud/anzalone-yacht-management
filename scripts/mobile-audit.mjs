/**
 * Mobile layout audit against a running Next server.
 * Usage: node scripts/mobile-audit.mjs [baseUrl]
 * Requires: playwright (npx / local)
 */

import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const widths = [320, 360, 375, 390, 430, 768];
const routes = [
  "/",
  "/services",
  "/field-services",
  "/yacht-management",
  "/maintenance-detailing",
  "/captain-crew-services",
  "/refit-custom-work",
  "/brokerage-support",
  "/programs",
  "/programs/field-care",
  "/programs/management",
  "/programs/projects",
  "/about",
  "/careers",
  "/crew",
  "/contact",
  "/this-page-does-not-exist",
];

async function auditPage(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const overflowX =
      Math.max(doc.scrollWidth, body.scrollWidth) - doc.clientWidth;
    const offenders = [];
    const nodes = document.querySelectorAll("body *");
    for (const el of nodes) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) continue;
      if (rect.right > doc.clientWidth + 1 || rect.left < -1) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && String(el.className).slice?.(0, 80)) || "",
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          w: Math.round(rect.width),
        });
        if (offenders.length >= 8) break;
      }
    }

    const smallTargets = [];
    const interactive = document.querySelectorAll(
      "a[href], button, input, select, textarea, [role='button'], [role='menuitem']",
    );
    for (const el of interactive) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) continue;
      // Ignore elements far below the fold measurement window noise
      if (rect.top > window.innerHeight * 4) continue;
      if (rect.height < 40 || rect.width < 40) {
        const label =
          el.getAttribute("aria-label") ||
          el.textContent?.trim().slice(0, 40) ||
          el.tagName;
        smallTargets.push({
          label,
          w: Math.round(rect.width),
          h: Math.round(rect.height),
        });
        if (smallTargets.length >= 10) break;
      }
    }

    const h1 = document.querySelector("h1");
    const h1Rect = h1?.getBoundingClientRect();
    const clippedH1 = h1
      ? h1.scrollWidth > h1.clientWidth + 2 ||
        (h1Rect && h1Rect.right > doc.clientWidth + 1)
      : false;

    const logo = document.querySelector(".brand-logo img");
    const logoRect = logo?.getBoundingClientRect();

    return {
      overflowX: Math.max(0, overflowX),
      offenders,
      smallTargets,
      clippedH1,
      title: document.title,
      h1: h1?.textContent?.trim() ?? null,
      logo: logoRect
        ? { w: Math.round(logoRect.width), h: Math.round(logoRect.height) }
        : null,
    };
  });
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const issues = [];

for (const width of widths) {
  await page.setViewportSize({ width, height: width < 768 ? 844 : 1024 });
  for (const route of routes) {
    const url = `${base}${route}`;
    try {
      const response = await page.goto(url, {
        waitUntil: "networkidle",
        timeout: 60000,
      });
      // Ensure Tailwind/CSS has painted before measuring
      await page.waitForFunction(
        () => {
          const logo = document.querySelector(".brand-logo img");
          if (!logo) return true;
          const r = logo.getBoundingClientRect();
          return r.width > 0 && r.width < 400;
        },
        { timeout: 10000 },
      ).catch(() => {});
      await page.waitForTimeout(150);
      const result = await auditPage(page);
      const status = response?.status() ?? 0;
      if (result.overflowX > 1) {
        issues.push({
          width,
          route,
          type: "overflow",
          detail: `${result.overflowX}px`,
          offenders: result.offenders,
          logo: result.logo,
        });
      }
      if (result.clippedH1) {
        issues.push({
          width,
          route,
          type: "clipped-h1",
          detail: result.h1,
        });
      }
      if (width <= 430) {
        const bad = result.smallTargets.filter(
          (t) =>
            t.h < 36 &&
            !String(t.label).toLowerCase().includes("skip") &&
            !String(t.label).toLowerCase().includes("next.js"),
        );
        if (bad.length) {
          issues.push({
            width,
            route,
            type: "small-targets",
            detail: bad.slice(0, 5),
          });
        }
      }
      if (status >= 500) {
        issues.push({ width, route, type: "http", detail: status });
      }
    } catch (error) {
      issues.push({
        width,
        route,
        type: "error",
        detail: String(error.message ?? error),
      });
    }
  }
}

await browser.close();

const summary = {
  base,
  widths,
  routeCount: routes.length,
  issueCount: issues.length,
  issues,
};

console.log(JSON.stringify(summary, null, 2));
process.exit(
  issues.some(
    (i) => i.type === "overflow" || i.type === "http" || i.type === "error",
  )
    ? 1
    : 0,
);
