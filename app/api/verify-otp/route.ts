import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    const db = prisma as any;
    const otpModel = db.otp ?? db.Otp;

    // Database se us email ka OTP check karein
    const otpRecord = await otpModel.findUnique({
      where: { email },
    });

    if (!otpRecord) {
      return NextResponse.json({ success: false, message: "No OTP found for this email" }, { status: 400 });
    }

    if (otpRecord.code !== code) {
      return NextResponse.json({ success: false, message: "Invalid verification code" }, { status: 400 });
    }

    // OTP theek hai! Isay database se delete kar dein taake dobara use na ho
    await otpModel.delete({ where: { email } });

    return NextResponse.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}