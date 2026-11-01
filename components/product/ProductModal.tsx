import { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Minus, Plus, X } from "lucide-react";

export function ProductModal({ product, isOpen, onClose, currentFlavors, onAddToCart }: any) {
  const [qty, setQty] = useState(1);
  const [instructions, setInstructions] = useState("");
  const [isFlavorOpen, setIsFlavorOpen] = useState(true);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>(currentFlavors[0] ? [currentFlavors[0].name] : []);

  const toggleFlavor = (name: string) => {
    setSelectedFlavors((prev) => prev.includes(name) ? prev.filter((i) => i !== name) : prev.length < 8 ? [...prev, name] : prev);
  };

  const currentFlavorPrice = useMemo(() => {
    const selected = currentFlavors.find((f: any) => selectedFlavors.includes(f.name));
    return selected ? selected.price : currentFlavors[0]?.price || product.price;
  }, [currentFlavors, selectedFlavors, product.price]);

  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-6 backdrop-blur-sm">
      <div onClick={(e) => e.stopPropagation()} className="relative flex h-full max-h-[620px] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">
        
        <div className="relative hidden w-full items-center justify-center bg-[#fafafa] p-8 md:flex md:w-[48%]">
          <Image src={product.image || "/images/food-pizza.svg"} alt={product.name} fill unoptimized className="object-contain p-8" />
        </div>

        <div className="flex w-full flex-1 flex-col justify-between overflow-hidden bg-white md:w-[52%]">
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-neutral-900">{product.name}</h2>
                <p className="text-base font-bold text-[#f59e0b] mt-0.5">Rs. {currentFlavorPrice.toFixed(2)}</p>
              </div>
              <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition cursor-pointer">
                <X className="h-5 w-5 stroke-[2.5]" />
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-200 border-l-[4px] border-l-[#f59e0b] shadow-sm">
              <div onClick={() => setIsFlavorOpen(!isFlavorOpen)} className="flex cursor-pointer items-center justify-between bg-neutral-50 px-4 py-3.5 select-none">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-neutral-900 text-sm">Flavor</span>
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">max 8</span>
                </div>
                {isFlavorOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>

              {isFlavorOpen && (
                <div className="divide-y divide-neutral-100">
                  {currentFlavors.map((flavor: any) => (
                    <label key={flavor.name} onClick={() => toggleFlavor(flavor.name)} className="flex cursor-pointer items-center justify-between px-4 py-3.5 text-sm select-none hover:bg-amber-50/40">
                      <span className="font-semibold text-neutral-700">{flavor.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-neutral-500">+ Rs. {flavor.price.toFixed(2)}</span>
                        <input type="checkbox" checked={selectedFlavors.includes(flavor.name)} readOnly className="h-5 w-5 cursor-pointer rounded border-neutral-300 accent-[#f5b335]" />
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="rounded-xl bg-neutral-100 px-4 py-2.5 mb-2"><h4 className="text-xs font-extrabold text-neutral-800 uppercase">Instructions</h4></div>
              <textarea value={instructions} maxLength={150} onChange={(e) => setInstructions(e.target.value)} placeholder="Any special requests?" rows={3} className="w-full rounded-xl border border-neutral-200 p-3 text-sm focus:border-[#f5b335] focus:ring-1 focus:ring-[#f5b335] outline-none resize-none shadow-sm" />
            </div>
          </div>

          <div className="border-t border-neutral-100 bg-white p-4 sm:p-5 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center rounded-xl bg-[#f5b335] hover:bg-[#e4a323] transition cursor-pointer"><Minus className="h-4 w-4 stroke-[3]" /></button>
              <div className="flex h-11 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-sm font-extrabold">{qty}</div>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-11 w-11 place-items-center rounded-xl bg-[#f5b335] hover:bg-[#e4a323] transition cursor-pointer"><Plus className="h-4 w-4 stroke-[3]" /></button>
            </div>
            <button onClick={() => onAddToCart({ label: selectedFlavors.join(", "), price: currentFlavorPrice, instructions, quantity: qty })} className="flex h-11 flex-1 items-center justify-between rounded-xl bg-[#f5b335] px-5 text-sm font-black shadow-sm hover:bg-[#e4a323] transition cursor-pointer">
              <span>Rs. {(currentFlavorPrice * qty).toFixed(2)}</span><span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}