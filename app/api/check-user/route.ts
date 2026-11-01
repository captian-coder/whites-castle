import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const db = prisma as any;
    const userModel = db.user ?? db.User;

    const user = await userModel.findUnique({ where: { email } });

    if (user) {
      // User mil gaya (Login flow)
      return NextResponse.json({ 
        exists: true, 
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          phone: user.phone // <--- Yeh line add ki gayi hai taake login ke waqt phone bhi mile
        } 
      });
    }
    
    // User nahi mila (Register flow)
    return NextResponse.json({ exists: false });
  } catch (error) {
    console.error("Check User Error:", error);
    return NextResponse.json({ exists: false, error: "Server Error" }, { status: 500 });
  }
}