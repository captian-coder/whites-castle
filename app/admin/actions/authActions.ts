"use server";

import { prisma } from "../../../lib/prisma";

export async function registerUser(data: { name: string; email: string; password: string; phone?: string }) {
  try {
    const db = prisma as any;
    const userModel = db.user ?? db.User;
    if (!userModel) return { success: false, message: "User model not found." };

    const existing = await userModel.findUnique({ where: { email: data.email } });
    if (existing) return { success: false, message: "Email is already registered!" };

    const newUser = await userModel.create({
      data: { name: data.name, email: data.email, password: data.password, phone: data.phone || "" },
    });
    return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Something went wrong during registration." };
  }
}

export async function loginUser(data: { email: string; password: string }) {
  try {
    const db = prisma as any;
    const userModel = db.user ?? db.User;
    if (!userModel) return { success: false, message: "User model not found." };

    const user = await userModel.findUnique({ where: { email: data.email } });
    if (!user) return { success: false, message: "User not found!" };

    return { success: true, user: { id: user.id, name: user.name, email: user.email } };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Something went wrong during login." };
  }
}