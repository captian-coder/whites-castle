"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Edit, Loader2 } from "lucide-react";
import { upsertBannerInDB, deleteBannerFromDB } from "@/app/actions/bannerActions";

export function AdminBanners({ banners, refreshData, notify }: any) {
  const [editingBanner, setEditingBanner] = useState<any | null>(null);
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

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
      if (data.secure_url) { setBannerImage(data.secure_url); notify("Image Uploaded!"); }
    } catch (err) { console.error(err); } finally { setUploadingImage(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerImage) return alert("Please upload an image first!");
    await upsertBannerInDB({ id: editingBanner?.id, image: bannerImage, title: bannerTitle });
    setEditingBanner(null); setBannerTitle(""); setBannerImage("");
    refreshData(); notify(editingBanner ? "Banner Updated!" : "Banner Added!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 h-fit">
        <h2 className="text-xl font-bold mb-4">{editingBanner ? "Update Banner" : "Add Banner"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={bannerTitle} onChange={(e) => setBannerTitle(e.target.value)} placeholder="Banner Title (Optional)" className="w-full border p-3 rounded-xl text-sm outline-none focus:border-[#f6b71e]" />
          <div>
            <label className="mb-1.5 block text-xs font-bold">Upload Banner Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border p-2.5 rounded-xl text-sm bg-white cursor-pointer" />
            {uploadingImage && <div className="flex items-center gap-2 mt-2 text-xs font-bold text-amber-600"><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</div>}
            {bannerImage && !uploadingImage && <div className="relative mt-3 h-24 w-full rounded-xl overflow-hidden border"><Image src={bannerImage} alt="Preview" fill unoptimized className="object-cover" /></div>}
          </div>
          <button type="submit" disabled={uploadingImage} className="w-full bg-[#f6b71e] py-3 rounded-xl font-black text-neutral-900 cursor-pointer disabled:opacity-50">{editingBanner ? "Update Banner" : "Save Banner"}</button>
        </form>
      </div>
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 space-y-3 max-h-[600px] overflow-y-auto">
        {banners.map((b: any) => (
          <div key={b.id} className="flex items-center justify-between p-3 border rounded-xl bg-neutral-50">
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-28 rounded-lg overflow-hidden border"><Image src={b.image} alt="" fill unoptimized className="object-cover" /></div>
              <div><h3 className="font-bold">{b.title || "Untitled"}</h3><p className="text-xs text-neutral-400">ID: {b.id}</p></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingBanner(b); setBannerImage(b.image); setBannerTitle(b.title || ""); }} className="p-2 bg-amber-100 rounded-lg text-amber-700 cursor-pointer"><Edit className="h-4 w-4" /></button>
              <button onClick={async () => { await deleteBannerFromDB(b.id); refreshData(); notify("Banner Deleted!"); }} className="p-2 bg-red-100 rounded-lg text-red-600 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}