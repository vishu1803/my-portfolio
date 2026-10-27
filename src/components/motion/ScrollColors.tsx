"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import gsap from "gsap";
import useScrollScene from "../../hooks/useScrollScene";
export default function ScrollColors() {
  const reduced = useReducedMotion();
  useScrollScene(undefined, !reduced, (ScrollTrigger) => {
    const scenes = [...document.querySelectorAll<HTMLElement>("[data-scene]")];
    const ctx = gsap.context(() => {
      scenes.forEach((scene, index) => {
        const colour = scene.dataset.scene!;
        const previous = scenes[index - 1]?.dataset.scene || colour;
        gsap.fromTo(
          scene,
          { backgroundColor: previous },
          {
            backgroundColor: colour,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: scene,
              start: "top 98%",
              end: "top 28%",
              scrub: 0.35,
            },
          },
        );
        ScrollTrigger.create({
          trigger: scene,
          start: "top 110px",
          end: "bottom 110px",
          onToggle: (self) => {
            if (self.isActive) {
              document.documentElement.dataset.chapterTheme =
                scene.dataset.ink || "light";
              document.documentElement.style.setProperty(
                "--chapter-bg",
                colour,
              );
            }
          },
        });
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    let live = true;
    document.fonts.ready.then(() => {
      if (live) refresh();
    });
    return () => {
      live = false;
      window.removeEventListener("load", refresh);
      ctx.revert();
      delete document.documentElement.dataset.chapterTheme;
    };
  });
  return null;
}
