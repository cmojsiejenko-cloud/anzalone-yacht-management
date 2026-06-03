import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ContainerSize = "narrow" | "default" | "wide" | "full";

const sizeClasses: Record<ContainerSize, string> = {
  narrow: "container-narrow",
  default: "container-default",
  wide: "container-wide",
  full: "w-full max-w-none",
};

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
};

export function Container<T extends ElementType = "div">({
  as,
  size = "wide",
  className,
  children,
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component className={cn(sizeClasses[size], className)}>
      {children}
    </Component>
  );
}
