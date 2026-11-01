"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, MapPin, Menu, ShoppingBag, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Added for route checking
import { brand } from "@/lib/data";
import { useCartStore } from "@/lib/useCartStore";
import { useStore } from "@/lib/useStore";
import { CartDrawer } from "./CartDrawer"; 
import { AuthModal } from "./AuthModal"; 
import { UserDropdown } from "./header/UserDropdown";

export function Header() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin"); // Check if current page is admin

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("white_castle_user");
    if (savedUser) {
      try { setCurrentUser(JSON.parse(savedUser)); } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("white_castle_user");
    setCurrentUser(null);
  };

  const handleAuthSuccess = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem("white_castle_user", JSON.stringify(user));
  };

  const openCart = useCartStore((state) => state.openCart);
  const openLocationModal = useCartStore((state) => state.openLocationModal);
  const cart = useStore(useCartStore, (state) => state.cart) || [];
  const selectedLocation = useStore(useCartStore, (state) => state.selectedLocation) || null;
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const locationTitle = selectedLocation ? `${selectedLocation.orderType} to` : "Choose branch";
  const locationSubtitle = selectedLocation ? `${selectedLocation.branchName}, ${selectedLocation.city}` : "Delivery or pick-up";

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#f6b71e] shadow-sm">
        <div className="bg-[#f6b71e]">
          <div className="mx-auto flex min-h-[76px] max-w-[1200px] items-center gap-3 px-4 py-2 sm:px-6">
            
            <Link href="/" onClick={() => setMobileOpen(false)} className="focus-ring grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#f6b71e] shadow-sm transition hover:scale-[1.02]">
              <Image src="/images/logo.png" alt="" width={56} height={56} priority unoptimized className="h-full w-full object-cover" />
            </Link>

            <button type="button" onClick={openLocationModal} className="focus-ring flex min-w-0 items-center gap-2 rounded-lg px-2 py-2 text-left transition hover:bg-white/30 cursor-pointer">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f6b71e] text-black shadow-sm"><MapPin className="h-5 w-5" /></span>
              <span className="min-w-0">
                <span className="flex items-center gap-1 text-sm font-black text-black"><span className="truncate">{locationTitle}</span><ChevronDown className="h-4 w-4 shrink-0" /></span>
                <span className="block truncate text-xs font-bold text-black">{locationSubtitle}</span>
              </span>
            </button>

            <div className="flex-1"></div>
            
            {/* Customer icons will be hidden on admin pages */}
            {!isAdminPage && (
              <>
                <button type="button" onClick={openCart} className="focus-ring relative grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white text-[#2c1308] shadow-sm ring-1 ring-black/10 transition hover:-translate-y-[1px] cursor-pointer">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -right-1 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#a32620] px-1 text-xs font-black text-white shadow-sm">{cartQuantity}</span>
                </button>

                <UserDropdown currentUser={currentUser} onLogout={handleLogout} onLoginClick={() => setShowAuthModal(true)} />

                <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#123c91] text-white shadow-sm md:hidden cursor-pointer">
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </>
            )}

          </div>
        </div>
      </header>

      <CartDrawer />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onSuccess={handleAuthSuccess} />
    </>
  );
}