import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

export function CartItem({ item, formatAmount, onIncrement, onDecrement, onRemove }: any) {
  const { key, product, quantity } = item;
  
  return (
    <div className="py-5 border-b border-neutral-100 last:border-0">
      <div className="flex gap-3.5">
        <div className="relative h-16 w-16 shrink-0 rounded-2xl bg-[#faf8f5] border border-neutral-100 overflow-hidden">
          <Image src={product.image || "/images/food-pizza.svg"} alt={product.name} fill unoptimized className="object-contain p-1" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-extrabold text-[15px] text-neutral-900">{product.name}</h3>
          <p className="mt-0.5 text-xs text-neutral-500 line-clamp-2">{product.variantLabel || "Fresh & Hot"}</p>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => onDecrement(key)} className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f6b738] cursor-pointer"><Minus className="h-3.5 w-3.5 stroke-[3]" /></button>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-dashed text-xs font-bold">{quantity}</div>
          <button onClick={() => onIncrement(key)} className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f6b738] cursor-pointer"><Plus className="h-3.5 w-3.5 stroke-[3]" /></button>
          <button onClick={() => onRemove(key)} className="ml-1 text-neutral-400 hover:text-red-600 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
        </div>
        <span className="text-[15px] font-extrabold text-neutral-900">Rs. {formatAmount(product.price * quantity)}</span>
      </div>
    </div>
  );
}