import { Loader2 } from "lucide-react";

export function EmailStep({ email, setEmail, onSubmit, loading, error }: any) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <h2 className="text-2xl font-black">Sign in / Register</h2>
      {error && <div className="text-red-500 text-sm font-bold text-center bg-red-50 p-2 rounded-lg">{error}</div>}
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Enter your email address" 
        required 
        className="w-full rounded-2xl border px-5 py-4 font-semibold outline-none focus:border-black" 
      />
      <button type="submit" disabled={loading} className="w-full rounded-2xl bg-[#f5b335] py-4 font-black flex items-center justify-center cursor-pointer">
        {loading ? <Loader2 className="animate-spin mx-auto h-5 w-5" /> : "Continue"}
      </button>
    </form>
  );
}