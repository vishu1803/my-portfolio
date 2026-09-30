import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0e1117 0%, #060709 100%)",
          borderRadius: 40,
          border: "2px solid rgba(137, 170, 204, 0.4)",
          position: "relative",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(78, 133, 191, 0.3)",
            filter: "blur(20px)",
          }}
        />

        {/* Monogram V */}
        <span
          style={{
            fontSize: 104,
            fontWeight: 800,
            fontFamily: "system-ui, -apple-system, sans-serif",
            background: "linear-gradient(180deg, #FFFFFF 0%, #89AACC 60%, #4E85BF 100%)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: -6,
          }}
        >
          V
        </span>

        {/* Top-right subtle accent spark */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#89AACC",
            boxShadow: "0 0 16px #89AACC",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
