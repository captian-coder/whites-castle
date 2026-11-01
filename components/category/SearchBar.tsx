import { Search, X } from "lucide-react";

export function SearchBar({ searchQuery, onSearchChange }: any) {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 pt-5 pb-3">
      <div className="relative flex items-center border-b border-neutral-300 pb-2.5">
        <Search className="h-4 w-4 text-[#e0a027] stroke-[2.5]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search for Oven Baked Wings"
          className="ml-3 w-full bg-transparent text-[13px] font-medium text-neutral-800 placeholder:text-[#d4ba8a] focus:outline-none"
        />
        {searchQuery && (
          <button onClick={() => onSearchChange?.("")} className="text-neutral-400 hover:text-neutral-600">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}