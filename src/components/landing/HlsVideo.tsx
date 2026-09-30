"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface HlsVideoProps {
  src: string;
  className?: string;
  flipVertical?: boolean;
  containerClassName?: string;
}

export default function HlsVideo({
  src,
  className = "",
  flipVertical = false,
  containerClassName,
}: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 30,
      });
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Autoplay was prevented or suppressed
        });
        setIsLoaded(true);
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              hls?.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native Apple Safari HLS support
      video.src = src;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
        setIsLoaded(true);
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <div
      className={`absolute overflow-hidden pointer-events-none ${
        containerClassName || "inset-0"
      }`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
          flipVertical ? "scale-y-[-1]" : ""
        } ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
      {/* Fallback ambient gradient if video is buffering */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f18] via-[#05070c] to-bg" />
      )}
    </div>
  );
}
