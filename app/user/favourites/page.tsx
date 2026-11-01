"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, Heart, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/useCartStore";
import { UserSidebar } from "@/components/user/UserSidebar";
import { formatPrice } from "@/lib/data";

export default function UserFavouritesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [favourites, setFavourites] = useState<any[]>([]);

  const { openCart, cart, addItem } = useCartStore();
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const savedUser = localStorage.getItem("white_castle_user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        
        // Load favorites from localStorage based on user email
        const savedFavs = localStorage.getItem(`white_castle_favourites_${parsedUser.email}`);
        if (savedFavs) {
          setFavourites(JSON.parse(savedFavs));
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      router.push("/");
    }
  }, [router]);

  const handleRemoveFavourite = (productId: string) => {
    const updated = favourites.filter((item) => item.id !== productId);
    setFavourites(updated);
    if (user?.email) {
      localStorage.setItem(`white_castle_favourites_${user.email}`, JSON.stringify(updated));
    }
  };

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
          
          <UserSidebar fullName={user.name || ""} phone={user.phone || ""} activeTab="favourites" />
          
          {/* Right Content Area */}
          <div className="bg-white rounded-[20px] shadow-sm border border-neutral-100 overflow-hidden h-fit min-h-[500px] flex flex-col">
            
            <div className="px-8 py-5 border-b border-neutral-100 flex items-center gap-3">
              <Heart className="h-5 w-5 text-neutral-900 stroke-[2.5]" />
              <h2 className="text-[17px] font-black text-neutral-900">My Favourites ({favourites.length})</h2>
            </div>

            {favourites.length > 0 ? (
              <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favourites.map((product) => (
                  <div key={product.id} className="bg-[#f4f5f8] rounded-2xl p-4 border border-neutral-200 flex flex-col justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-xl bg-white overflow-hidden border shrink-0">
                        <Image src={product.image || "/images/food-pizza.svg"} alt={product.name} fill unoptimized className="object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-neutral-900 text-[15px] truncate">{product.name}</h3>
                        <p className="text-[13px] font-black text-black mt-0.5">{formatPrice(product.price)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-neutral-200">
                      <button 
                        onClick={() => addItem(product)} 
                        className="flex-1 h-10 rounded-xl bg-[#fbc02d] hover:bg-[#f5a623] text-black font-black text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        Add to Cart <ArrowRight className="h-3.5 w-3.5 stroke-[3]" />
                      </button>
                      <button 
                        onClick={() => handleRemoveFavourite(product.id)} 
                        className="h-10 w-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition flex items-center justify-center cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[400px]">
                <div className="mb-4 text-neutral-300">
                  <Heart className="h-16 w-16 stroke-[1.5]" />
                </div>
                <p className="text-[15px] font-bold text-[#9ca3af]">
                  You do not have any favourite items.
                </p>
              </div>
            )}
            
          </div>

        </div>
      </div>
      
    </div>
  );
}