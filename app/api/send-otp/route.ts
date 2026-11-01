import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // 6-digit random OTP generate karein
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const db = prisma as any;
    const otpModel = db.otp ?? db.Otp;

    // Database mein OTP save karein (agar pehle se hai toh update kar de)
    await otpModel.upsert({
      where: { email },
      update: { code: otpCode, createdAt: new Date() },
      create: { email, code: otpCode },
    });

    // Nodemailer Email Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // <--- Yeh line add ki gayi hai security bypass karne ke liye
      }
    });

    const mailOptions = {
      from: `"Golden Crust" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification Code",
      html: `
        <div style="font-family: sans-serif; text-align: center; padding: 20px;">
          <h2>Welcome to Golden Crust!</h2>
          <p>Your verification code is:</p>
          <h1 style="font-size: 32px; letter-spacing: 4px; color: #f5b335;">${otpCode}</h1>
          <p>This code is valid for 5 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return NextResponse.json({ success: false, message: "Failed to send OTP" }, { status: 500 });
  }
}