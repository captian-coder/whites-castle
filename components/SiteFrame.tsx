"use client";

import { usePathname } from "next/navigation";
import { CartDrawer } from "./CartDrawer";
import { CartRibbon } from "./CartRibbon";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LocationModal } from "./LocationModal";
import { OrderingProvider } from "./OrderingProvider";
import { Toast } from "./Toast";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Agar user ki URL '/user' se shuru hoti hai, toh main header hide ho jayega
  const isUserPage = pathname?.startsWith("/user");

  return (
    <OrderingProvider>
      <div className="min-h-screen bg-[#faf8f5] text-neutral-900">
        
        {/* Yahan check lagaya hai, sirf non-user pages par Header show hoga */}
        {!isUserPage && <Header />}
        
        <main className="min-h-screen">{children}</main>
        
        <Footer />
        <CartRibbon />
        <CartDrawer />
        <LocationModal />
        <Toast />
      </div>
    </OrderingProvider>
  );
}