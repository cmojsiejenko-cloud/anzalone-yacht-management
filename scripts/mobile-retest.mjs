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

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const issues = [];

for (const width of widths) {
  await page.setViewportSize({ width, height: width < 768 ? 844 : 1024 });
  for (const route of routes) {
    const res = await page.goto(`${base}${route}`, {
      waitUntil: "load",
      timeout: 60000,
    });
    await page.waitForTimeout(350);
    const r = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflowX =
        Math.max(doc.scrollWidth, document.body.scrollWidth) - doc.clientWidth;
      const logo = document.querySelector(".brand-logo img")?.getBoundingClientRect();
      const h1 = document.querySelector("h1");
      return {
        overflowX: Math.max(0, overflowX),
        logoW: logo ? Math.round(logo.width) : null,
        logoH: logo ? Math.round(logo.height) : null,
        clippedH1: h1
          ? h1.scrollWidth > h1.clientWidth + 2 ||
            h1.getBoundingClientRect().right > doc.clientWidth + 1
          : false,
        h1: h1?.textContent?.trim()?.slice(0, 50) ?? null,
      };
    });
    const status = res?.status() ?? 0;
    if (status >= 500) issues.push({ width, route, type: "http", detail: status });
    if (r.overflowX > 1) {
      issues.push({
        width,
        route,
        type: "overflow",
        detail: r.overflowX,
        logo: [r.logoW, r.logoH],
      });
    }
    if (r.clippedH1) issues.push({ width, route, type: "clipped-h1", detail: r.h1 });
    if (r.logoW && r.logoW > Math.min(width - 24, 220)) {
      issues.push({ width, route, type: "logo-wide", detail: r.logoW });
    }
  }
}

await page.setViewportSize({ width: 375, height: 812 });
await page.goto(`${base}/`, { waitUntil: "load" });
await page.waitForTimeout(300);
await page.click('button[aria-label="Open menu"]');
await page.waitForTimeout(450);
const menu = await page.evaluate(() => {
  const p = document.querySelector(".mobile-menu-panel");
  const r = p.getBoundingClientRect();
  return {
    h: Math.round(r.height),
    top: Math.round(r.top),
    open: p.classList.contains("is-open"),
  };
});

await page.goto(`${base}/careers`, { waitUntil: "load" });
await page.waitForTimeout(300);
const careersForm = await page.evaluate(() => {
  const name = document.querySelector('input[name="name"]');
  const file = document.querySelector('input[type="file"]');
  const nr = name?.getBoundingClientRect();
  const fr = file?.getBoundingClientRect();
  return {
    nameH: nr ? Math.round(nr.height) : null,
    nameFont: name ? getComputedStyle(name).fontSize : null,
    fileH: fr ? Math.round(fr.height) : null,
    overflowX:
      Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) -
      document.documentElement.clientWidth,
  };
});

await browser.close();
console.log(JSON.stringify({ issueCount: issues.length, issues, menu, careersForm }, null, 2));
process.exit(issues.length ? 1 : 0);
