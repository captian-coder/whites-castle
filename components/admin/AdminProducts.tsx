"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, Edit, Loader2 } from "lucide-react";
import { upsertBranchInDB, deleteBranchFromDB } from "@/app/actions/branchActions";
import { deleteProductFromDB } from "@/app/actions/productActions";

export function AdminProducts({ products, categories, refreshData, notify }: any) {
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [form, setForm] = useState({ name: "", price: "", categoryId: "", description: "" });
  const [image, setImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (categories.length > 0 && !form.categoryId) setForm(f => ({ ...f, categoryId: categories[0].id }));
  }, [categories]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default");
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
      const data = await res.json();
      if (data.secure_url) { setImage(data.secure_url); notify("Image Uploaded!"); }
    } catch (err) { console.error(err); } finally { setUploadingImage(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertProductInDB({ id: editingProduct?.id, name: form.name, price: Number(form.price), categoryId: form.categoryId, image, description: form.description });
    setEditingProduct(null); setForm({ name: "", price: "", categoryId: categories[0]?.id || "", description: "" }); setImage("");
    refreshData(); notify(editingProduct ? "Product Updated!" : "Product Added!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 h-fit">
        <h2 className="text-xl font-bold mb-4">{editingProduct ? "Update Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Product Name" required className="w-full border p-3 rounded-xl text-sm outline-none focus:border-[#f6b71e]" />
          <input type="number" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} placeholder="Price (Rs)" required className="w-full border p-3 rounded-xl text-sm outline-none focus:border-[#f6b71e]" />
          <select value={form.categoryId} onChange={(e) => setForm({...form, categoryId: e.target.value})} className="w-full border p-3 rounded-xl text-sm bg-white outline-none focus:border-[#f6b71e]">
            {categories.map((cat: any) => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
          </select>
          <div>
            <label className="mb-1.5 block text-xs font-bold">Upload Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border p-2.5 rounded-xl text-sm bg-white cursor-pointer" />
            {uploadingImage && <div className="flex items-center gap-2 mt-2 text-xs font-bold text-amber-600"><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</div>}
            {image && !uploadingImage && <div className="relative mt-3 h-20 w-20 rounded-xl overflow-hidden border-2 border-amber-400 bg-neutral-50"><Image src={image} alt="Preview" fill unoptimized className="object-cover" /></div>}
          </div>
          <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Description" rows={3} className="w-full border p-3 rounded-xl text-sm resize-none outline-none focus:border-[#f6b71e]" />
          <button type="submit" disabled={uploadingImage} className="w-full bg-[#f6b71e] py-3 rounded-xl font-black text-neutral-900 cursor-pointer disabled:opacity-50">{editingProduct ? "Update Product" : "Save Product"}</button>
        </form>
      </div>
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 space-y-3 max-h-[600px] overflow-y-auto">
        {products.map((p: any) => (
          <div key={p.id} className="flex items-center justify-between p-3 border rounded-xl bg-neutral-50">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-lg bg-white overflow-hidden border"><Image src={p.image || "/images/food-pizza.svg"} alt="" fill unoptimized className="object-contain p-1" /></div>
              <div><h3 className="font-bold">{p.name}</h3><p className="text-xs text-neutral-500">Rs. {p.price}</p></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingProduct(p); setForm({ name: p.name, price: p.price.toString(), categoryId: p.categoryId, description: p.description||"" }); setImage(p.image||""); }} className="p-2 bg-amber-100 rounded-lg text-amber-700 cursor-pointer"><Edit className="h-4 w-4" /></button>
              <button onClick={async () => { await deleteProductFromDB(p.id); refreshData(); notify("Product Deleted!"); }} className="p-2 bg-red-100 rounded-lg text-red-600 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function upsertProductInDB(arg0: { id: any; name: string; price: number; categoryId: string; image: string; description: string; }) {
    throw new Error("Function not implemented.");
}
