"use client";

import { useEffect, useState } from "react";
import { ChevronUp, Search } from "lucide-react";

export function FloatingActions() {
  const [showFloatingSearch, setShowFloatingSearch] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // 1. Scroll-to-Top: 200px ke baad show hoga
      setShowScrollTop(currentY > 200);

      // 2. Floating Search Button: Shuru me hamesha HIDDEN rahega!
      // Jab user page ko 380px se neeche scroll karega (search bar screen se guzar chuka hoga),
      // sirf tabhi floating search button appear hoga.
      if (currentY > 380) {
        setShowFloatingSearch(true);
      } else {
        setShowFloatingSearch(false);
      }
    };

    // Shuru me check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScrollToSearch = () => {
    // Agar input mil jaye to us par scroll karein, warna top ke paas scroll karein jahan search bar hota hai
    const searchInput =
      document.querySelector('input[type="text"]') ||
      document.getElementById("main-menu-search");

    if (searchInput) {
      const yOffset = -120;
      const y = searchInput.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setTimeout(() => {
        (searchInput as HTMLInputElement).focus();
      }, 350);
    } else {
      window.scrollTo({ top: 250, behavior: "smooth" });
    }
  };

  // Agar dono buttons hidden hon to kuch render na karein
  if (!showFloatingSearch && !showScrollTop) return null;

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-center gap-2.5 select-none pointer-events-none">
      {/* 1. Floating Search Button (Shuru me bilkul HIDDEN!) */}
      {showFloatingSearch && (
        <button
          type="button"
          onClick={handleScrollToSearch}
          aria-label="Go to search"
          className="pointer-events-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-[18px] bg-[#f5b335] text-neutral-900 shadow-md transition-all duration-200 hover:bg-[#e4a323] active:scale-95"
        >
          <Search className="h-6 w-6 stroke-[2.5]" />
        </button>
      )}

      {/* 2. Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="pointer-events-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-[18px] bg-[#f5b335] text-neutral-900 shadow-md transition-all duration-200 hover:bg-[#e4a323] active:scale-95"
        >
          <ChevronUp className="h-7 w-7 stroke-[3]" />
        </button>
      )}
    </div>
  );
}