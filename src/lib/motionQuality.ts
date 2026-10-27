/** Device hints only simplify effects; they never hide portfolio content. */
export function isLowPowerDevice() {
  if (typeof navigator === "undefined") return false;
  const device = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  return !!device.connection?.saveData ||
    (device.hardwareConcurrency > 0 && device.hardwareConcurrency <= 4) ||
    (device.deviceMemory !== undefined && device.deviceMemory <= 4);
}
