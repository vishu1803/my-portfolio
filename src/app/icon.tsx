import { ImageResponse } from "next/og";
import PortfolioMark from "../components/branding/PortfolioMark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<PortfolioMark size={size.width} />, size);
}
