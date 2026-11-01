import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { orderNo?: string };
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <CheckCircle2 className="h-16 w-16 text-green-600" />
      <h1 className="mt-4 text-3xl font-black text-neutral-900">Order Received!</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Aapka order restaurant ko bhej diya gaya hai.
      </p>

      <div className="mt-6 rounded-2xl bg-amber-50 border border-[#f5b335]/30 p-6 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">Your Order Number</span>
        <p className="mt-1 text-4xl font-black text-[#a32620]">#{searchParams.orderNo || "---"}</p>
      </div>

      <Link
        href="/"
        className="mt-8 rounded-xl bg-[#f5b335] px-6 py-3 text-sm font-black text-neutral-900 hover:bg-[#e4a323]"
      >
        Back to Home
      </Link>
    </div>
  );
}