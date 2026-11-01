"use client";

import { useState } from "react";

export function UserProfileForm({ user, onUpdate }: { user: any; onUpdate: (data: any) => void }) {
  const [fullName, setFullName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...user, name: fullName, phone });
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const inputClass = "w-full h-[54px] rounded-2xl bg-[#f4f5f8] border-none px-5 text-[15px] font-semibold text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#f5a623]";

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-neutral-100 p-8 md:p-10">
      <h2 className="text-2xl font-black text-neutral-900 mb-8">Profile</h2>
      {successMessage && <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold text-center">{successMessage}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div><label className="block text-sm font-bold text-neutral-800 mb-2.5">Full Name</label><input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} /></div>
        <div><label className="block text-sm font-bold text-neutral-800 mb-2.5">Email</label><input type="email" disabled value={user?.email || ""} className={`${inputClass} cursor-not-allowed opacity-80`} /></div>
        <div><label className="block text-sm font-bold text-neutral-800 mb-2.5">Mobile Number</label><input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} /></div>
        
        <div>
          <label className="block text-sm font-bold text-neutral-800 mb-2.5">Gender <span className="text-neutral-400 font-normal">(Optional)</span></label>
          <div className="grid grid-cols-2 gap-4">
            {["Male", "Female"].map((g) => (
              <label key={g} className={`flex items-center justify-center gap-2 h-[54px] rounded-2xl cursor-pointer font-bold text-[15px] transition-all duration-200 ${gender === g ? "bg-[#fbc02d] text-black border-none" : "bg-transparent border border-neutral-300 text-neutral-700 hover:border-neutral-400"}`}>
                <input type="radio" name="gender" value={g} checked={gender === g} onChange={() => setGender(g)} className="accent-black w-4 h-4" /> {g}
              </label>
            ))}
          </div>
        </div>
        
        <div><label className="block text-sm font-bold text-neutral-800 mb-2.5">Date Of Birth <span className="text-neutral-400 font-normal">(Optional)</span></label><input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={inputClass} /></div>
        
        <div className="pt-3">
          <button type="submit" className="w-full h-[54px] rounded-2xl bg-[#fbc02d] hover:bg-[#f5a623] text-black font-black text-[15px] transition active:scale-[0.99] cursor-pointer">Update Profile</button>
        </div>
      </form>
    </div>
  );
}