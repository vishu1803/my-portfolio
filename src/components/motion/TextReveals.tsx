"use client";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { isLowPowerDevice } from "../../lib/motionQuality";
import useReducedMotion from "../../hooks/useChapterMotion";

type Kind = "line" | "blur" | "marker";
function Reveal({
  children,
  kind,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  kind: Kind;
  className?: string;
  delay?: number;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = root.current;
    if (
      !node ||
      reduced || isLowPowerDevice() ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const content = node.querySelector<HTMLElement>("[data-reveal-content]")!;
    const target =
      kind === "marker"
        ? node.querySelector<HTMLElement>(".reveal-marker-ink")!
        : content;
    const from =
      kind === "line"
        ? { yPercent: 110, opacity: 0 }
        : kind === "blur"
          ? { filter: "blur(12px)", opacity: 0, y: 10 }
          : { scaleX: 0 };
    const to =
      kind === "marker"
        ? { scaleX: 1 }
        : { yPercent: 0, y: 0, opacity: 1, filter: "blur(0px)" };
    const context = gsap.context(() => {}, node);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        context.add(() =>
          gsap.fromTo(target, from, {
            ...to,
            duration: kind === "marker" ? 0.8 : 0.7,
            delay,
            ease: "power3.out",
          }),
        );
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      context.revert();
    };
  }, [kind, reduced, delay]);
  return (
    <span
      ref={root}
      className={`text-reveal reveal-${kind} ${className}`}
      data-reveal={kind}
    >
      {kind === "marker" && (
        <span aria-hidden="true" className="reveal-marker-ink" />
      )}
      <span data-reveal-content>{children}</span>
    </span>
  );
}
export const LineReveal = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <Reveal kind="line" className={className}>
    {children}
  </Reveal>
);
export const BlurIn = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <Reveal kind="blur" className={className}>
    {children}
  </Reveal>
);
export const MarkerSweep = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <Reveal kind="marker" className="marker-sweep" delay={delay}>
    {children}
  </Reveal>
);
