"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Crosshair, X, Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/useCartStore";
import { getBranchesFromDB } from "@/app/actions/branchActions";
import { OrderTypeSelector } from "./location/OrderTypeSelector";
import { CityDropdown } from "./location/CityDropdown";
import { AreaDropdown } from "./location/AreaDropdown";

export function LocationModal() {
  const { isLocationModalOpen, closeLocationModal, setLocation } = useCartStore();
  const [orderType, setOrderType] = useState<"Delivery" | "Pick-Up">("Delivery");
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBranchesFromDB().then(setBranches).catch(console.error);
  }, []);

  if (!isLocationModalOpen) return null;

  const cities = Array.from(new Set(branches.map((b) => b.city)));
  const filteredBranches = selectedCity ? branches.filter((b) => b.city === selectedCity) : [];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city); setSelectedBranchId(null);
    setIsCityOpen(false); setIsAreaOpen(true);
  };

  const handleSelect = () => {
    if (!selectedCity || !selectedBranchId) return;
    setIsLoading(true);
    const currentBranch = branches.find((b) => b.id === selectedBranchId);
    
    setTimeout(() => {
      if (currentBranch) {
        setLocation({ city: currentBranch.city, branchName: currentBranch.name, branchId: currentBranch.id, orderType });
      }
      setIsLoading(false); closeLocationModal();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[500px] rounded-[1.5rem] bg-white px-8 py-10 shadow-2xl">
        <button onClick={closeLocationModal} className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-neutral-400 text-white transition hover:bg-neutral-500 cursor-pointer">
          <X className="h-5 w-5 stroke-[3]" />
        </button>

        <div className="flex justify-center pb-4">
          <div className="relative h-14 w-40"><Image src="/images/logo.png" alt="Logo" fill className="object-contain" priority /></div>
        </div>

        <OrderTypeSelector orderType={orderType} setOrderType={setOrderType} />

        <div className="mt-6 text-center">
          <h3 className="text-sm font-bold text-neutral-800">Please select your location</h3>
          <div className="mt-2 flex justify-center">
            <button type="button" className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-bold text-neutral-700 shadow-sm transition hover:bg-neutral-50 cursor-pointer">
              <Crosshair className="h-4 w-4" /> Use Current Location
            </button>
          </div>
        </div>

        <div className="mt-6 text-left">
          <CityDropdown cities={cities} selectedCity={selectedCity} isCityOpen={isCityOpen} setIsCityOpen={setIsCityOpen} handleCitySelect={handleCitySelect} />
          {selectedCity && (
            <AreaDropdown filteredBranches={filteredBranches} selectedBranchId={selectedBranchId} isAreaOpen={isAreaOpen} setIsAreaOpen={setIsAreaOpen} handleAreaSelect={(id: string) => { setSelectedBranchId(id); setIsAreaOpen(false); }} />
          )}
        </div>

        <button disabled={!selectedCity || !selectedBranchId || isLoading} onClick={handleSelect} className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-[#f5b335] text-base font-black text-neutral-900 shadow-sm transition hover:bg-[#e4a323] disabled:opacity-50 cursor-pointer">
          {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Select"}
        </button>
      </div>
    </div>
  );
}