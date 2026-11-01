"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { EmailStep } from "./auth/EmailStep";
import { RegisterStep } from "./auth/RegisterStep";
import { VerifyStep } from "./auth/VerifyStep";

export function AuthModal({ isOpen, onClose, onSuccess }: any) {
  const [step, setStep] = useState<"email" | "register" | "verify">("email");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  
  const [existingUser, setExistingUser] = useState<any>(null);
  const [tempUserData, setTempUserData] = useState<any>(null);

  if (!isOpen) return null;

  const sendOtpEmail = async (targetEmail: string) => {
    await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: targetEmail }),
    });
  };

  const handleEmailCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true); setError(null);

    try {
      const res = await fetch("/api/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.exists) {
        setAuthMode("login");
        setExistingUser(data.user);
        await sendOtpEmail(email);
        setStep("verify");
      } else {
        setAuthMode("register"); 
        setStep("register");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTempUserData({ name, email, phone });
    await sendOtpEmail(email);
    setLoading(false);
    setStep("verify");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const verifyRes = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otpCode }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        setError(verifyData.message || "Invalid Code");
        setLoading(false);
        return;
      }

      if (authMode === "login") {
        onSuccess(existingUser);
        onClose();
      } else {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: tempUserData.name,
            email: tempUserData.email,
            phone: tempUserData.phone,
            password: "OTP_LOGIN",
          }),
        });
        const registerData = await res.json();
        
        if (registerData.success || registerData.user) {
          onSuccess(registerData.user || registerData);
          onClose();
        } else {
          setError(registerData.message || "Registration failed");
        }
      }
    } catch (err) {
      setError("Network error during verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-[480px] rounded-3xl bg-white p-8 sm:p-10 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 h-9 w-9 rounded-full bg-neutral-400 text-white flex items-center justify-center cursor-pointer">
          <X className="h-5 w-5" />
        </button>

        {step === "email" && <EmailStep email={email} setEmail={setEmail} onSubmit={handleEmailCheck} loading={loading} error={error} />}
        {step === "register" && <RegisterStep name={name} setName={setName} phone={phone} setPhone={setPhone} onSubmit={handleRegisterSubmit} loading={loading} error={error} />}
        {step === "verify" && <VerifyStep email={email} otpCode={otpCode} setOtpCode={setOtpCode} onSubmit={handleVerifyOtp} loading={loading} error={error} />}
      </div>
    </div>
  );
}