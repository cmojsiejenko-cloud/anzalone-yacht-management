"use client";

import { useEffect, useState } from "react";
import { ResponsiveImage } from "@/components/ui/images/ResponsiveImage";
import { cn } from "@/lib/cn";
import type { SiteImageDefinition } from "@/lib/images";
import { imageSizes } from "@/lib/images";

const FRAME_MS = 5600;

type CinematicBackgroundProps = {
  frames: readonly SiteImageDefinition[];
  /** Public path such as `/video/hero.mp4`. Omit until the file exists. */
  videoSrc?: string | null;
  priority?: boolean;
};

export function CinematicBackground({
  frames,
  videoSrc = null,
  priority = false,
}: CinematicBackgroundProps) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const poster = frames[0];

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const playVideo = Boolean(videoSrc) && mounted && !reduceMotion && !videoFailed;
  const playStills = mounted && !reduceMotion && !playVideo && frames.length > 1;

  useEffect(() => {
    if (!playStills) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setIndex((current) => (current + 1) % frames.length);
    }, FRAME_MS);
    return () => window.clearInterval(timer);
  }, [playStills, frames.length]);

  if (!poster) return null;

  const activeIndex = reduceMotion || !mounted ? 0 : index;
  /** Mount only active + previous frame so LCP is not competing with five full-bleed images. */
  const previous =
    playStills && frames.length > 1
      ? (activeIndex - 1 + frames.length) % frames.length
      : null;
  const visibleIndexes =
    previous === null || previous === activeIndex
      ? [activeIndex]
      : [previous, activeIndex];

  return (
    <div className="absolute inset-0" aria-hidden>
      {visibleIndexes.map((frameIndex) => {
        const frame = frames[frameIndex];
        if (!frame) return null;
        return (
          <div
            key={frame.src}
            className={cn(
              "cinematic-frame absolute inset-0",
              frameIndex === activeIndex ? "opacity-100" : "opacity-0",
            )}
          >
            <ResponsiveImage
              definition={frame}
              sizes={imageSizes.hero}
              priority={priority && frameIndex === 0}
              decorative
              showPlaceholderCaption={false}
            />
          </div>
        );
      })}
      {playVideo && videoSrc && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster.src}
          onError={() => setVideoFailed(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
