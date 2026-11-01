import { ChevronLeft, ChevronRight } from "lucide-react";

export function CategorySlider({ categories, activeCategoryId, scrollToCategory }: any) {
  const scrollSlider = (amount: number) => {
    const slider = document.getElementById("menu-category-slider");
    if (slider) slider.scrollLeft += amount;
  };

  return (
    <nav className="sticky top-[76px] z-40 -mt-6 w-full bg-[#f5b335] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-2 sm:px-4 py-2.5 relative">
        <button onClick={() => scrollSlider(-250)} className="z-10 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center text-neutral-900 transition hover:scale-110 active:scale-95">
          <ChevronLeft className="h-6 w-6 stroke-[3]" />
        </button>

        <div id="menu-category-slider" className="flex-1 overflow-x-auto scroll-smooth scrollbar-hide px-2">
          <ul className="inline-flex items-center gap-7 whitespace-nowrap py-0.5">
            {categories.map((cat: any) => {
              const isActive = activeCategoryId === cat.id;
              return (
                <li key={cat.id} className="shrink-0">
                  <button onClick={() => scrollToCategory(cat.id)} className={`text-xs sm:text-sm uppercase tracking-wide transition-colors cursor-pointer ${isActive ? "font-black text-white" : "font-black text-neutral-900 hover:text-white"}`}>
                    {cat.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <button onClick={() => scrollSlider(250)} className="z-10 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center text-neutral-900 transition hover:scale-110 active:scale-95">
          <ChevronRight className="h-6 w-6 stroke-[3]" />
        </button>
      </div>
    </nav>
  );
}