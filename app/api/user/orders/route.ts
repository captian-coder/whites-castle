import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone } = body;

    // FIX 1: Check karna zaroori hai ke user ne email ya phone diya bhi hai ya nahi
    if (!email && !phone) {
      return NextResponse.json(
        { success: false, error: "Email or phone is required" }, 
        { status: 400 }
      );
    }

    // Email ya Phone dono mein se kisi aik par bhi match karayein
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          // NOTE: Sirf woh fields yahan likhein jo aapke schema.prisma mein mojood hain. 
          // Agar 'email' ya 'phone' naam ki fields schema mein nahi hain toh inhe hata dein.
          ...(email ? [{ customerEmail: email }] : []),
          ...(phone ? [{ customerPhone: phone }] : []),
        ],
      },
      orderBy: { id: "desc" }, // 'createdAt' agar schema mein nahi hai toh 'id' use karein
      include: { items: true } // Order ke items bhi show karwane ke liye
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("API Error fetching user orders:", error);
    
    // FIX 2: Error aane par kabhi bhi fallback orders nahi bhejte, balki khali array bhejein
    return NextResponse.json(
      { success: false, orders: [] }, 
      { status: 500 }
    );
  }
}