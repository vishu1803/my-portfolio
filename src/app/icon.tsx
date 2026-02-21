import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #0d0d1a 0%, #111127 100%)",
                    borderRadius: 6,
                }}
            >
                <span
                    style={{
                        fontSize: 16,
                        fontWeight: 900,
                        background: "linear-gradient(135deg, #4F8EF7, #7C5CFC, #E879A8)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        letterSpacing: -1,
                    }}
                >
                    VN
                </span>
            </div>
        ),
        { ...size }
    );
}
