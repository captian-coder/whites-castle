"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { offers } from "@/lib/data";

type HeroProps = {
  compact?: boolean;
  banners?: any[];
};

export function Hero({ compact = false, banners = [] }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideList = banners && banners.length > 0 ? banners : offers;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slideList.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slideList.length) % slideList.length);
  };

  useEffect(() => {
    if (slideList.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [slideList.length]);

  const heroHeight = compact
    ? "h-[180px] sm:h-[200px]"
    : "h-[200px] sm:h-[200px] md:h-[250px] lg:h-[350px]";

  return (
    <section
      aria-label="Featured offers"
      className={`relative w-full overflow-hidden bg-[#f5b335] group ${heroHeight}`}
    >
      {slideList.map((item, index) => (
        <div
          key={item.id || index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <Image
            src={item.image}
            alt="Banner"
            fill
            className="object-cover object-center"
            priority={index === 0}
            unoptimized
          />
        </div>
      ))}

      {/* Left Arrow Button */}
      {slideList.length > 1 && (
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 z-20 flex h-16 w-10 -translate-y-1/2 items-center justify-center rounded-r-xl bg-[#f5b335]/90 text-neutral-900 shadow-md transition-all opacity-0 group-hover:opacity-100 hover:bg-[#f5b335] active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-7 w-7 stroke-[3]" />
        </button>
      )}

      {/* Right Arrow Button */}
      {slideList.length > 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 z-20 flex h-16 w-10 -translate-y-1/2 items-center justify-center rounded-l-xl bg-[#f5b335]/90 text-neutral-900 shadow-md transition-all opacity-0 group-hover:opacity-100 hover:bg-[#f5b335] active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="h-7 w-7 stroke-[3]" />
        </button>
      )}
    </section>
  );
}