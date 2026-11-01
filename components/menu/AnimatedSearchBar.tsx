import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

export function AnimatedSearchBar({ searchQuery, setSearchQuery, groupedCategories }: any) {
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("Search for...");

  useEffect(() => {
    const allVisibleProducts = groupedCategories.flatMap((c: any) => c.products);
    const stringsToType = allVisibleProducts.length > 0 ? allVisibleProducts.map((p: any) => p.name) : ["all products"];

    let currentStringIndex = 0; let currentCharIndex = 0; let isDeleting = false; let timer: NodeJS.Timeout;

    const loopTyping = () => {
      const currentString = stringsToType[currentStringIndex];
      setAnimatedPlaceholder(`Search for ${currentString.substring(0, currentCharIndex)}`);
      let speed = isDeleting ? 30 : 60;

      if (!isDeleting && currentCharIndex === currentString.length) {
        speed = 1500; isDeleting = true;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false; currentStringIndex = (currentStringIndex + 1) % stringsToType.length; speed = 300; 
      } else {
        currentCharIndex += isDeleting ? -1 : 1;
      }
      timer = setTimeout(loopTyping, speed);
    };

    timer = setTimeout(loopTyping, 100);
    return () => clearTimeout(timer);
  }, [groupedCategories]);

  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-6 pb-4 sm:px-6">
      <div className="flex items-center gap-3 border-b-2 border-neutral-200 pb-3">
        <Search className="h-5 w-5 text-[#f1d59c] stroke-[3]" />
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={animatedPlaceholder} className="w-full bg-transparent text-base sm:text-lg font-medium text-[#f1d59c] placeholder:text-[#f1d59c]/70 focus:outline-none" />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} className="text-[#f1d59c] hover:text-[#f1d59c]"><X className="h-5 w-5 stroke-[3]" /></button>
        )}
      </div>
    </div>
  );
}