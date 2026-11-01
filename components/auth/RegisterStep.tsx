import { Loader2 } from "lucide-react";

export function RegisterStep({ name, setName, phone, setPhone, onSubmit, loading, error }: any) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-2xl font-black">Create Account</h2>
      {error && <div className="text-red-500 text-sm font-bold text-center bg-red-50 p-2 rounded-lg">{error}</div>}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required className="w-full rounded-xl border px-4 py-3 font-semibold outline-none focus:border-black" />
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required className="w-full rounded-xl border px-4 py-3 font-semibold outline-none focus:border-black" />
      <button type="submit" disabled={loading} className="w-full rounded-2xl bg-[#f5b335] py-4 font-black flex items-center justify-center mt-2 cursor-pointer">
        {loading ? <Loader2 className="animate-spin mx-auto h-5 w-5" /> : "Continue to OTP"}
      </button>
    </form>
  );
}