"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useEffect, useRef } from "react";

import gsap from "gsap";
export default function TerminalHeading({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = ref.current;
    if (
      !node ||
      reduced ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const state = { letters: 0 };
    node.textContent = "";
    const tween = gsap.to(state, {
      letters: text.length,
      duration: text.length * .028,
      delay: 0.2,
      ease: "none",
      onUpdate: () => {
        node.textContent = text.slice(0, Math.floor(state.letters));
      },
    });
    const caret = node.parentElement?.querySelector<HTMLElement>(".terminal-caret");
    const fade = caret ? gsap.delayedCall(text.length * .028 + 1.7, () => {
      caret.style.animation = "none";
      gsap.to(caret, { opacity: 0, duration: .3 });
    }) : undefined;
    return () => {
      tween.kill(); fade?.kill();
      if (caret) { gsap.killTweensOf(caret); caret.style.animation = ""; caret.style.opacity = ""; }
      node.textContent = text;
    };
  }, [text, reduced]);
  return (
    <h2 className="terminal-heading">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" ref={ref}>
        {text}
      </span>
      <span className="terminal-caret" aria-hidden="true">
        ▋
      </span>
    </h2>
  );
}
