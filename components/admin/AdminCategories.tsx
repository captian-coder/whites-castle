"use client";

import { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { upsertCategoryInDB, deleteCategoryFromDB } from "@/app/actions/categoryActions";

export function AdminCategories({ categories, refreshData, notify }: any) {
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [catLabel, setCatLabel] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertCategoryInDB({ id: editingCategory?.id, label: catLabel });
    setEditingCategory(null);
    setCatLabel("");
    refreshData();
    notify(editingCategory ? "Category Updated!" : "Category Added!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 h-fit">
        <h2 className="text-xl font-bold mb-4">{editingCategory ? "Update Category" : "Add Category"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={catLabel} onChange={(e) => setCatLabel(e.target.value)} placeholder="Category Name" required className="w-full border p-3 rounded-xl text-sm outline-none focus:border-[#f6b71e]" />
          <button type="submit" className="w-full bg-[#f6b71e] py-3 rounded-xl font-black text-neutral-900 cursor-pointer">{editingCategory ? "Update" : "Save"}</button>
        </form>
      </div>
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 space-y-3 max-h-[600px] overflow-y-auto">
        {categories.map((cat: any) => (
          <div key={cat.id} className="flex items-center justify-between p-4 border rounded-xl bg-neutral-50">
            <div><h3 className="font-bold">{cat.label}</h3><p className="text-xs text-neutral-400">ID: {cat.id}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingCategory(cat); setCatLabel(cat.label); }} className="p-2 bg-amber-100 rounded-lg text-amber-700 hover:bg-amber-200 cursor-pointer"><Edit className="h-4 w-4" /></button>
              <button onClick={async () => { await deleteCategoryFromDB(cat.id); refreshData(); notify("Category Deleted!"); }} className="p-2 bg-red-100 rounded-lg text-red-600 hover:bg-red-200 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}