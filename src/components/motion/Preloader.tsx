"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useReducedMotion from "../../hooks/useMotionPreference";

const IntroContext = createContext(true);
const storageKey = "portfolio-intro-seen";
export const useIntroReady = () => useContext(IntroContext);

/** First desktop visit gets a curtain; mobile retains a nonblocking monogram. */
export default function Preloader({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState("checking");
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    let repeated = false;
    try {
      repeated = sessionStorage.getItem(storageKey) === "1";
    } catch {
      // Storage may be disabled; the intro must still finish.
    }
    if (
      reduced ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      repeated
    ) {
      setReady(true);
      setPhase("done");
      return;
    }
    const mobile = matchMedia("(pointer:coarse)").matches;
    setPhase("playing");
    if (mobile) setReady(true);
    const curtain = window.setTimeout(() => setPhase("leaving"), 600);
    const complete = window.setTimeout(() => {
      setPhase("done");
      setReady(true);
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {
        /* Optional storage. */
      }
    }, 950);
    return () => {
      clearTimeout(curtain);
      clearTimeout(complete);
    };
  }, [reduced]);
  return (
    <IntroContext.Provider value={ready}>
      <div
        className={`monogram-preloader intro-${phase}`}
        aria-hidden="true"
        data-intro-state={phase}
      >
        <span>
          v<span>*</span>n
        </span>
        <small>OPENING THE FIELD NOTES / 2026</small>
      </div>
      {children}
    </IntroContext.Provider>
  );
}
