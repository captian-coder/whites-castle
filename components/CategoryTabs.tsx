"use client";

import { CategorySlider } from "./category/CategorySlider";
import { SearchBar } from "./category/SearchBar";

interface Category { id: string; name: string; }

interface CategoryTabsProps {
  categories?: Category[];
  activeCategory?: string;
  onSelectCategory?: (id: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const DEFAULT_CATEGORIES = [
  { id: "starters", name: "ROYAL STARTERS" },
  { id: "pizza", name: "PIZZA" },
  { id: "special-pizza", name: "SPECIAL PIZZA" },
  { id: "square-pizza", name: "SQUARE PIZZA" },
  { id: "calzone", name: "CALZONE" },
  { id: "crust-pizza", name: "CRUST PIZZA" },
  { id: "pasta", name: "PASTA" },
  { id: "castle-crunch", name: "CASTLE CRUNCH PASTA" },
  { id: "beverages", name: "BEVERAGES" },
  { id: "desserts", name: "DESSERTS" },
];

export function CategoryTabs({ 
  categories = DEFAULT_CATEGORIES, 
  activeCategory = "starters", 
  onSelectCategory, 
  searchQuery = "", 
  onSearchChange 
}: CategoryTabsProps) {
  
  return (
    <div className="w-full bg-[#fbfaf8]">
      <CategorySlider categories={categories} activeCategory={activeCategory} onSelectCategory={onSelectCategory} />
      <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
    </div>
  );
}