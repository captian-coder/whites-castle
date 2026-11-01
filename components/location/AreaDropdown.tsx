import { ChevronDown, ChevronUp } from "lucide-react";

export function AreaDropdown({ filteredBranches, selectedBranchId, isAreaOpen, setIsAreaOpen, handleAreaSelect }: any) {
  return (
    <div className="relative mt-4">
      <label className="mb-1.5 block text-xs font-bold text-neutral-800">Select Area / Sub Region</label>
      <div 
        onClick={() => setIsAreaOpen(!isAreaOpen)}
        className={`flex cursor-pointer items-center justify-between rounded-xl border bg-white px-4 py-3.5 text-sm font-semibold text-neutral-700 transition ${isAreaOpen ? "border-[#f5b335] ring-1 ring-[#f5b335]" : "border-neutral-300 hover:border-neutral-400"}`}
      >
        <span>
          {selectedBranchId 
            ? filteredBranches.find((b: any) => b.id === selectedBranchId)?.name 
            : "Select Area / Sub Region"}
        </span>
        {isAreaOpen ? <ChevronUp className="h-5 w-5 text-neutral-500" /> : <ChevronDown className="h-5 w-5 text-neutral-500" />}
      </div>

      {isAreaOpen && (
        <div className="absolute z-20 bottom-full mb-1 w-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl"> 
          <ul className="max-h-40 overflow-y-auto py-1">
            {filteredBranches.map((branch: any) => (
              <li 
                key={branch.id}
                onClick={() => handleAreaSelect(branch.id)}
                className="flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
              >
                <span>{branch.name}</span>
                <span className="text-[11px] font-bold text-neutral-400">- eta 45 min.</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}