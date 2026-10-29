"use client";
import SmoothScroll from "./SmoothScroll";
import ScrollColors from "./ScrollColors";
import Cursor from "./Cursor";
import ScrollDebug from './ScrollDebug';
export default function MotionSystem() {
  return (
    <>
      <SmoothScroll />
      <ScrollColors />
      <Cursor />
      <ScrollDebug />
    </>
  );
}
