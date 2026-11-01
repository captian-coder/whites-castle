"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export type CreateOrderInput = {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  orderType: string;
  branchName: string;
  totalAmount: number;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
};

export async function submitCustomerOrder(data: CreateOrderInput) {
  try {
    // Validate cart items
    if (!data.items || data.items.length === 0) {
      return {
        success: false,
        error: "Your cart is empty.",
      };
    }

    const prismaAny = prisma as any;
    const orderModel = prismaAny.order ?? prismaAny.orders;

    if (!orderModel) {
      return {
        success: false,
        error: "Prisma Order model is missing. Please run 'npx prisma generate'.",
      };
    }

    // Save order and items directly into the SQLite database with explicit PENDING status
    const order = await orderModel.create({
      data: {
        customerName: data.customerName.trim(),
        customerPhone: data.customerPhone.trim(),
        customerAddress: data.customerAddress.trim(),
        orderType: data.orderType || "Delivery",
        branchName: data.branchName || "Main Branch",
        totalAmount: Number(data.totalAmount) || 0,
        status: "PENDING",
        items: {
          create: data.items.map((item) => ({
            name: item.name,
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) || 1,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Invalidate Next.js cache so the admin kitchen dashboard updates immediately
    revalidatePath("/admin/orders");
    revalidatePath("/admin");

    return {
      success: true,
      orderNumber: order.id,
      orderId: order.id,
    };
  } catch (error: any) {
    console.error("PRISMA DATABASE SAVE ERROR:", error);
    return {
      success: false,
      error: error?.message || "Something went wrong while saving your order.",
    };
  }
}

// Backward-compatibility alias
export const createRestaurantOrder = submitCustomerOrder;