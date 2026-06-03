import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

/** Pin workspace root so parent lockfiles do not break webpack chunk paths */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** Set STATIC_EXPORT=1 when running npm run package:share (offline ZIP for email) */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        turbopack: {
          root: projectRoot,
        },
        images: {
          formats: ["image/avif", "image/webp"],
          deviceSizes: [640, 750, 828, 1080, 1200, 1920],
          imageSizes: [256, 384, 512],
          minimumCacheTTL: 60 * 60 * 24 * 30,
        },
      }),
  poweredByHeader: false,
};

export default nextConfig;
