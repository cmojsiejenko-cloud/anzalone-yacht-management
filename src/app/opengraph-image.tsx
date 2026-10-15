import { ImageResponse } from "next/og";
import { company } from "@/lib/company";
import { siteName } from "@/lib/seo";

export const dynamic = "force-static";
export const alt = `${siteName} — ${company.logoTagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
          height: "100%",
          background: "linear-gradient(145deg, #060d18 0%, #0a1628 45%, #12243d 100%)",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 64,
              height: 2,
              background: "#c9a962",
              marginRight: 24,
            }}
          />
          <span
            style={{
              fontSize: 20,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#a88b4a",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            {company.logoTagline}
          </span>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 500,
            color: "#f7f4ef",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 980,
          }}
        >
          {company.shortName}
        </div>
        <p
          style={{
            marginTop: 16,
            fontSize: 28,
            color: "#dbc48a",
            lineHeight: 1.3,
            maxWidth: 900,
            fontFamily: "Georgia, serif",
          }}
        >
          {company.tagline}
        </p>
        <p
          style={{
            marginTop: 24,
            fontSize: 22,
            color: "#e8e4dc",
            lineHeight: 1.45,
            maxWidth: 820,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 400,
          }}
        >
          Full Service Yacht Management · South Florida · Chesapeake · Annapolis
        </p>
      </div>
    ),
    { ...size },
  );
}
