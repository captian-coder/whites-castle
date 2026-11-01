"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Plus, Wallet, Banknote } from "lucide-react";
import { formatPrice } from "@/lib/data";

export function OrderSummary({ cartProducts, cartTotal, loading, onPlaceOrder, disabled }: any) {
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "wallet">("cod");
  const [walletBalance, setWalletBalance] = useState<number>(0);

  // Load user wallet balance
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("white_castle_user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        const balance = localStorage.getItem(`white_castle_wallet_${user.email}`);
        if (balance) setWalletBalance(parseFloat(balance));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handlePlaceOrderWithPayment = () => {
    if (paymentMethod === "wallet" && walletBalance < cartTotal) {
      alert("Insufficient wallet balance! Please choose Cash on Delivery or add funds to your wallet.");
      return;
    }

    // Deduct from wallet if wallet is selected
    if (paymentMethod === "wallet") {
      try {
        const savedUser = localStorage.getItem("white_castle_user");
        if (savedUser) {
          const user = JSON.parse(savedUser);
          const newBalance = walletBalance - cartTotal;
          localStorage.setItem(`white_castle_wallet_${user.email}`, newBalance.toFixed(2));
          setWalletBalance(newBalance);
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Call original order placement and loyalty points logic
    if (onPlaceOrder) onPlaceOrder();

    try {
      const savedUser = localStorage.getItem("white_castle_user");
      if (savedUser && cartTotal > 0) {
        const user = JSON.parse(savedUser);
        if (user?.email) {
          const earnedPoints = Math.floor(cartTotal * 0.05); 
          const historyKey = `white_castle_loyalty_${user.email}`;
          const existingHistory = JSON.parse(localStorage.getItem(historyKey) || "[]");

          const newEntry = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
            pointsEarned: earnedPoints,
            description: `Earned from Order Total: ${formatPrice(cartTotal)}`,
          };

          localStorage.setItem(historyKey, JSON.stringify([newEntry, ...existingHistory]));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <aside className="rounded-3xl border border-neutral-200/80 bg-white shadow-sm overflow-hidden sticky top-20">
      <div className="bg-[#f2f1ed] px-6 py-4"><h3 className="text-base font-black text-neutral-900">Your Cart</h3></div>
      
      <div className="divide-y divide-neutral-100 px-6 py-2 max-h-[250px] overflow-y-auto">
        {cartProducts.length > 0 ? (
          cartProducts.map(({ key, product, quantity }: any) => (
            <div key={key} className="py-3 space-y-1">
              <div className="flex gap-3">
                <div className="relative h-14 w-14 shrink-0 rounded-xl bg-[#faf8f5] border border-neutral-100"><Image src={product.image || "/images/food-pizza.svg"} alt={product.name} fill unoptimized className="object-contain p-1" /></div>
                <div className="flex-1 min-w-0"><h4 className="font-extrabold text-sm leading-snug truncate">{product.name}</h4><p className="text-xs text-neutral-500">{product.variantLabel || "Fresh & Hot"}</p></div>
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-bold text-neutral-500">Qty: {quantity}</span>
                <span className="font-extrabold">{formatPrice(product.price * quantity)}</span>
              </div>
            </div>
          ))
        ) : (<div className="py-6 text-center text-xs font-bold text-neutral-400">Cart is empty</div>)}
      </div>

      <div className="border-t border-neutral-100 px-6 py-2.5"><Link href="/" className="flex items-center gap-1.5 text-xs font-bold text-[#f5a623] hover:text-[#d48810]"><Plus className="h-3.5 w-3.5 stroke-[3]" /><span>Add more items</span></Link></div>
      
      {/* Payment Method Selector */}
      <div className="border-t border-neutral-100 bg-[#faf9f6] px-6 py-3 space-y-2">
        <label className="text-xs font-black text-neutral-800 block">Payment Method</label>
        <div className="grid grid-cols-2 gap-2">
          <button 
            type="button"
            onClick={() => setPaymentMethod("cod")}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${paymentMethod === "cod" ? "border-[#f5a623] bg-amber-50/50 text-neutral-900" : "border-neutral-200 bg-white text-neutral-500"}`}
          >
            <Banknote className="h-4 w-4 text-[#f5a623]" /> Cash on Delivery
          </button>
          <button 
            type="button"
            onClick={() => setPaymentMethod("wallet")}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${paymentMethod === "wallet" ? "border-[#f5a623] bg-amber-50/50 text-neutral-900" : "border-neutral-200 bg-white text-neutral-500"}`}
          >
            <Wallet className="h-4 w-4 text-[#f5a623]" /> Wallet ({formatPrice(walletBalance)})
          </button>
        </div>
      </div>

      <div className="border-t border-neutral-100 bg-[#fbfaf8] p-6 space-y-3">
        <div className="flex justify-between text-xs font-medium"><span>Subtotal</span><span className="font-bold">{formatPrice(cartTotal)}</span></div>
        <div className="flex justify-between text-xs font-medium"><span>Delivery</span><span className="font-bold">Rs. 0.00</span></div>
        <div className="border-t border-neutral-200/80 pt-3 flex justify-between text-base font-extrabold"><span>Grand total</span><span>{formatPrice(cartTotal)}</span></div>
        
        <button onClick={handlePlaceOrderWithPayment} disabled={disabled || loading} className="mt-3 flex h-12 w-full cursor-pointer items-center justify-center rounded-2xl bg-[#f5a623] text-sm font-black shadow-sm disabled:opacity-50">
          {loading ? <><Loader2 className="h-5 w-5 animate-spin mr-2" /><span>Placing...</span></> : "Place Order"}
        </button>
      </div>
    </aside>
  );
}