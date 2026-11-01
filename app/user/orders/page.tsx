"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/useCartStore";
import { UserSidebar } from "@/components/user/UserSidebar";
import { UserOrdersList } from "@/components/user/UserOrdersList";

export default function UserOrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { openCart, cart } = useCartStore();
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const savedUser = localStorage.getItem("white_castle_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        fetchUserOrders(parsed.email, parsed.phone);
      } catch (e) {
        console.error(e);
      }
    } else {
      router.push("/");
    }
  }, [router]);

  const fetchUserOrders = async (email: string, phone: string) => {
    try {
      setLoading(true);
      const res = await fetch("/api/user/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      const data = await res.json();
      if (data.success) setOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f4f5f8] font-sans relative">
      <header className="bg-[#f4f5f8] py-5 px-6 md:px-12 flex items-center justify-between sticky top-0 z-40">
        <div className="w-12"></div>
        <div className="flex justify-center cursor-pointer" onClick={() => router.push('/')}>
          <Image src="/images/logo.png" alt="White's Castle" width={200} height={65} className="object-contain h-12 sm:h-14 w-auto" unoptimized />
        </div>
        <button onClick={openCart} className="relative p-2 text-neutral-800 hover:text-black transition cursor-pointer">
          <ShoppingCart className="h-6 w-6 stroke-[2.5]" />
          {cartQuantity > 0 && <span className="absolute -top-0.5 -right-0.5 h-[18px] w-[18px] bg-[#d32f2f] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">{cartQuantity}</span>}
        </button>
      </header>

      <div className="py-6 px-4">
        <div className="mx-auto max-w-[1150px] grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
          <UserSidebar fullName={user.name || ""} phone={user.phone || ""} activeTab="orders" />
          <UserOrdersList orders={orders} loading={loading} />
        </div>
      </div>
    </div>
  );
}