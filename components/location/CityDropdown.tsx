import { ChevronDown, ChevronUp } from "lucide-react";

export function CityDropdown({ cities, selectedCity, isCityOpen, setIsCityOpen, handleCitySelect }: any) {
  return (
    <div className="relative">
      <label className="mb-1.5 block text-xs font-bold text-neutral-800">Select City / Region</label>
      <div 
        onClick={() => setIsCityOpen(!isCityOpen)}
        className={`flex cursor-pointer items-center justify-between rounded-xl border bg-white px-4 py-3.5 text-sm font-semibold text-neutral-700 transition ${isCityOpen ? "border-[#f5b335] ring-1 ring-[#f5b335]" : "border-neutral-300 hover:border-neutral-400"}`}
      >
        <span>{selectedCity || "Select City / Region"}</span>
        {isCityOpen ? <ChevronUp className="h-5 w-5 text-neutral-500" /> : <ChevronDown className="h-5 w-5 text-neutral-500" />}
      </div>

      {isCityOpen && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl">
          <ul className="max-h-40 overflow-y-auto py-1">
            {cities.map((city: string) => (
              <li 
                key={city}
                onClick={() => handleCitySelect(city)}
                className="cursor-pointer px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}