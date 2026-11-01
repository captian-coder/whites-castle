"use client";

import { Inbox, Package, Clock, ChevronRight } from "lucide-react";

export function UserOrdersList({ orders, loading }: { orders: any[]; loading: boolean }) {
  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-neutral-100 overflow-hidden">
      <div className="px-8 py-5 border-b border-neutral-100 flex items-center gap-3">
        <Inbox className="h-5 w-5 text-neutral-800 stroke-[2.5]" />
        <h2 className="text-[17px] font-black text-neutral-900">My Orders</h2>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="h-8 w-8 border-4 border-neutral-200 border-t-[#f5a623] rounded-full animate-spin"></div>
        </div>
      ) : orders.length > 0 ? (
        <div className="p-6 md:p-8 space-y-4">
          {orders.map((order, idx) => (
            <div key={idx} className="bg-[#f4f5f8] rounded-2xl p-5 border border-transparent hover:border-neutral-200 transition-all cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm text-[#f5a623]">
                  <Package className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-neutral-900 text-[15px]">Order #{String(order.id).slice(-6).toUpperCase()}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {order.status || 'Processing'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-500 mt-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-[13px] font-medium">{order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-neutral-200 pt-4 md:pt-0">
                <div className="text-left md:text-right">
                  <p className="text-[12px] font-bold text-neutral-500 mb-0.5">Total Amount</p>
                  <p className="text-[15px] font-black text-black">Rs. {order.totalAmount || order.total || 0}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-[#fbc02d] transition-colors">
                  <ChevronRight className="h-5 w-5 text-neutral-600 group-hover:text-black" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <div className="h-20 w-20 flex items-center justify-center rounded-full mb-4 text-neutral-300">
            <Inbox className="h-16 w-16 stroke-2" />
          </div>
          <p className="text-[15px] font-bold text-neutral-400">You do not have any previous orders.</p>
        </div>
      )}
    </div>
  );
}