"use server";
import { prisma } from "@/lib/prisma";

export async function getUserWalletBalance(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return { success: true, balance: 0 };
  } catch (error) {
    return { success: false, balance: 0 };
  }
}