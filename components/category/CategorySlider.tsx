import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CategorySlider({ categories, activeCategory, onSelectCategory }: any) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const handleScroll = (dir: "left" | "right") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: dir === "left" ? -240 : 240, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex w-full items-center bg-[#f5b335] px-3 py-3 shadow-xs">
      <button onClick={() => handleScroll("left")} className="z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full text-neutral-900 transition hover:bg-black/10 active:scale-95">
        <ChevronLeft className="h-5 w-5 stroke-[3]" />
      </button>

      <div ref={scrollContainerRef} className="no-scrollbar mx-2 flex flex-1 items-center gap-7 overflow-x-auto scroll-smooth whitespace-nowrap">
        {categories.map((cat: any) => (
          <button 
            key={cat.id} 
            onClick={() => onSelectCategory?.(cat.id)} 
            className={`text-[13px] font-black uppercase tracking-wide transition-colors ${activeCategory === cat.id ? "text-white" : "text-neutral-950/85 hover:text-white"}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <button onClick={() => handleScroll("right")} className="z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full text-neutral-900 transition hover:bg-black/10 active:scale-95">
        <ChevronRight className="h-5 w-5 stroke-[3]" />
      </button>
    </div>
  );
}