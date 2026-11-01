"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/useCartStore";
import { UserSidebar } from "@/components/user/UserSidebar";
import { UserAddressList } from "@/components/user/UserAddressList";
import { UserAddressModal } from "@/components/user/UserAddressModal";

export default function UserAddressesPage() {
  const router = useRouter();
  
  // --- STATE MANAGEMENT ---
  const [user, setUser] = useState<any>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // --- ZUSTAND STORE ---
  const { openCart, cart, selectedLocation } = useCartStore();
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const regionText = selectedLocation ? `${selectedLocation.branchName}, ${selectedLocation.city}` : "215 RB Nethari, Faisalabad";

  // --- INITIALIZATION ---
  useEffect(() => {
    const savedUser = localStorage.getItem("white_castle_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        const savedAddresses = localStorage.getItem(`white_castle_addresses_${parsed.email}`);
        if (savedAddresses) setAddresses(JSON.parse(savedAddresses));
      } catch (e) {
        console.error("Error loading user data", e);
      }
    } else {
      router.push("/");
    }
  }, [router]);

  // --- DATA HANDLERS ---
  const handleSaveAddress = (addressInput: string, locationUrlInput: string) => {
    const newAddress = {
      id: Date.now().toString(),
      address: addressInput,
      region: regionText,
      mapUrl: locationUrlInput || "https://maps.google.com",
    };
    const updated = [...addresses, newAddress];
    setAddresses(updated);
    if (user?.email) localStorage.setItem(`white_castle_addresses_${user.email}`, JSON.stringify(updated));
    setShowAddressModal(false);
  };

  const handleDeleteAddress = (id: string) => {
    const filtered = addresses.filter((item) => item.id !== id);
    setAddresses(filtered);
    if (user?.email) localStorage.setItem(`white_castle_addresses_${user.email}`, JSON.stringify(filtered));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f4f5f8] font-sans relative">
      
      {/* --- TOP NAVBAR --- */}
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

      {/* --- MAIN LAYOUT --- */}
      <div className="py-6 px-4">
        <div className="mx-auto max-w-[1150px] grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
          <UserSidebar fullName={user.name || ""} phone={user.phone || ""} activeTab="addresses" />
          <UserAddressList addresses={addresses} onAddClick={() => setShowAddressModal(true)} onDelete={handleDeleteAddress} />
        </div>
      </div>

      {/* --- MODAL --- */}
      <UserAddressModal isOpen={showAddressModal} onClose={() => setShowAddressModal(false)} onSave={handleSaveAddress} regionText={regionText} />
      
    </div>
  );
}