"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, Wallet } from "lucide-react";
import { useCartStore } from "@/lib/useCartStore";
import { UserSidebar } from "@/components/user/UserSidebar";
import { UserProfileForm } from "@/components/user/UserProfileForm";
import { UserDeleteModal } from "@/components/user/UserDeleteModal";

export default function UserProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  
  const { openCart, cart } = useCartStore();
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const savedUser = localStorage.getItem("white_castle_user");
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (e) {}
    } else {
      router.push("/");
    }
  }, [router]);

  const handleUpdateProfile = (updatedUser: any) => {
    localStorage.setItem("white_castle_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem("white_castle_user");
    router.push("/");
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
          
          <UserSidebar fullName={user.name || ""} phone={user.phone || ""} />
          
          <div>
            <div className="bg-white rounded-[20px] shadow-sm border border-neutral-100 px-6 py-4 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Wallet className="h-[22px] w-[22px] text-[#f5a623]" />
                <span className="font-bold text-neutral-900 text-base">Wallet</span>
              </div>
              <span className="text-sm font-black text-black bg-[#fbc02d] px-5 py-2 rounded-full">Rs. 0.00</span>
            </div>

            <UserProfileForm user={user} onUpdate={handleUpdateProfile} />
            
            <UserDeleteModal onDelete={handleDeleteAccount} />
          </div>

        </div>
      </div>
    </div>
  );
}