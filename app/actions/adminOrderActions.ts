"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getLiveOrders() {
  try {
    const db = prisma as any;
    const orderModel = db.order ?? db.orders ?? db.restaurantOrder;
    if (!orderModel) return { success: false, data: [] };

    const orders = await orderModel.findMany({
      where: { status: { not: "COMPLETED" } },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: orders };
  } catch (error) {
    console.error("Failed to fetch live orders:", error);
    return { success: false, data: [] };
  }
}

export async function changeOrderStatus(orderId: number, status: string) {
  try {
    const db = prisma as any;
    const orderModel = db.order ?? db.orders ?? db.restaurantOrder;
    if (!orderModel) return { success: false };

    await orderModel.update({ where: { id: orderId }, data: { status } });
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    console.error("Failed to update order status:", error);
    return { success: false };
  }
}