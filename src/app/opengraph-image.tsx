import { ImageResponse } from "next/og";
import { siteName } from "@/lib/seo";

export const dynamic = "force-static";
export const alt = `${siteName} — owner-operated yacht management`;
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
            marginBottom: 32,
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
              fontSize: 22,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#a88b4a",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Owner-Operated
          </span>
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 500,
            color: "#f7f4ef",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          {siteName}
        </div>
        <p
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#e8e4dc",
            lineHeight: 1.45,
            maxWidth: 820,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 400,
          }}
        >
          Yacht management · Maintenance · Detailing · Captain services
        </p>
        <p
          style={{
            marginTop: 20,
            fontSize: 20,
            color: "#c9a962",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          South Florida · Annapolis · Chesapeake
        </p>
      </div>
    ),
    { ...size },
  );
}
