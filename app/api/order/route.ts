import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// --- GET Method: Admin Dashboard par live orders show karwane ke liye ---
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { id: "desc" }, // Naye orders top par aayenge
      include: { items: true }, // Aap ke POST method mein 'items' the, is liye yahan bhi include kiye hain taake order details nazar aayen
    });
    
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("API Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// --- POST Method: Naya order banane ke liye (Aap ka original code) ---
export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty" },
        { status: 400 }
      );
    }

    // --- Phone Number Validation ---
    const phone = data.customerPhone || data.phone;
    
    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Regex: Sirf numbers hon aur theek 11 digits hon
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, error: "Phone number must be exactly 11 valid digits" },
        { status: 400 }
      );
    }
    // -------------------------------

    const order = await prisma.order.create({
      data: {
        customerName: data.customerName || data.name || "Customer",
        customerPhone: phone, // Validation pass hone ke baad theek number yahan aayega
        customerAddress: data.customerAddress || data.address || "",
        orderType: data.orderType || "Delivery",
        branchName: data.branchName || "Main Branch",
        totalAmount: Number(data.totalAmount || data.total) || 0,
        items: {
          create: data.items.map((item: any) => ({
            name: item.name,
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) || 1,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.id,
      orderId: order.id,
    });
  } catch (error: any) {
    console.error("API ORDERS ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}