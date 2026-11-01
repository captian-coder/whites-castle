"use client";

import { useState, useMemo } from "react";
import { categories as fallbackCategories, products as fallbackProducts } from "@/lib/data";
import type { Category, Product } from "@/lib/types";
import { CategorySlider } from "./menu/CategorySlider";
import { AnimatedSearchBar } from "./menu/AnimatedSearchBar";
import { MenuProductGrid } from "./menu/MenuProductGrid";

interface MenuSectionProps {
  categories?: Category[];
  products?: Product[];
  onlyCategory?: string;
  showAllProducts?: boolean;
  eyebrow?: string;
  title?: string;
  copy?: string;
}

export function MenuSection({ categories = fallbackCategories, products = fallbackProducts, onlyCategory }: MenuSectionProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");

  const groupedCategories = useMemo(() => {
    return categories.map((cat) => {
      const catProducts = products.filter((p) => p.categoryId?.toLowerCase() === cat.id.toLowerCase());
      const searched = catProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return { ...cat, products: searched };
    }).filter((cat) => cat.products.length > 0);
  }, [categories, products, searchQuery]);

  const scrollToCategory = (id: string) => {
    setActiveCategoryId(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      const headerOffset = 200; 
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#fdfbf7]">
      {!onlyCategory && <CategorySlider categories={categories} activeCategoryId={activeCategoryId} scrollToCategory={scrollToCategory} />}
      <AnimatedSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} groupedCategories={groupedCategories} />
      <MenuProductGrid groupedCategories={groupedCategories} />
    </section>
  );
}