"use client";

import { MapPin, Phone, Store } from "lucide-react";
import { useCartStore } from "@/lib/useCartStore";
import { useEffect, useState } from "react";

type BranchLocationsProps = {
  standalone?: boolean;
};

export function BranchLocations({ standalone = false }: BranchLocationsProps) {
  // Zustand Store se setLocation action
  const setLocation = useCartStore((state) => state.setLocation);
  const [branches, setBranches] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBranches() {
      try {
        const response = await fetch("/api/branches");
        if (!response.ok) throw new Error("Failed to load branches");
        const data = await response.json();
        setBranches(data);
      } catch (error) {
        console.error("Failed to load branches", error);
      }
    }
    fetchBranches();
  }, []);

  return (
    <section id="locations" className={`${standalone ? "py-8" : "py-12"} bg-[#faf8f5]`}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch) => (
              <article
                key={branch.id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#a32620]">
                      {branch.city}
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-neutral-900">{branch.name}</h3>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-50 text-[#f6b71e]">
                    <Store aria-hidden="true" className="h-5 w-5 stroke-[2.5]" />
                  </span>
                </div>

                <div className="space-y-2.5 text-sm text-neutral-600">
                  <p className="flex items-start gap-2.5 font-medium leading-relaxed">
                    <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#f6b71e]" />
                    <span>{branch.address || "Address not specified"}</span>
                  </p>
                  <p className="flex items-center gap-2.5 font-medium">
                    <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-[#f6b71e]" />
                    <span>{branch.phone || "N/A"}</span>
                  </p>
                  <p className="pt-1 text-xs font-medium text-neutral-500">{branch.hours || "11:00 AM - 3:00 AM"}</p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setLocation({
                      city: branch.city,
                      branchName: branch.name,
                      branchId: branch.id,
                      orderType: "Pick-Up",
                    })
                  }
                  className="mt-6 h-11 w-full rounded-xl bg-[#f6b71e] text-sm font-bold text-neutral-900 transition hover:bg-[#e5a816] active:scale-[0.99]"
                >
                  Order from this branch
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}