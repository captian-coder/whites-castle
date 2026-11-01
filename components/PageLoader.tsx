"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function PageLoader() {
  const [mounted, setMounted] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // 750ms tak heartbeat animation chalta hai
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 750);

    // 1050ms par loader DOM se remove hota hai
    const removeTimer = setTimeout(() => {
      setMounted(false);
    }, 1050);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#f5b335] transition-opacity duration-300 ease-in-out ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Inline Keyframe for Exact Video Breathing Scale */}
      <style jsx global>{`
        @keyframes videoPulse {
          0% {
            transform: scale(0.95);
          }
          50% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(0.95);
          }
        }
        .animate-video-pulse {
          animation: videoPulse 1.2s ease-in-out infinite;
        }
      `}</style>

      {/* Center White Rounded Card */}
      <div className="animate-video-pulse flex h-28 w-28 items-center justify-center rounded-[28px] bg-white p-4 shadow-[0_12px_35px_rgba(0,0,0,0.15)] sm:h-32 sm:w-32">
        <div className="relative h-20 w-20 sm:h-22 sm:w-22">
          <Image
            src="/images/logo.png" // Agar public folder me logo ka naam /logo.png hai to wahi rakhein
            alt="White's Castle"
            fill
            priority
            sizes="128px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}