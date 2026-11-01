"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Check, ChevronRight, MapPin, Plus } from "lucide-react";
import { useCartStore } from "@/lib/useCartStore";
import { brand } from "@/lib/data";
import { submitCustomerOrder } from "@/app/actions/orderActions";
import { AddressModal } from "@/components/checkout/AddressModal";
import { OrderSummary } from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { cart: cartProducts, selectedLocation, clearCart } = useCartStore();

  const [formData, setFormData] = useState({ fullName: "", mobileNumber: "", emailAddress: "", altPhone: "", instructions: "" });
  const [savedAddress, setSavedAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmedOrderNo, setConfirmedOrderNo] = useState<number | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("white_castle_user");
    if (storedUser) {
      const { name, email, phone } = JSON.parse(storedUser);
      setFormData(prev => ({ ...prev, fullName: name || "", emailAddress: email || "", mobileNumber: phone?.replace(/^(\+92|0)/, "") || "" }));
    }
  }, []);

  const handlePlaceOrder = async () => {
    if (!formData.fullName.trim() || formData.mobileNumber.replace(/\D/g, "").length < 10) return setErrorMessage("Invalid Name or Mobile Number.");
    if (!savedAddress.trim()) return setErrorMessage("Please add delivery address.");

    setLoading(true); setErrorMessage("");
    const payload = {
      customerName: formData.fullName, customerPhone: "0" + formData.mobileNumber.replace(/\D/g, "").slice(-10),
      customerAddress: formData.instructions ? `${savedAddress} (Instructions: ${formData.instructions})` : savedAddress,
      orderType: selectedLocation?.orderType || "Delivery", branchName: selectedLocation?.branchName || "Main Branch",
      totalAmount: cartProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      items: cartProducts.map((item) => ({ name: item.product.name, price: Number(item.product.price), quantity: Number(item.quantity) })),
    };

    const res = await submitCustomerOrder(payload);
    setLoading(false);
    if (res?.success) { setConfirmedOrderNo(res.orderNumber!); clearCart(); } else { setErrorMessage(res?.error || "Order Failed."); }
  };

  if (confirmedOrderNo) return (
    <div className="flex min-h-[75vh] items-center justify-center bg-[#faf8f5] px-4 font-sans text-center">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><Check className="h-8 w-8 stroke-[3]" /></div>
        <h2 className="text-2xl font-black">Order Confirmed!</h2>
        <p className="mt-2 text-sm text-neutral-600">Thank you for ordering from <b>{brand?.name}</b>.</p>
        <div className="mt-5 rounded-2xl bg-amber-50 p-4 border border-[#f5b335]/30"><span className="text-xs font-bold text-neutral-500">Your Order Number</span><p className="text-3xl font-black text-[#a32620]">#{confirmedOrderNo}</p></div>
        <button onClick={() => router.push("/")} className="mt-6 h-12 w-full rounded-xl bg-[#f5b335] text-sm font-black shadow-sm cursor-pointer hover:bg-[#e4a323]">Back to Home</button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f7f6f2] pb-16 pt-4 font-sans">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
        <nav className="mb-4 flex items-center gap-1.5 text-xs font-semibold text-neutral-400"><Link href="/">Home</Link><ChevronRight className="h-3 w-3" /><span className="text-[#f5a623] font-bold">Checkout</span></nav>
        {errorMessage && <div className="mb-6 flex items-center gap-2.5 rounded-2xl bg-[#fff5f5] p-4 text-sm font-bold text-red-600 border border-red-200"><AlertCircle className="h-5 w-5" />{errorMessage}</div>}
        
        <div className="grid gap-8 lg:grid-cols-[1fr_390px] items-start">
          <div className="space-y-6">
            <div className="rounded-3xl bg-[#f2f1ed] p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div><label className="text-xs font-bold block mb-2">Full Name</label><input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="h-12 w-full rounded-xl px-4 text-sm outline-none focus:ring-2 focus:ring-[#f5a623]" /></div>
                <div><label className="text-xs font-bold block mb-2">Mobile Number</label><input type="text" value={formData.mobileNumber} onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})} className="h-12 w-full rounded-xl px-4 text-sm outline-none focus:ring-2 focus:ring-[#f5a623]" /></div>
              </div>
              <div className="rounded-2xl bg-[#e7e6e0] p-5 flex items-center justify-between mb-5">
                <span className="text-sm font-black">Your Address</span>
                <button onClick={() => setIsAddressModalOpen(true)} className="flex items-center gap-1.5 bg-[#f5a623] px-4 py-2 rounded-xl text-xs font-black cursor-pointer"><Plus className="h-4 w-4" />{savedAddress ? "Change" : "Add"}</button>
              </div>
              {savedAddress && <div className="p-4 bg-white rounded-xl shadow-sm text-sm font-medium flex gap-3"><MapPin className="text-[#a32620]" />{savedAddress}</div>}
            </div>
          </div>
          <OrderSummary cartProducts={cartProducts} cartTotal={cartProducts.reduce((s, i) => s + i.product.price * i.quantity, 0)} loading={loading} onPlaceOrder={handlePlaceOrder} disabled={!mounted || cartProducts.length === 0} />
        </div>
      </div>
      <AddressModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} onSave={(addr) => { setSavedAddress(addr); setIsAddressModalOpen(false); }} initialArea={selectedLocation ? `${selectedLocation.branchName}, ${selectedLocation.city}` : ""} />
    </main>
  );
}