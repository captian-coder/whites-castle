import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// --- GET Method: Admin Dashboard par live orders show karwane ke liye ---
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { id: "desc" },
      include: { items: true },
    });
    
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("API Error fetching admin orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// --- POST Method: Naya order database mein create karne ke liye ---
export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ success: false, error: "Cart is empty" }, { status: 400 });
    }

    const phone = data.customerPhone || data.phone;
    
    if (!phone) {
      return NextResponse.json({ success: false, error: "Phone number is required" }, { status: 400 });
    }

    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ success: false, error: "Phone number must be exactly 11 valid digits" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        customerName: data.customerName || data.name || "Customer",
        customerPhone: phone, 
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

    return NextResponse.json({ success: true, orderNumber: order.id, orderId: order.id }, { status: 200 });
  } catch (error: any) {
    console.error("API ORDERS POST ERROR:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
  }
}

// --- PATCH Method: Order ka status update karne aur screen se hatane ke liye ---
export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    const { orderId, status } = data;

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, error: "Missing orderId or status" }, 
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id: Number(orderId) },
      data: { status: status },
    });

    return NextResponse.json({ success: true, order: updatedOrder }, { status: 200 });
  } catch (error: any) {
    console.error("API Update Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order status" }, 
      { status: 500 }
    );
  }
}