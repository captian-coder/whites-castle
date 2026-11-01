import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // --- Phone Number Validation ---
    if (!phone) {
      return NextResponse.json(
        { success: false, message: "Phone number is required" },
        { status: 400 }
      );
    }

    // Regex: Sirf numbers hon aur theek 11 digits hon
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, message: "Phone number must be exactly 11 valid digits" },
        { status: 400 }
      );
    }
    // -------------------------------

    const db = prisma as any;
    const userModel = db.user ?? db.User;

    if (!userModel) {
      return NextResponse.json(
        { success: false, message: "User model not found in database schema." },
        { status: 500 }
      );
    }

    // Check if user already exists
    const existing = await userModel.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email is already registered!" },
        { status: 400 }
      );
    }

    // Create new user in database
    const newUser = await userModel.create({
      data: {
        name: name || email.split("@")[0],
        email,
        password: password || "123456",
        phone: phone, // Validation pass hone ke baad yahan save hoga
      },
    });

    return NextResponse.json({
      success: true,
      user: { 
        id: newUser.id, 
        name: newUser.name, 
        email: newUser.email, 
        phone: newUser.phone // <--- Yeh line add ki gayi hai taake phone number bhi wapis jaye
      },
    });
  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}