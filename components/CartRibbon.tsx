"use client";

import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/data";
import { useCartStore } from "@/lib/useCartStore";

export function CartRibbon() {
  const pathname = usePathname();

  const cart = useCartStore((state) => state.cart);
  const openCart = useCartStore((state) => state.openCart);

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  if (
    cartQuantity === 0 ||
    pathname === "/checkout" ||
    pathname.startsWith("/order-success") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/user")
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-3 left-1/2 z-40 w-[calc(100%-2rem)] max-w-[500px] -translate-x-1/2">
      <div className="glass-panel flex h-[58px] items-center justify-between rounded-lg px-4 text-ink shadow-drawer ring-1 ring-black/10">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#123c91] text-white">
            <ShoppingBag aria-hidden="true" className="h-4 w-4" />
            <span className="absolute -right-2 -top-2 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-[#a32620] px-1 text-xs font-black text-white">
              {cartQuantity}
            </span>
          </span>
          <span className="truncate text-sm font-black sm:text-base">
            {formatPrice(cartTotal)}
          </span>
        </div>
        <button
          type="button"
          onClick={openCart}
          className="focus-ring h-9 rounded-lg bg-neutral-900 px-4 text-sm font-black text-white transition hover:bg-neutral-800"
        >
          View Cart →
        </button>
      </div>
    </div>
  );
}