"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, Wallet, PlusCircle } from "lucide-react";
import { useCartStore } from "@/lib/useCartStore";
import { UserSidebar } from "@/components/user/UserSidebar";

export default function UserWalletPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [walletBalance, setWalletBalance] = useState<string>("0.00");
  const [addAmount, setAddAmount] = useState<string>("");

  const { openCart, cart } = useCartStore();
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const savedUser = localStorage.getItem("white_castle_user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        
        const walletKey = `white_castle_wallet_${parsedUser.email}`;
        const balance = localStorage.getItem(walletKey) || "0.00";
        setWalletBalance(balance);
      } catch (e) {
        console.error(e);
      }
    } else {
      router.push("/");
    }
  }, [router]);

  const handleAddMoney = () => {
    const amount = parseFloat(addAmount);
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    if (user && user.email) {
      const walletKey = `white_castle_wallet_${user.email}`;
      const currentBalance = parseFloat(walletBalance);
      const newBalance = currentBalance + amount;

      localStorage.setItem(walletKey, newBalance.toFixed(2));
      setWalletBalance(newBalance.toFixed(2));
      setAddAmount("");
      alert(`Successfully added Rs. ${amount} to your wallet!`);
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
          
          <UserSidebar fullName={user.name || ""} phone={user.phone || ""} activeTab="wallet" />
          
          {/* Right Content Area */}
          <div className="bg-white rounded-[20px] shadow-sm border border-neutral-100 overflow-hidden h-fit min-h-[500px] flex flex-col">
            
            <div className="px-8 py-5 border-b border-neutral-100 flex items-center gap-3">
              <Wallet className="h-5 w-5 text-neutral-900 stroke-[2.5]" />
              <h2 className="text-[17px] font-black text-neutral-900">Wallet Balance</h2>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[400px]">
              <div className="mb-4 text-neutral-300">
                <Wallet className="h-16 w-16 stroke-[1.5]" />
              </div>
              <p className="text-[15px] font-bold text-[#9ca3af] mb-6">
                Your current wallet balance is <span className="text-neutral-900 font-black">Rs. {walletBalance}</span>
              </p>

              {/* Top Up Box */}
              <div className="p-4 bg-[#f9f8f6] rounded-2xl border border-neutral-200 max-w-sm w-full space-y-3">
                <h4 className="text-xs font-black text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                  <PlusCircle className="h-4 w-4 text-[#f5a623]" /> Top Up Wallet
                </h4>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    placeholder="Enter amount (e.g. 500)" 
                    value={addAmount} 
                    onChange={(e) => setAddAmount(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-white rounded-xl border border-neutral-200 focus:outline-none focus:border-[#f5a623]"
                  />
                  <button 
                    onClick={handleAddMoney}
                    className="px-4 py-2 bg-[#f5a623] text-neutral-900 text-xs font-black rounded-xl hover:bg-[#e49512] transition cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

            </div>
            
          </div>

        </div>
      </div>
      
    </div>
  );
}