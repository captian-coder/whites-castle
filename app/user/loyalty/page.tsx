"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, Tag, Award, ArrowUpRight } from "lucide-react";
import { useCartStore } from "@/lib/useCartStore";
import { UserSidebar } from "@/components/user/UserSidebar";

export default function UserLoyaltyPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loyaltyHistory, setLoyaltyHistory] = useState<any[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const { openCart, cart } = useCartStore();
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const savedUser = localStorage.getItem("white_castle_user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        
        // Load loyalty history based on user email
        const historyKey = `white_castle_loyalty_${parsedUser.email}`;
        const history = JSON.parse(localStorage.getItem(historyKey) || "[]");
        setLoyaltyHistory(history);

        // Calculate total points
        const points = history.reduce((acc: number, curr: any) => acc + (curr.pointsEarned || 0), 0);
        setTotalPoints(points);
      } catch (e) {
        console.error(e);
      }
    } else {
      router.push("/");
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f4f5f8] font-sans relative">
      
      {/* Top Header */}
      <header className="bg-[#f4f5f8] py-5 px-6 md:px-12 flex items-center justify-between sticky top-0 z-30">
        <div className="w-12"></div>
        <div className="flex justify-center cursor-pointer" onClick={() => router.push('/')}>
          <Image src="/images/logo.png" alt="White's Castle" width={200} height={65} className="object-contain h-12 sm:h-14 w-auto" unoptimized />
        </div>
        <button onClick={openCart} className="relative p-2 text-neutral-800 hover:text-black transition cursor-pointer">
          <ShoppingCart className="h-6 w-6 stroke-[2.5]" />
          {cartQuantity > 0 && <span className="absolute -top-0.5 -right-0.5 h-[18px] w-[18px] bg-[#d32f2f] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">{cartQuantity}</span>}
        </button>
      </header>

      {/* Main Layout */}
      <div className="py-6 px-4">
        <div className="mx-auto max-w-[1150px] grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
          
          <UserSidebar fullName={user.name || ""} phone={user.phone || ""} activeTab="loyalty" />
          
          {/* Right Content Area */}
          <div className="bg-white rounded-[20px] shadow-sm border border-neutral-100 overflow-hidden h-fit min-h-[500px] flex flex-col">
            
            <div className="px-8 py-5 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-neutral-900 stroke-[2.5]" />
                <h2 className="text-[17px] font-black text-neutral-900">Loyalty</h2>
              </div>
              {totalPoints > 0 && (
                <div className="bg-amber-50 px-3 py-1 rounded-xl text-xs font-black text-[#a32620] flex items-center gap-1">
                  <Award className="h-4 w-4" /> {totalPoints} Points Available
                </div>
              )}
            </div>

            {loyaltyHistory.length > 0 ? (
              <div className="p-6 md:p-8 space-y-4">
                {loyaltyHistory.map((item) => (
                  <div key={item.id} className="bg-[#f4f5f8] rounded-2xl p-4 border border-neutral-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <ArrowUpRight className="h-5 w-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900 text-sm">{item.description}</h4>
                        <p className="text-xs text-neutral-500 mt-0.5">{item.date}</p>
                      </div>
                    </div>
                    <span className="font-black text-green-600 text-sm">+{item.pointsEarned} pts</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[400px]">
                <div className="mb-4 text-neutral-300">
                  <Tag className="h-16 w-16 stroke-[1.5]" />
                </div>
                <p className="text-[15px] font-bold text-[#9ca3af]">
                  You do not have any Loyalty usage history.
                </p>
              </div>
            )}
            
          </div>

        </div>
      </div>
      
    </div>
  );
}