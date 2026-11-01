import { ShieldCheck, Loader2 } from "lucide-react";

export function VerifyStep({ email, otpCode, setOtpCode, onSubmit, loading, error }: any) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 text-center">
      <ShieldCheck className="h-10 w-10 mx-auto text-[#f5b335]" />
      <h2 className="text-xl font-black">Verify your email</h2>
      <p className="text-sm font-semibold text-neutral-600 mb-2">Enter the code sent to {email}</p>
      {error && <div className="text-red-500 text-sm font-bold text-center bg-red-50 p-2 rounded-lg mb-2">{error}</div>}
      <input type="text" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="Enter 6-digit Code" maxLength={6} required className="w-full rounded-2xl border px-4 py-4 text-center text-xl font-black tracking-widest outline-none focus:border-black" />
      <button type="submit" disabled={loading} className="w-full rounded-2xl bg-[#f5b335] py-4 font-black flex items-center justify-center mt-2 cursor-pointer">
        {loading ? <Loader2 className="animate-spin mx-auto h-5 w-5" /> : "Verify Code"}
      </button>
    </form>
  );
}