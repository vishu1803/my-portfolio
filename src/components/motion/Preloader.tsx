"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import {animate} from "framer-motion";
import useReducedMotion from "../../hooks/useMotionPreference";
import { isLowPowerDevice } from "../../lib/motionQuality";

const IntroContext = createContext(true);
const storageKey = "portfolio-intro-seen";
export const useIntroReady = () => useContext(IntroContext);

/** First desktop visit gets a curtain; mobile retains a nonblocking monogram. */
export default function Preloader({ children }: { children: ReactNode }) {
  const counter=useRef<HTMLSpanElement>(null);
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
      reduced || isLowPowerDevice() ||
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
    const count=animate(0,100,{duration:.6,onUpdate:value=>{if(counter.current)counter.current.textContent=String(Math.round(value));}});
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
      count.stop();
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
        <span ref={counter} className="intro-counter">0</span>
        <small>OPENING THE FIELD NOTES / 2026</small>
      </div>
      {children}
    </IntroContext.Provider>
  );
}
