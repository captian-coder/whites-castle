"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBannersFromDB() {
  try {
    return await prisma.banner.findMany();
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}

export async function upsertBannerInDB(data: { id?: string; image: string; title?: string }) {
  try {
    if (data.id) {
      const res = await prisma.banner.update({ where: { id: data.id }, data: { image: data.image, title: data.title } });
      revalidatePath("/admin"); revalidatePath("/");
      return res;
    } else {
      const uniqueBannerId = "banner_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
      const res = await prisma.banner.create({ data: { id: uniqueBannerId, image: data.image, title: data.title ?? "" } });
      revalidatePath("/admin"); revalidatePath("/");
      return res;
    }
  } catch (error) {
    throw new Error("Failed to save banner");
  }
}

export async function deleteBannerFromDB(id: string) {
  try {
    const res = await prisma.banner.delete({ where: { id } });
    revalidatePath("/admin"); revalidatePath("/");
    return res;
  } catch (error) {
    throw new Error("Error deleting banner");
  }
}