"use server";

import { prisma } from "../../lib/prisma";

// --- Products Actions ---
export async function getProducts() {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function createProduct(formData: any) {
  try {
    await prisma.product.create({
      data: {
        id: crypto.randomUUID(), // Missing ID error fix
        name: formData.name,
        price: parseFloat(formData.price),
        image: formData.image || "",
        category: {
          connect: { id: formData.categoryId } // Category relation fix
        }
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// --- Categories Actions ---
export async function getCategories() {
  try {
    // orderBy line hata di gayi hai
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    return [];
  }
}

export async function createCategory(data: any) {
  try {
    await prisma.category.create({
      data: {
        id: crypto.randomUUID(), // ID khud generate karni padegi kyunki schema mein default nahi hai
        label: data.name         // 'label' field aapke schema ke mutabiq
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// --- Branches Actions ---
export async function getBranches() {
  try {
    return await prisma.branch.findMany();
  } catch (error) {
    return [];
  }
}

export async function createBranch(data: any) {
  try {
    await prisma.branch.create({ 
      data: {
        id: crypto.randomUUID(),
        ...data
      } 
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteBranch(id: string) {
  try {
    await prisma.branch.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// --- Banners Actions ---
export async function getBanners() {
  try {
    return await prisma.banner.findMany();
  } catch (error) {
    return [];
  }
}

export async function createBanner(data: any) {
  try {
    await prisma.banner.create({ 
      data: {
        id: crypto.randomUUID(),
        ...data
      } 
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteBanner(id: string) {
  try {
    await prisma.banner.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// --- Admin Orders Actions ---
export async function getAdminOrders() {
  try {
    return await prisma.order.findMany();
  } catch (error) {
    return [];
  }
}

export async function updateOrderStatus(id: string, status: string) {
  try {
    await prisma.order.update({
      where: { id: parseInt(id) }, // id ko string se number mein convert kiya tha
      data: { status },
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// --- Auth Actions ---
export async function adminLogin(credentials: any) {
  return { success: true };
}

export async function adminLogout() {
  return { success: true };
}

