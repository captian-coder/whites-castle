"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCategoriesFromDB() {
  return await prisma.category.findMany();
}

export async function upsertCategoryInDB(data: { id?: string; label: string }) {
  const formattedId = data.label.toLowerCase().trim().replace(/\s+/g, "-");
  if (data.id) {
    await prisma.category.update({ where: { id: data.id }, data: { label: data.label } });
  } else {
    await prisma.category.create({ data: { id: formattedId, label: data.label } });
  }
  revalidatePath("/admin");
  revalidatePath("/menu");
}

export async function deleteCategoryFromDB(id: string) {
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/menu");
}