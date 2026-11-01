"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Check, Heart, Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/useCartStore";
import { dessertFlavors, type DessertFlavorKey } from "./product/productData";
import { ProductModal } from "./product/ProductModal";

export function ProductCard({ product }: { product: Product }) {
  const { cart, addItem, incrementItem, removeItem } = useCartStore();
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const cartItem = cart.find((item) => item.product.id === product.id && !item.product.variantLabel);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const productName = product.name.toLowerCase();
  const prodKey: DessertFlavorKey | null = productName.includes("cake") ? "cakes" : productName.includes("sundae") ? "sundae" : productName.includes("pastry") ? "pastry" : null;
  const currentFlavors = useMemo(() => (prodKey ? dessertFlavors[prodKey] : []), [prodKey]);
  const isCustomizable = currentFlavors.length > 0;

  // --- INITIALIZE FAVORITE STATE ---
  useEffect(() => {
    const userStr = localStorage.getItem("white_castle_user");
    if (!userStr) return;
    try {
      const user = JSON.parse(userStr);
      const favs = JSON.parse(localStorage.getItem(`white_castle_favourites_${user.email}`) || "[]");
      setIsLiked(favs.some((item: any) => item.id === product.id));
    } catch (e) { console.error(e); }
  }, [product.id]);

  // --- TOGGLE FAVORITE ---
  const toggleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const userStr = localStorage.getItem("white_castle_user");
    if (!userStr) return alert("Please login first!");
    
    const user = JSON.parse(userStr);
    const key = `white_castle_favourites_${user.email}`;
    const favs = JSON.parse(localStorage.getItem(key) || "[]");
    
    const exists = favs.some((item: any) => item.id === product.id);
    const updated = exists ? favs.filter((item: any) => item.id !== product.id) : [...favs, product];
    
    localStorage.setItem(key, JSON.stringify(updated));
    setIsLiked(!exists);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCustomizable) setIsModalOpen(true);
    else { addItem(product); setAdded(true); window.setTimeout(() => setAdded(false), 1200); }
  };

  return (
    <>
      <article onClick={handleCardClick} className="group relative flex h-[165px] w-full cursor-pointer items-center justify-between rounded-2xl bg-white p-4 shadow-sm border border-neutral-100/80 transition-all hover:-translate-y-1 hover:shadow-md">
        
        {/* Product Image */}
        <div className="relative h-full w-[42%] shrink-0 flex items-center justify-center p-1">
          <Image src={product.image || "/images/food-pizza.svg"} alt={product.name} fill sizes="(max-width: 640px) 45vw, 20vw" unoptimized className="object-contain transition-transform group-hover:scale-105" />
        </div>

        {/* Content & Actions */}
        <div className="flex h-full w-[55%] flex-col justify-between py-0.5">
          <div>
            <h3 className="text-base font-extrabold text-neutral-900 line-clamp-1 leading-snug">{product.name}</h3>
            {product.description && <p className="mt-1 text-xs font-medium text-neutral-500 line-clamp-1">{product.description}</p>}
          </div>

          <div className="flex flex-col items-start gap-2.5">
            <span className="inline-block rounded-xl bg-amber-50 px-3 py-1 text-xs font-black text-[#a32620]">Rs. {Number(product.price).toFixed(2)}</span>

            <div className="flex w-full items-center gap-2">
              {!isCustomizable && cartQuantity > 0 ? (
                <div onClick={(e) => e.stopPropagation()} className="flex-1 flex h-10 items-center justify-between rounded-xl bg-[#f6b71e] px-2 text-neutral-900 shadow-sm">
                  <button onClick={() => cartItem && removeItem(cartItem.key)} className="grid h-8 w-8 place-items-center rounded-lg bg-white cursor-pointer"><Minus className="h-4 w-4 stroke-[3]" /></button>
                  <span className="text-sm font-black">{cartQuantity}</span>
                  <button onClick={() => cartItem && incrementItem(cartItem.key)} className="grid h-8 w-8 place-items-center rounded-lg bg-white cursor-pointer"><Plus className="h-4 w-4 stroke-[3]" /></button>
                </div>
              ) : (
                <button onClick={handleCardClick} className={`flex-1 flex items-center justify-center gap-1 rounded-xl py-2.5 text-xs font-black transition-all active:scale-95 shadow-sm cursor-pointer ${added ? "bg-green-600 text-white" : "bg-[#f6b71e] text-neutral-900 hover:bg-[#e4a323]"}`}>
                  {added ? <Check className="h-4 w-4 stroke-[3]" /> : "Add to Cart"}
                </button>
              )}
              
              {/* Heart Button */}
              <button onClick={toggleFavourite} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 cursor-pointer">
                <Heart className={`h-4 w-4 stroke-[2] ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </article>

      {isCustomizable && (
        <ProductModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} currentFlavors={currentFlavors} onAddToCart={(data: Parameters<React.ComponentProps<typeof ProductModal>["onAddToCart"]>[0]) => { addItem(product, data as Parameters<typeof addItem>[1]); setIsModalOpen(false); }} />
      )}
    </>
  );
}