"use client";

import { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { upsertBranchInDB, deleteBranchFromDB } from "@/app/actions/branchActions";

export function AdminBranches({ branches, refreshData, notify }: any) {
  const [editingBranch, setEditingBranch] = useState<any | null>(null);
  const [form, setForm] = useState({ name: "", city: "", address: "", phone: "", hours: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertBranchInDB({ id: editingBranch?.id, ...form });
    setEditingBranch(null);
    setForm({ name: "", city: "", address: "", phone: "", hours: "" });
    refreshData();
    notify(editingBranch ? "Branch Updated!" : "Branch Added!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 h-fit">
        <h2 className="text-xl font-bold mb-4">{editingBranch ? "Update Branch" : "Add Branch"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Branch Name" required className="w-full border p-3 rounded-xl text-sm outline-none focus:border-[#f6b71e]" />
          <input type="text" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} placeholder="City" required className="w-full border p-3 rounded-xl text-sm outline-none focus:border-[#f6b71e]" />
          <input type="text" value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} placeholder="Address" className="w-full border p-3 rounded-xl text-sm outline-none focus:border-[#f6b71e]" />
          <input type="text" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="Phone" className="w-full border p-3 rounded-xl text-sm outline-none focus:border-[#f6b71e]" />
          <input type="text" value={form.hours} onChange={(e) => setForm({...form, hours: e.target.value})} placeholder="Hours" className="w-full border p-3 rounded-xl text-sm outline-none focus:border-[#f6b71e]" />
          <button type="submit" className="w-full bg-[#f6b71e] py-3 rounded-xl font-black text-neutral-900 cursor-pointer">{editingBranch ? "Update" : "Save"}</button>
        </form>
      </div>
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 space-y-3 max-h-[600px] overflow-y-auto">
        {branches.map((b: any) => (
          <div key={b.id} className="flex items-center justify-between p-4 border rounded-xl bg-neutral-50">
            <div><h3 className="font-bold">{b.name} ({b.city})</h3><p className="text-xs text-neutral-500">{b.address}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingBranch(b); setForm({ name: b.name, city: b.city, address: b.address||"", phone: b.phone||"", hours: b.hours||"" }); }} className="p-2 bg-amber-100 rounded-lg text-amber-700 hover:bg-amber-200 cursor-pointer"><Edit className="h-4 w-4" /></button>
              <button onClick={async () => { await deleteBranchFromDB(b.id); refreshData(); notify("Branch Deleted!"); }} className="p-2 bg-red-100 rounded-lg text-red-600 hover:bg-red-200 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}