/** Clamp actual card offsets: equal fractions drift when panels have different widths. */
export function caseRailStops(offsets: number[], distance: number) {
  return offsets.map(offset => Math.max(0, Math.min(distance, offset)));
}
export function activeCase(stops: number[], position: number) {
  let active = 0;
  stops.forEach((stop, index) => {
    if (Math.abs(stop - position) < Math.abs((stops[active] ?? 0) - position)) active = index;
  });
  return active;
}
