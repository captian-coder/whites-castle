"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, Clock, MapPin, Phone, User, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/data";

async function changeOrderStatus(orderId: number, status: string) {
  const response = await fetch("/api/admin/orders", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, status }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update order status (${response.status})`);
  }

  return response.json();
}

async function getLiveOrders() {
  const response = await fetch("/api/admin/orders", { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to fetch orders (${response.status})`);
  }

  return response.json();
}

type OrderItem = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  orderType: string;
  branchName: string;
  totalAmount: number;
  status: string;
  createdAt: string | Date;
  items: OrderItem[];
};

export default function KitchenOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await getLiveOrders();
      if (Array.isArray(res)) {
        setOrders(res);
      } else if (res?.orders && Array.isArray(res.orders)) {
        setOrders(res.orders);
      }
    } catch (error) {
      console.error("Failed to fetch kitchen orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleManualRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    await fetchOrders();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 400);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleStatusUpdate = async (orderId: number, nextStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await changeOrderStatus(orderId, nextStatus);
      if (res?.success || res) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
        );
      }
    } catch (e) {
      console.error("Status update error:", e);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter out completed orders so they immediately disappear from the kitchen view
  const activeOrders = orders.filter(
    (order) => order.status?.toUpperCase().trim() !== "COMPLETED"
  );

  return (
    <main className="min-h-screen bg-[#faf8f5] p-6 font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-neutral-900">
              Kitchen Incoming Orders
            </h1>
            <div className="mt-1 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              <p className="text-xs font-bold text-emerald-600">
                Live Sync Active (Auto-refreshing every 5s)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-xs font-black text-neutral-800 shadow-sm transition hover:bg-neutral-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-75 select-none"
          >
            <RefreshCw
              className={`h-4 w-4 transition-transform duration-500 ${
                isRefreshing ? "animate-spin text-[#f5a623]" : "text-neutral-700"
              }`}
            />
            <span>{isRefreshing ? "Refreshing..." : "Refresh Now"}</span>
          </button>
        </div>

        {/* Orders Grid */}
        {loading && activeOrders.length === 0 ? (
          <div className="flex h-64 items-center justify-center rounded-3xl border border-neutral-200 bg-white p-8 text-center text-sm font-bold text-neutral-400 shadow-sm">
            <RefreshCw className="mr-2 h-5 w-5 animate-spin text-[#f5a623]" />
            <span>Loading live orders...</span>
          </div>
        ) : activeOrders.length === 0 ? (
          <div className="flex h-64 items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white p-8 text-center text-sm font-bold text-neutral-400 shadow-sm">
            No active orders right now.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col justify-between rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div>
                  {/* Top Bar: Order ID & Status */}
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                        Order ID
                      </span>
                      <h2 className="text-lg font-black text-neutral-900">
                        #{order.id}
                      </h2>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${
                        order.status === "COMPLETED"
                          ? "bg-emerald-100 text-emerald-700"
                          : order.status === "PREPARING"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {order.status || "PENDING"}
                    </span>
                  </div>

                  {/* Customer Info */}
                  <div className="mt-3 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 font-bold text-neutral-800">
                      <User className="h-3.5 w-3.5 text-[#a32620]" />
                      <span>{order.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-neutral-600">
                      <Phone className="h-3.5 w-3.5 text-neutral-400" />
                      <span>{order.customerPhone}</span>
                    </div>
                    <div className="flex items-start gap-2 font-semibold text-neutral-600">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" />
                      <span className="line-clamp-2">{order.customerAddress}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="mt-4 rounded-2xl bg-[#f9f8f6] p-3.5">
                    <div className="mb-2 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-neutral-500">
                      <ShoppingBag className="h-3.5 w-3.5 text-[#a32620]" />
                      <span>Items to Prepare</span>
                    </div>
                    <ul className="divide-y divide-neutral-200/60 text-xs">
                      {order.items?.map((item) => (
                        <li key={item.id} className="flex justify-between py-1.5">
                          <span className="font-extrabold text-neutral-800">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-bold text-neutral-600">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer: Total & Actions */}
                <div className="mt-5 border-t border-neutral-100 pt-3.5">
                  <div className="mb-3 flex items-center justify-between text-sm font-black">
                    <span className="text-neutral-500">Total Bill</span>
                    <span className="text-[#a32620]">{formatPrice(order.totalAmount)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      disabled={updatingId === order.id || order.status === "PREPARING"}
                      onClick={() => handleStatusUpdate(order.id, "PREPARING")}
                      className="cursor-pointer rounded-xl border border-neutral-200 bg-neutral-50 py-2 text-xs font-black text-neutral-700 transition hover:bg-neutral-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Preparing
                    </button>
                    <button
                      type="button"
                      disabled={updatingId === order.id}
                      onClick={() => handleStatusUpdate(order.id, "COMPLETED")}
                      className="cursor-pointer rounded-xl bg-[#f5b335] py-2 text-xs font-black text-neutral-900 shadow-sm transition hover:bg-[#e4a323] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Completed
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}