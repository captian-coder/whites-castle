"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBranchesFromDB() {
  return await prisma.branch.findMany();
}

export async function upsertBranchInDB(data: { id?: string; name: string; city: string; address?: string; phone?: string; hours?: string }) {
  if (data.id) {
    await prisma.branch.update({
      where: { id: data.id },
      data: { name: data.name, city: data.city, address: data.address ?? "", phone: data.phone ?? "", hours: data.hours ?? "11:00 AM - 3:00 AM" },
    });
  } else {
    const uniqueId = "branch_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    await prisma.branch.create({
      data: { id: uniqueId, name: data.name, city: data.city, address: data.address ?? "", phone: data.phone ?? "", hours: data.hours ?? "11:00 AM - 3:00 AM" },
    });
  }
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteBranchFromDB(id: string) {
  await prisma.branch.delete({ where: { id } });
  revalidatePath("/admin");
}