"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ResponsiveImage } from "@/components/ui/images/ResponsiveImage";
import { cn } from "@/lib/cn";
import type { SiteImageDefinition } from "@/lib/images";
import { imageSizes } from "@/lib/images";

/** Hold each plate long enough to read as a shot, not a slide. */
const HOLD_MS = 7800;
/** Slightly longer than the 1800ms opacity transition so the plate is gone before unmount. */
const FADE_MS = 2000;
const WATCH_MS = 400;
/** Arm the next plate even if the poster's load event is missed. */
const PRELOAD_FALLBACK_MS = 2500;

type HeroVideo = {
  desktop: string;
  mobile: string;
  poster: string;
};

type CinematicBackgroundProps = {
  frames: readonly SiteImageDefinition[];
  /** Pre-assembled reel. Omit to keep the still sequence. */
  video?: HeroVideo | null;
  priority?: boolean;
};

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

type FrameRole = "outgoing" | "live" | "preload";

function visibleVariant(
  frame: SiteImageDefinition | undefined,
): "mobile" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  const wide = window.matchMedia("(min-width: 1024px)").matches;
  if (!wide && frame?.mobileSrc) return "mobile";
  return "desktop";
}

function prefersStillHero() {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reducedData = window.matchMedia("(prefers-reduced-data: reduce)").matches;
  const connection = (
    navigator as Navigator & { connection?: NetworkInformation }
  ).connection;
  const slowNetwork =
    connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g";
  return motion || reducedData || Boolean(connection?.saveData) || Boolean(slowNetwork);
}

export function CinematicBackground({
  frames,
  video = null,
  priority = false,
}: CinematicBackgroundProps) {
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [holdStill, setHoldStill] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [posterReady, setPosterReady] = useState(false);
  const indexRef = useRef(0);
  const loadedRef = useRef<Set<number>>(new Set());
  const holdUntilRef = useRef(0);
  const poster = frames[0];

  const failVideo = useCallback(() => setVideoFailed(true), []);

  useEffect(() => {
    setMounted(true);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const data = window.matchMedia("(prefers-reduced-data: reduce)");
    const connection = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;
    const apply = () => setHoldStill(prefersStillHero());
    apply();
    motion.addEventListener("change", apply);
    data.addEventListener("change", apply);
    connection?.addEventListener?.("change", apply);
    return () => {
      motion.removeEventListener("change", apply);
      data.removeEventListener("change", apply);
      connection?.removeEventListener?.("change", apply);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = window.setTimeout(() => setPosterReady(true), PRELOAD_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [mounted]);

  const playVideo = Boolean(video) && mounted && !holdStill && !videoFailed;
  const playStills = mounted && !holdStill && !playVideo && frames.length > 1;

  const markLoaded = useCallback(
    (frameIndex: number, variant: "mobile" | "desktop") => {
      if (visibleVariant(frames[frameIndex]) !== variant) return;
      loadedRef.current.add(frameIndex);
      if (frameIndex === 0) setPosterReady(true);
    },
    [frames],
  );

  useEffect(() => {
    if (!playStills) return;
    holdUntilRef.current = performance.now() + HOLD_MS;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      if (performance.now() < holdUntilRef.current) return;
      const count = frames.length;
      if (count < 2) return;
      const current = indexRef.current;
      const next = (current + 1) % count;
      if (!loadedRef.current.has(next)) return;
      setOutgoing(current);
      indexRef.current = next;
      setIndex(next);
      holdUntilRef.current = performance.now() + HOLD_MS;
    }, WATCH_MS);
    return () => window.clearInterval(timer);
  }, [playStills, frames.length]);

  useEffect(() => {
    if (outgoing === null) return;
    const timer = window.setTimeout(() => setOutgoing(null), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [outgoing]);

  if (!poster) return null;

  const activeIndex = holdStill || !mounted ? 0 : index;
  const nextIndex =
    playStills && posterReady && frames.length > 1
      ? (activeIndex + 1) % frames.length
      : null;

  const slots: { frameIndex: number; role: FrameRole }[] = [];
  if (outgoing !== null && outgoing !== activeIndex && frames[outgoing]) {
    slots.push({ frameIndex: outgoing, role: "outgoing" });
  }
  slots.push({ frameIndex: activeIndex, role: "live" });
  if (nextIndex !== null && nextIndex !== activeIndex && nextIndex !== outgoing) {
    slots.push({ frameIndex: nextIndex, role: "preload" });
  }

  return (
    <div className="absolute inset-0 bg-navy-950" aria-hidden>
      {slots.map((slot) => {
        const frame = frames[slot.frameIndex];
        if (!frame) return null;
        const live = slot.role === "live";
        return (
          <div
            key={frame.src}
            className={cn(
              "cinematic-frame absolute inset-0",
              live ? "opacity-100" : "opacity-0",
            )}
          >
            <ResponsiveImage
              definition={frame}
              sizes={imageSizes.hero}
              priority={priority && slot.frameIndex === 0}
              decorative
              showPlaceholderCaption={false}
              artDirection="lg"
              imgClassName={cn("cinematic-still", live && playStills && "is-live")}
              onVariantLoad={(variant) => markLoaded(slot.frameIndex, variant)}
            />
          </div>
        );
      })}
      {playVideo && video ? (
        <HeroReel
          desktop={video.desktop}
          mobile={video.mobile}
          poster={video.poster}
          onFail={failVideo}
        />
      ) : null}
    </div>
  );
}

function HeroReel({
  desktop,
  mobile,
  poster,
  onFail,
}: {
  desktop: string;
  mobile: string;
  poster: string;
  onFail: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [shownSrc, setShownSrc] = useState<string | null>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const apply = () => setSrc(wide.matches ? desktop : mobile);
    apply();
    wide.addEventListener("change", apply);
    return () => wide.removeEventListener("change", apply);
  }, [desktop, mobile]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("playsinline", "");
    const attempt = video.play();
    if (attempt) {
      attempt.catch((error: unknown) => {
        const name = error instanceof DOMException ? error.name : "";
        if (name === "AbortError") return;
        onFail();
      });
    }
  }, [src, onFail]);

  if (!src) return null;

  return (
    <video
      key={src}
      ref={ref}
      className={cn(
        "cinematic-video pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover",
        shownSrc === src && "is-playing",
      )}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      disablePictureInPicture
      controls={false}
      onPlaying={() => setShownSrc(src)}
      onError={onFail}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
