"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function UserDeleteModal({ onDelete }: { onDelete: () => void }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-[20px] shadow-sm border border-neutral-100 p-6 mt-6 flex items-center justify-center">
        <button type="button" onClick={() => setShowModal(true)} className="text-[15px] font-bold text-[#d32f2f] hover:opacity-80 transition cursor-pointer">
          Request Account Deletion
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h3 className="text-lg font-black text-neutral-900">Are you sure?</h3>
              <button onClick={() => setShowModal(false)} className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            
            <p className="text-[13px] font-semibold text-neutral-600 mt-5 leading-relaxed">
              Once you confirm, you will be automatically logged out and will not be able to access your account anymore and all of your account data will be permanently deleted.
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <button type="button" onClick={onDelete} className="w-full h-[50px] rounded-2xl bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-black text-[15px] transition shadow-sm cursor-pointer">Confirm Delete</button>
              <button type="button" onClick={() => setShowModal(false)} className="w-full h-[50px] rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-black text-[15px] transition cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}