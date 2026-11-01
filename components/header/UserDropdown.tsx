import { useState } from "react";
import Link from "next/link";
import { User, ChevronDown, LogOut, Package, MapPinned, Heart, Tag, Wallet } from "lucide-react";

export function UserDropdown({ currentUser, onLogout, onLoginClick }: any) {
  const [showDropdown, setShowDropdown] = useState(false);

  if (!currentUser) {
    return (
      <button
        type="button"
        onClick={onLoginClick}
        className="focus-ring hidden h-11 shrink-0 items-center rounded-lg border-2 border-black bg-[#f6b71e] px-5 text-sm font-black text-black shadow-sm transition hover:bg-[#eab308] xl:flex cursor-pointer"
      >
        Sign in / Register
      </button>
    );
  }

  return (
    <div className="relative hidden xl:block">
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2.5 h-11 rounded-2xl bg-white border border-neutral-300 px-4 text-sm font-black text-black shadow-sm transition hover:bg-neutral-50 cursor-pointer"
      >
        <User className="h-4 w-4 text-neutral-800" />
        <span className="truncate max-w-[120px]">{currentUser.name}</span>
        <ChevronDown className="h-4 w-4 text-neutral-800" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 rounded-3xl bg-white p-2.5 shadow-2xl border border-neutral-200 z-50 animate-in fade-in zoom-in duration-150">
          <Link href="/user/profile" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition"><User className="h-4 w-4 text-neutral-500" /> My Profile</Link>
          <Link href="/user/orders" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition"><Package className="h-4 w-4 text-neutral-500" /> My Orders</Link>
          <Link href="/user/addresses" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition"><MapPinned className="h-4 w-4 text-neutral-500" /> My Addresses</Link>
          <Link href="/user/favourites" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition"><Heart className="h-4 w-4 text-neutral-500" /> My Favourites</Link>
          <Link href="/user/loyalty" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition"><Tag className="h-4 w-4 text-neutral-500" /> Loyalty</Link>
          <Link href="/user/wallet" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition"><Wallet className="h-4 w-4 text-neutral-500" /> Wallet Balance</Link>
          <div className="border-t border-neutral-100 my-1.5"></div>
          <button type="button" onClick={() => { onLogout(); setShowDropdown(false); }} className="w-full flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"><LogOut className="h-4 w-4 text-neutral-500" /> Sign Out</button>
        </div>
      )}
    </div>
  );
}