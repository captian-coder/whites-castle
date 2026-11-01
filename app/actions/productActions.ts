"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProductsFromDB() {
  return await prisma.product.findMany({ include: { category: true } });
}

export async function upsertProductInDB(data: { id?: string; name: string; price: number; categoryId: string; image?: string; description?: string }) {
  if (data.id) {
    await prisma.product.update({
      where: { id: data.id },
      data: { name: data.name, price: data.price, categoryId: data.categoryId, image: data.image, description: data.description },
    });
  } else {
    const uniqueProductId = "prod_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    await prisma.product.create({
      data: { id: uniqueProductId, name: data.name, price: data.price, categoryId: data.categoryId, image: data.image || "/images/food-pizza.svg", description: data.description },
    });
  }
  revalidatePath("/admin");
  revalidatePath("/menu");
}

export async function deleteProductFromDB(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/menu");
}