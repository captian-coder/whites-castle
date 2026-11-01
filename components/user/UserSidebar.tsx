"use client";

import { User, Package, MapPinned, Heart, Tag, Wallet, LogOut, Home, Inbox } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserSidebar({ fullName, phone, activeTab = "profile" }: { fullName: string; phone: string; activeTab?: string }) {
  const router = useRouter();

  const menuItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "profile", icon: User, label: "My Profile", path: "/user/profile" },
    { id: "orders", icon: Inbox, label: "My Orders", path: "/user/orders" },
    { id: "addresses", icon: MapPinned, label: "My Addresses", path: "/user/addresses" },
    { id: "favourites", icon: Heart, label: "My Favourites", path: "/user/favourites" },
    { id: "loyalty", icon: Tag, label: "Loyalty", path: "/user/loyalty" },
    { id: "wallet", icon: Wallet, label: "Wallet Balance", path: "/user/wallet" },
  ];

  return (
    <div className="bg-white rounded-[20px] shadow-sm py-6 h-fit flex flex-col border border-neutral-100">
      <div className="flex items-center gap-4 px-6 pb-6 border-b border-neutral-100 mb-2">
        <div className="h-[52px] w-[52px] rounded-full bg-[#fbc02d] text-black font-black flex items-center justify-center text-xl">
          {fullName ? fullName.charAt(0).toUpperCase() : "U"}
        </div>
        <div className="overflow-hidden">
          <h3 className="font-bold text-neutral-900 text-[15px] truncate">{fullName}</h3>
          <p className="text-[13px] text-neutral-500 truncate mt-0.5">+92 {phone}</p>
        </div>
      </div>

      <div className="flex flex-col">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button key={item.id} onClick={() => router.push(item.path)} className={`w-full flex items-center gap-4 px-6 py-4 text-[15px] transition cursor-pointer ${isActive ? "bg-[#fff9eb] text-[#f5a623] font-bold border-r-4 border-[#f5a623]" : "text-neutral-600 hover:bg-neutral-50 font-semibold"}`}>
              <item.icon className={`h-5 w-5 ${isActive ? "text-[#f5a623]" : "text-neutral-500"}`} /> {item.label}
            </button>
          );
        })}
        <div className="pt-2 border-t border-neutral-100 mt-2">
          <button onClick={() => { localStorage.removeItem("white_castle_user"); router.push("/"); }} className="w-full flex items-center gap-4 px-6 py-4 text-[#d32f2f] hover:bg-red-50 font-semibold text-[15px] transition cursor-pointer">
            <LogOut className="h-5 w-5 text-[#d32f2f]" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}