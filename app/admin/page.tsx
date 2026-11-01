"use client";

import { useState, useEffect } from "react";
import { LogOut, Store, Package, Layers, CheckCircle2 } from "lucide-react";
import * as adminActions from "./actions";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminCategories } from "@/components/admin/AdminCategories";
import { AdminBranches } from "@/components/admin/AdminBranches";
import { AdminBanners } from "@/components/admin/AdminBanners";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "branches" | "banners">("products");
  const [notification, setNotification] = useState<string | null>(null);

  type AdminData = {
    products: any[];
    categories: any[];
    branches: any[];
    banners: any[];
  };

  const [data, setData] = useState<AdminData>({ products: [], categories: [], branches: [], banners: [] });

  const runAction = async (names: string[]) => {
    const actions = adminActions as Record<string, unknown>;
    const action = names.map((name) => actions[name]).find((value) => typeof value === "function");
    return action ? (await (action as () => Promise<any[]>)()) : [];
  };

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "true") {
      setIsAuthenticated(true);
      loadDatabaseData();
    }
  }, []);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const loadDatabaseData = async () => {
    const products = await runAction(["getProductsFromDB", "getProducts"]);
    const categories = await runAction(["getCategoriesFromDB", "getCategories"]);
    const branches = await runAction(["getBranchesFromDB", "getBranches"]);
    const banners = await runAction(["getBannersFromDB", "getBanners"]);
    setData({ products, categories, branches, banners });
  };

  const handleLogin = (password: string) => {
    if (password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      loadDatabaseData();
      showNotification("Successfully Logged In!");
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  if (!isAuthenticated) return <AdminLogin onLogin={handleLogin} />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 relative">
      {notification && (
        <div className="fixed top-6 right-6 z-[200] flex items-center gap-2.5 rounded-2xl bg-neutral-900 px-5 py-3.5 text-white shadow-xl">
          <CheckCircle2 className="h-5 w-5 text-[#f6b71e]" /><span className="text-sm font-bold">{notification}</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-[#1c1917]">Database Admin Dashboard</h1>
        <button onClick={() => { setIsAuthenticated(false); localStorage.removeItem("admin_auth"); }} className="flex items-center gap-2 rounded-xl bg-red-100 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-200 cursor-pointer">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 border-b border-neutral-200 pb-4">
        {[
          { id: "products", label: "Products", icon: Package, count: data.products.length },
          { id: "categories", label: "Categories", icon: Layers, count: data.categories.length },
          { id: "branches", label: "Branches", icon: Store, count: data.branches.length },
          { id: "banners", label: "Banners", icon: Layers, count: data.banners.length }
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-6 py-2.5 rounded-xl text-sm font-black transition cursor-pointer ${activeTab === tab.id ? "bg-[#f6b71e] text-neutral-900" : "bg-white border border-neutral-200"}`}>
            <tab.icon className="inline h-4 w-4 mr-2" /> {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {activeTab === "products" && <AdminProducts products={data.products} categories={data.categories} refreshData={loadDatabaseData} notify={showNotification} />}
      {activeTab === "categories" && <AdminCategories categories={data.categories} refreshData={loadDatabaseData} notify={showNotification} />}
      {activeTab === "branches" && <AdminBranches branches={data.branches} refreshData={loadDatabaseData} notify={showNotification} />}
      {activeTab === "banners" && <AdminBanners banners={data.banners} refreshData={loadDatabaseData} notify={showNotification} />}
    </div>
  );
}