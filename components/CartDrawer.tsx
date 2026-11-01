"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/useCartStore";
import { AuthModal } from "./AuthModal";
import { CartItem } from "./cart/CartItem";
import { CartFooter } from "./cart/CartFooter";
import { ConfirmModal } from "./cart/ConfirmModal";

export function CartDrawer() {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<any>(null);

  const { isCartOpen, closeCart, cart, incrementItem, removeItem, deleteItem, clearCart } = useCartStore();

  useEffect(() => {
    const saved = localStorage.getItem("white_castle_user");
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((tot, line) => tot + line.product.price * line.quantity, 0);
  const format = (n: number) => n.toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleCheckout = () => {
    if (!user) return setShowAuth(true);
    closeCart(); router.push("/checkout");
  };

  const handleAuth = (u: any) => {
    setUser(u); localStorage.setItem("white_castle_user", JSON.stringify(u));
    closeCart(); router.push("/checkout");
  };

  return (
    <>
      <div onClick={closeCart} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]" />
      
      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300 sm:rounded-l-3xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
          <h2 className="text-xl font-extrabold text-black">Your Cart</h2>
          {cart.length > 0 && <button onClick={() => setShowConfirm(true)} className="text-sm font-bold text-[#f5a623] cursor-pointer">Clear cart</button>}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6">
          {cart.length === 0 ? (
            <div className="flex h-full items-center justify-center text-neutral-400 py-12"><p className="font-bold">Your cart is empty</p></div>
          ) : (
            cart.map((item) => (
              <CartItem 
                key={item.key} item={item} formatAmount={format} 
                onIncrement={incrementItem} onDecrement={removeItem} onRemove={deleteItem} 
              />
            ))
          )}
        </div>

        {/* Footer */}
        <CartFooter subtotal={subtotal} formatAmount={format} onCheckout={handleCheckout} cartEmpty={cart.length === 0} user={user} />

        {/* Clear Cart Modal */}
        <ConfirmModal isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={() => { clearCart(); setShowConfirm(false); }} />
      </aside>

      {/* Auth Modal Trigger */}
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onSuccess={handleAuth} />
    </>
  );
}