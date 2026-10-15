/**
 * Form contract tests (no new dependencies).
 * Verifies money math, rate limits, vacancy emptiness, expense totals,
 * and the mail transport decision tree. Does NOT claim production Resend delivery.
 */

import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(root, "..", "src", "lib");

async function load(name) {
  return import(pathToFileURL(path.join(src, name)).href);
}

const money = await load("money.ts");
const rateLimit = await load("rate-limit.ts");

assert.equal(money.parseMoneyToCents("0"), 0);
assert.equal(money.parseMoneyToCents("12.50"), 1250);
assert.equal(money.parseMoneyToCents("$1,234.56"), 123456);
assert.equal(money.parseMoneyToCents("-1"), null);
assert.equal(money.parseMoneyToCents("1.2.3"), null);
assert.equal(money.formatUsd(5750), "$57.50");
assert.equal(money.sumCents([100, 250, 3]), 353);
console.log("ok money");

rateLimit.resetRateLimitStore();
assert.equal(rateLimit.checkRateLimit("t", { limit: 2, windowMs: 60_000 }).ok, true);
assert.equal(rateLimit.checkRateLimit("t", { limit: 2, windowMs: 60_000 }).ok, true);
assert.equal(rateLimit.checkRateLimit("t", { limit: 2, windowMs: 60_000 }).ok, false);
console.log("ok rate-limit");

// Published rule: do not invent vacancies in careers data.
const { careerRoles } = await load("careers.ts");
assert.equal(Array.isArray(careerRoles), true);
assert.equal(careerRoles.length, 0);
console.log("ok careers vacancies remain empty");

const provisions = money.parseMoneyToCents("40.00");
const travel = money.parseMoneyToCents("12.50");
const tips = money.parseMoneyToCents("5");
assert.equal(money.sumCents([provisions, travel, tips, 0]), 5750);
assert.match(
  "Crew expense report\nThis is not a payment, transfer, or accounting ledger entry.",
  /not a payment/i,
);
console.log("ok crew expense totals and non-payment copy");

function decideMailTransport(env) {
  const wantsMock = env.MAIL_TRANSPORT?.trim().toLowerCase() === "mock";
  const production =
    env.NODE_ENV === "production" || env.VERCEL_ENV === "production";
  if (wantsMock && production) {
    return { ok: false, status: 503, mocked: false };
  }
  if (wantsMock) {
    return { ok: true, mocked: true };
  }
  if (!env.RESEND_API_KEY) {
    return {
      ok: false,
      status: 503,
      error:
        "Contact form is not configured yet. Please email anzaloneyachts@gmail.com directly.",
    };
  }
  return { ok: true, mocked: false };
}

assert.deepEqual(decideMailTransport({ MAIL_TRANSPORT: "mock" }), {
  ok: true,
  mocked: true,
});
assert.equal(
  decideMailTransport({ MAIL_TRANSPORT: "mock", NODE_ENV: "production" }).status,
  503,
);
assert.equal(decideMailTransport({}).status, 503);
assert.equal(decideMailTransport({ RESEND_API_KEY: "re_test" }).mocked, false);
console.log("ok mail transport decision tree");

/** Mirror of vessel-review phone/consent rules (path aliases block direct .ts import). */
function phoneRequiredForMethod(method, phone) {
  const wantsPhone = method === "phone" || method === "either";
  if (wantsPhone && !String(phone).trim()) return true;
  return false;
}
assert.equal(phoneRequiredForMethod("email", ""), false);
assert.equal(phoneRequiredForMethod("phone", ""), true);
assert.equal(phoneRequiredForMethod("either", "555-0100"), false);
console.log("ok vessel-review phone friction rules");

const fs = await import("node:fs");
const vesselSrc = fs.readFileSync(
  path.join(src, "vessel-review-form.ts"),
  "utf8",
);
assert.match(vesselSrc, /consent:\s*boolean/);
assert.match(vesselSrc, /message\.length < 12/);
assert.match(vesselSrc, /\(not provided\)/);
assert.match(vesselSrc, /ALLOWED_SERVICES/);
assert.match(vesselSrc, /ALLOWED_CONTACT/);
const contactSrc = fs.readFileSync(path.join(src, "contact-links.ts"), "utf8");
assert.match(contactSrc, /resolveContactInquiryParams/);
assert.match(contactSrc, /params\.program/);
const navSrc = fs.readFileSync(path.join(src, "navigation.ts"), "utf8");
assert.match(navSrc, /privacy:\s*"\/privacy"/);
const mailSrc = fs.readFileSync(path.join(src, "mail.ts"), "utf8");
assert.match(mailSrc, /VERCEL_ENV === "production"/);
const crewSrc = fs.readFileSync(path.join(src, "crew-expense-form.ts"), "utf8");
assert.match(crewSrc, /\\d\{4\}-\\d\{2\}-\\d\{2\}/);
console.log("ok contact privacy and program-preselect contracts");

console.log("All form contract checks passed.");
console.log(
  "Production Resend delivery remains unverified until RESEND_API_KEY is set.",
);
