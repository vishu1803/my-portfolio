"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type * as MatterTypes from "matter-js";
import useAccessibleDialog from "../../hooks/useAccessibleDialog";
const WORDS = ["SHIP", "TOGETHER", "HELLO", "LET’S", "BUILD", "TALK"];
export default function PhysicsBurst({
  onComplete,
  onCancel,
}: {
  onComplete: () => void;
  onCancel: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const surface = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLButtonElement | null)[]>([]);
  const done = useRef(onComplete);
  done.current = onComplete;
  const cancel = useRef(onCancel);
  cancel.current = onCancel;
  const dialog = useAccessibleDialog(mounted, () => cancel.current());
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted || !surface.current) return;
    const root = surface.current;
    let disposed = false,
      frame = 0,
      timer = 0,
      dragging = false,
      pending = false;
    let engine: MatterTypes.Engine | undefined;
    let constraint: MatterTypes.Constraint | undefined;
    let bodies: MatterTypes.Body[] = [];
    let sizes: { width: number; height: number }[] = [];
    let Matter: typeof MatterTypes | undefined;
    let lastPoint = { x: 0, y: 0, time: 0 };
    let velocity = { x: 0, y: 0 };
    const complete = () => {
      if (dragging) {
        pending = true;
        return;
      }
      done.current();
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        clearTimeout(timer);
      } else {
        last = performance.now();
        if (engine) frame = requestAnimationFrame(paint);
        timer = window.setTimeout(complete, 800);
      }
    };
    let last = performance.now();
    const paint = (time: number) => {
      frame = 0;
      if (disposed || document.hidden || !engine || !Matter) return;
      Matter.Engine.update(
        engine,
        Math.min(1000 / 60, Math.max(1, time - last)),
      );
      last = time;
      bodies.forEach((body, index) => {
        const node = nodes.current[index];
        if (node)
          node.style.transform = `translate3d(${body.position.x - sizes[index].width / 2}px,${body.position.y - sizes[index].height / 2}px,0) rotate(${body.angle}rad)`;
      });
      frame = requestAnimationFrame(paint);
    };
    const down = (event: PointerEvent) => {
      const element = (event.target as Element).closest<HTMLButtonElement>(
        "[data-word-index]",
      );
      if (!element || !Matter || !engine) return;
      const body = bodies[Number(element.dataset.wordIndex)];
      if (!body) return;
      dragging = true;
      root.dataset.dragging = "true";
      root.setPointerCapture(event.pointerId);
      lastPoint = {
        x: event.clientX,
        y: event.clientY,
        time: performance.now(),
      };
      constraint = Matter.Constraint.create({
        pointA: { x: event.clientX, y: event.clientY },
        bodyB: body,
        pointB: { x: 0, y: 0 },
        stiffness: 0.18,
        damping: 0.12,
        length: 0,
      });
      Matter.Composite.add(engine.world, constraint);
    };
    const move = (event: PointerEvent) => {
      if (!constraint) return;
      constraint.pointA = { x: event.clientX, y: event.clientY };
      velocity = {
        x: event.clientX - lastPoint.x,
        y: event.clientY - lastPoint.y,
      };
      lastPoint = {
        x: event.clientX,
        y: event.clientY,
        time: performance.now(),
      };
    };
    const up = (event: PointerEvent) => {
      if (!constraint || !Matter || !engine) return;
      const body = constraint.bodyB!;
      Matter.Composite.remove(engine.world, constraint);
      constraint = undefined;
      Matter.Body.setVelocity(body, {
        x: Math.max(-18, Math.min(18, velocity.x)),
        y: Math.max(-18, Math.min(18, velocity.y)),
      });
      dragging = false;
      root.dataset.dragging = "false";
      if (root.hasPointerCapture(event.pointerId))
        root.releasePointerCapture(event.pointerId);
      if (pending) {
        pending = false;
        timer = window.setTimeout(complete, 350);
      }
    };
    const throwWord = (event: MouseEvent) => {
      if (!Matter || !engine || dragging) return;
      const target = (event.target as Element).closest<HTMLElement>(
        "[data-word-index]",
      );
      if (!target) return;
      const body = bodies[Number(target.dataset.wordIndex)];
      if (body)
        Matter.Body.applyForce(body, body.position, {
          x: (Number(target.dataset.wordIndex) % 2 ? 1 : -1) * 0.025,
          y: -0.035,
        });
    };
    if (matchMedia("(pointer:coarse)").matches) {
      root.dataset.physics = "touch";
      timer = window.setTimeout(complete, 1200);
    } else {
      import("matter-js")
        .then(async (module) => {
          await document.fonts.ready;
          if (disposed) return;
          Matter = module.default;
          engine = Matter.Engine.create({ enableSleeping: true });
          engine.gravity.y = 0.18;
          const width = innerWidth,
            height = innerHeight;
          const walls = [
            Matter.Bodies.rectangle(width / 2, height + 28, width + 100, 56, {
              isStatic: true,
            }),
            Matter.Bodies.rectangle(width / 2, -28, width + 100, 56, {
              isStatic: true,
            }),
            Matter.Bodies.rectangle(-28, height / 2, 56, height + 100, {
              isStatic: true,
            }),
            Matter.Bodies.rectangle(width + 28, height / 2, 56, height + 100, {
              isStatic: true,
            }),
          ];
          sizes = nodes.current.map((node) => ({
            width: node!.offsetWidth,
            height: node!.offsetHeight,
          }));
          bodies = nodes.current.map((node, index) => {
            const angle = -Math.PI + (index * Math.PI) / 3;
            const body = Matter!.Bodies.rectangle(
              width * 0.55 + Math.cos(angle) * 36,
              height * 0.5 + Math.sin(angle) * 20,
              node!.offsetWidth,
              node!.offsetHeight,
              {
                restitution: 0.7,
                friction: 0.15,
                frictionAir: 0.015,
                angle: (index - 2.5) * 0.12,
              },
            );
            Matter!.Body.setVelocity(body, {
              x: Math.cos(angle) * 9,
              y: Math.sin(angle) * 8 - 2,
            });
            Matter!.Body.setAngularVelocity(body, (index % 2 ? 1 : -1) * 0.045);
            return body;
          });
          Matter.Composite.add(engine.world, [...walls, ...bodies]);
          root.dataset.physics = "running";
          last = performance.now();
          frame = requestAnimationFrame(paint);
          timer = window.setTimeout(complete, 1200);
        })
        .catch(() => {
          if (!disposed) {
            root.dataset.physics = "fallback";
            timer = window.setTimeout(complete, 600);
          }
        });
    }
    root.addEventListener("pointerdown", down);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerup", up);
    root.addEventListener("pointercancel", up);
    root.addEventListener("click", throwWord);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      disposed = true;
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerup", up);
      root.removeEventListener("pointercancel", up);
      root.removeEventListener("click", throwWord);
      document.removeEventListener("visibilitychange", onVisibility);
      if (engine && Matter) {
        Matter.Composite.clear(engine.world, false);
        Matter.Engine.clear(engine);
      }
    };
  }, [mounted]);
  if (!mounted) return null;
  return createPortal(
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label="A few words before we talk"
      tabIndex={-1}
      className="physics-burst"
      data-lenis-prevent
    >
      <div ref={surface} className="physics-surface">
        <p className="micro-label physics-caption">
          A few words before the next chapter.
          <br />
          Drag or throw a word. The conversation follows.
        </p>
        {WORDS.map((word, index) => (
          <button
            type="button"
            ref={(node) => {
              nodes.current[index] = node;
            }}
            data-word-index={index}
            data-cursor="drag"
            className={`physics-word physics-word-${index}`}
            style={{ "--word-index": index } as React.CSSProperties}
            aria-label={`Throw word ${word}`}
            key={word}
          >
            {word}
          </button>
        ))}
      </div>
      <div className="physics-controls">
        <button type="button" onClick={() => done.current()}>
          Skip to contact ↗
        </button>
        <button
          type="button"
          data-dialog-close
          aria-label="Cancel word animation"
          onClick={() => cancel.current()}
        >
          Close ×
        </button>
      </div>
    </div>,
    document.body,
  );
}
