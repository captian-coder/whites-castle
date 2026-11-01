import { Mail, MapPin, Phone } from "lucide-react";
import { brand } from "@/lib/data";

export function ContactInfo() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-black/5">
      <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-600">
        Contact Page
      </p>
      <h2 className="mt-2 text-3xl font-black leading-tight">Talk to the kitchen</h2>
      
      <div className="mt-6 space-y-4 text-sm font-semibold text-slate-600">
        <p className="flex gap-3">
          <Phone aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-500" />
          {brand.phone}
        </p>
        <p className="flex gap-3">
          <Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-500" />
          {brand.email}
        </p>
        <p className="flex gap-3">
          <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-500" />
          {brand.address}
        </p>
      </div>
    </div>
  );
}