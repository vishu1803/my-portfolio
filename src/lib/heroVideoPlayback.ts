export function shouldStartHeroVideo(scroll: number, top: number, bottom: number, staticMode: boolean) {
  return !staticMode && scroll > 8 && top < 0 && bottom > 120;
}
export function heroVideoPlayback(started: boolean, staticMode: boolean, visible: boolean, hidden: boolean, scroll: number) {
  if (staticMode || !started || scroll <= 8) return 'poster';
  return visible && !hidden ? 'play' : 'paused';
}
