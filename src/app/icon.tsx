import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#0a1628",
          borderRadius: 6,
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#c9a962",
            fontFamily: "Georgia, serif",
          }}
        >
          A
        </span>
      </div>
    ),
    { ...size },
  );
}
