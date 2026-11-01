"use client";

import { useState } from "react";
import { X, MapPin } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: string, mapUrl: string) => void;
  regionText: string;
}

export function UserAddressModal({ isOpen, onClose, onSave, regionText }: ModalProps) {
  // --- FORM STATES ---
  const [addressInput, setAddressInput] = useState("");
  const [locationUrlInput, setLocationUrlInput] = useState("");

  if (!isOpen) return null;

  // --- HANDLERS ---
  const handleSave = () => {
    onSave(addressInput, locationUrlInput);
    setAddressInput("");
    setLocationUrlInput("");
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationUrlInput(`https://www.google.com/maps?q=${latitude},${longitude}`);
          alert("Current location successfully fetched and added!");
        },
        () => alert("Unable to retrieve your location. Please check browser permissions.")
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-[2px]">
      <div className="w-full max-w-[520px] rounded-[24px] bg-white p-6 shadow-2xl relative animate-in fade-in zoom-in duration-150">
        
        {/* --- MODAL HEADER --- */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
          <h3 className="text-[18px] font-black text-neutral-900">Add new Address</h3>
          <button onClick={onClose} className="rounded-full p-1.5 bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition cursor-pointer">
            <X className="h-4 w-4 stroke-[3]" />
          </button>
        </div>
        
        {/* --- FORM FIELDS --- */}
        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-bold text-neutral-800 mb-1.5">Address (with post code)</label>
            <input type="text" placeholder="Enter your complete street address" value={addressInput} onChange={(e) => setAddressInput(e.target.value)} className="w-full h-12 rounded-xl border border-neutral-300 px-4 text-[14px] font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#fbc02d] focus:border-[#fbc02d] transition" />
          </div>

          <div>
            <label className="block text-[14px] font-bold text-neutral-800 mb-1.5">Region</label>
            <input type="text" disabled value={regionText} className="w-full h-12 rounded-xl bg-[#f4f5f8] border border-neutral-200 px-4 text-[14px] font-medium text-neutral-500 cursor-not-allowed" />
            <p className="text-[11px] font-semibold text-neutral-500 mt-1.5">To change your area/region, please do it from top header location button.</p>
          </div>

          {/* --- MAP & GPS BUTTON --- */}
          <div className="relative h-[160px] w-full rounded-xl bg-[#e5e5e5] overflow-hidden border border-neutral-200 flex items-center justify-center shadow-inner">
            <div className="absolute inset-0 opacity-40 bg-[url('https://www.google.com/maps/@31.4169327,73.121792,15z?entry=ttu')] bg-cover bg-center"></div>
            <button type="button" onClick={handleGetCurrentLocation} className="relative z-10 bg-white px-4 py-2.5 rounded-xl shadow-md font-bold text-[13px] text-neutral-900 border border-neutral-200 hover:bg-neutral-50 transition active:scale-95 cursor-pointer flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#d32f2f]" /> Current Location
            </button>
          </div>
        </div>

        {/* --- SAVE BUTTON --- */}
        <div className="mt-5">
          <button disabled={!addressInput} onClick={handleSave} className={`w-full h-[48px] rounded-xl font-black text-[14px] transition-all duration-200 ${addressInput ? "bg-[#fbc02d] hover:bg-[#f5a623] text-black shadow-sm cursor-pointer" : "bg-neutral-200 text-neutral-400 cursor-not-allowed"}`}>
            Save Address
          </button>
        </div>
        
      </div>
    </div>
  );
}