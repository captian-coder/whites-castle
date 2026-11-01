"use client";

import { CheckCircle2 } from "lucide-react";
import { useOrder } from "./OrderingProvider";

export function Toast() {
  const { toast } = useOrder();

  if (!toast) {
    return null;
  }

  return (
    <div className="fixed bottom-[104px] left-1/2 z-[95] flex h-12 -translate-x-1/2 animate-toast-in items-center gap-3 rounded-lg bg-leaf px-5 text-sm font-black text-white shadow-drawer">
      <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
      {toast}
    </div>
  );
}
