"use client";

import { Building2, Plus, MapPinned, ExternalLink, Trash2 } from "lucide-react";

interface AddressListProps {
  addresses: any[];
  onAddClick: () => void;
  onDelete: (id: string) => void;
}

export function UserAddressList({ addresses, onAddClick, onDelete }: AddressListProps) {
  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-neutral-100 overflow-hidden">
      
      {/* --- HEADER BAR --- */}
      <div className="px-8 py-5 border-b border-neutral-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="h-[22px] w-[22px] text-neutral-900 stroke-[2.5]" />
          <h2 className="text-[17px] font-black text-neutral-900">My Addresses</h2>
        </div>
        <button onClick={onAddClick} className="flex items-center gap-2 bg-[#111111] text-white px-5 py-2.5 rounded-xl font-bold text-[13px] hover:bg-black transition shadow-sm active:scale-[0.98] cursor-pointer">
          <Plus className="h-4 w-4 stroke-[3]" /> Add new Address
        </button>
      </div>

      {/* --- CONTENT AREA (LIST OR EMPTY STATE) --- */}
      {addresses.length > 0 ? (
        <div className="p-6 md:p-8 grid grid-cols-1 gap-4">
          {addresses.map((item) => (
            <div key={item.id} className="bg-[#f4f5f8] rounded-2xl p-5 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#f5a623] shrink-0">
                  <MapPinned className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-[15px]">{item.address}</h3>
                  <p className="text-[13px] text-neutral-500 mt-0.5">{item.region}</p>
                  {item.mapUrl && (
                    <a href={item.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#f5a623] hover:underline mt-2">
                      View on Google Maps <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
              <button onClick={() => onDelete(item.id)} className="self-end sm:self-center p-2 rounded-xl text-red-500 hover:bg-red-50 transition cursor-pointer" title="Delete Address">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <div className="mb-4 text-neutral-300">
            <Building2 className="h-16 w-16 stroke-[1.5]" />
          </div>
          <p className="text-[15px] font-bold text-[#9ca3af]">You don't have a saved address.</p>
        </div>
      )}

    </div>
  );
}