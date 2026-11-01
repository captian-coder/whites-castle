"use client";

import { useState } from "react";
import { Crosshair, Loader2, MapPin, X } from "lucide-react";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: string) => void;
  initialArea: string;
}

export function AddressModal({ isOpen, onClose, onSave, initialArea }: AddressModalProps) {
  const [areaCity, setAreaCity] = useState(initialArea);
  const [streetAddress, setStreetAddress] = useState("");
  const [fetchingLocation, setFetchingLocation] = useState(false);

  if (!isOpen) return null;

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) return alert("Browser does not support geolocation.");
    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1`);
          const data = await res.json();
          if (data?.address) {
            const addr = data.address;
            const city = addr.city || addr.town || addr.county || "Faisalabad";
            setAreaCity(city);
            setStreetAddress(data.display_name.split(",").slice(0, 3).join(", ").trim());
          }
        } catch {
          setAreaCity("Faisalabad, Punjab");
          setStreetAddress(`GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        } finally {
          setFetchingLocation(false);
        }
      },
      () => { setFetchingLocation(false); alert("Location Error! Turn on GPS."); },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!streetAddress.trim() && !areaCity.trim()) return;
    onSave([streetAddress.trim(), areaCity.trim()].filter(Boolean).join(", "));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-150">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-[#f5a623]" /><h3 className="text-base font-black text-neutral-900">Delivery Address</h3></div>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 cursor-pointer"><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-4">
          <button type="button" onClick={handleGetCurrentLocation} disabled={fetchingLocation} className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#f5a623] bg-[#fffcf5] text-xs font-black shadow-2xs hover:bg-[#fef3d6]">
            {fetchingLocation ? <><Loader2 className="h-4 w-4 animate-spin text-[#f5a623]" /><span>Detecting...</span></> : <><Crosshair className="h-4 w-4 text-[#a32620]" /><span>Use Current Location (GPS)</span></>}
          </button>
        </div>
        <div className="my-4 flex items-center gap-3"><div className="h-px flex-1 bg-neutral-200" /><span className="text-[11px] font-bold text-neutral-400">or enter manually</span><div className="h-px flex-1 bg-neutral-200" /></div>
        <form onSubmit={handleSave} className="space-y-4">
          <div><label className="mb-1.5 block text-xs font-bold">Area / City <span className="text-red-500">*</span></label><input type="text" required value={areaCity} onChange={(e) => setAreaCity(e.target.value)} className="h-11 w-full rounded-xl border border-neutral-300 bg-[#fbfaf8] px-4 text-xs font-semibold focus:border-[#f5a623] outline-none" /></div>
          <div><label className="mb-1.5 block text-xs font-bold">Street Address <span className="text-red-500">*</span></label><textarea required rows={3} value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="w-full resize-none rounded-xl border border-neutral-300 bg-[#fbfaf8] p-3 text-xs font-semibold focus:border-[#f5a623] outline-none" /></div>
          <div className="flex items-center justify-end gap-3 pt-2"><button type="button" onClick={onClose} className="h-11 rounded-xl bg-neutral-100 px-5 text-xs font-bold cursor-pointer">Cancel</button><button type="submit" className="h-11 rounded-xl bg-[#f5a623] px-6 text-xs font-black cursor-pointer">Save Address</button></div>
        </form>
      </div>
    </div>
  );
}