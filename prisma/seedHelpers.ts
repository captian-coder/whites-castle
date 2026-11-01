import type { PrismaClient } from "@prisma/client";
import { categories, products, branches, offers } from "../lib/data";

export async function seedCategories(prisma: PrismaClient) {
  console.log("Seeding Categories...");
  const productCategoryIds = Array.from(new Set(products.map((p) => p.categoryId)));
  const allCategoriesMap = new Map<string, string>();

  categories.forEach((c) => allCategoriesMap.set(c.id, c.label));

  productCategoryIds.forEach((catId) => {
    if (!allCategoriesMap.has(catId)) {
      const formattedLabel = catId.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      allCategoriesMap.set(catId, formattedLabel);
    }
  });

  for (const [id, label] of allCategoriesMap.entries()) {
    await prisma.category.upsert({ where: { id }, update: { label }, create: { id, label } });
  }
}

export async function seedBranches(prisma: PrismaClient) {
  console.log("Seeding Branches...");
  for (const branch of branches) {
    await prisma.branch.upsert({
      where: { id: branch.id },
      update: { city: branch.city, name: branch.name, address: branch.address, phone: branch.phone, hours: branch.hours },
      create: { id: branch.id, city: branch.city, name: branch.name, address: branch.address, phone: branch.phone, hours: branch.hours },
    });
  }
}

export async function seedOffers(prisma: PrismaClient) {
  console.log("Seeding Offers...");
  for (const offer of offers) {
    await prisma.offer.upsert({
      where: { id: offer.id },
      update: { title: offer.title, copy: offer.copy, price: offer.price, image: offer.image },
      create: { id: offer.id, title: offer.title, copy: offer.copy, price: offer.price, image: offer.image },
    });
  }
}

export async function seedProducts(prisma: PrismaClient) {
  console.log("Seeding Products & Variants...");
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: { name: product.name, description: product.description, price: product.price, image: product.image, badge: product.badge || null, categoryId: product.categoryId },
      create: {
        id: product.id, categoryId: product.categoryId, name: product.name, description: product.description, price: product.price, image: product.image, badge: product.badge || null,
        variants: product.variants ? { create: product.variants.map((v) => ({ label: v.label, price: v.price })) } : undefined,
      },
    });
  }
}