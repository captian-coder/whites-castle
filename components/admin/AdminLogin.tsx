"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export function AdminLogin({ onLogin }: { onLogin: (pwd: string) => void }) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff8ee] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-neutral-200">
        <div className="flex justify-center mb-4 text-[#f6b71e]"><Lock className="h-12 w-12" /></div>
        <h1 className="text-2xl font-black text-center text-neutral-900 mb-2">Admin Login</h1>
        <p className="text-sm font-semibold text-center text-neutral-500 mb-6">Enter your password</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter password" 
            required 
            className="w-full rounded-xl border border-neutral-300 p-3.5 text-sm font-semibold focus:outline-none focus:border-amber-500" 
          />
          <button type="submit" className="w-full rounded-xl bg-[#f6b71e] py-3.5 text-base font-black text-neutral-900 shadow-sm transition hover:bg-[#e4a323] cursor-pointer">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}