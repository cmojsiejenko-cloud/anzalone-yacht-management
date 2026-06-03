"use client";

import {
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds */
  delay?: number;
  as?: ElementType;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
