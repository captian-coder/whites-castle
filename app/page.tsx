import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { OffersSection } from "@/components/OffersSection";
import { prisma } from "@/lib/prisma";

import { getBannersFromDB } from "@/app/actions/bannerActions";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany();
  const banners = await getBannersFromDB();

  const productsWithDefaults = products.map((p) => ({
    ...p,
    description: p.description || "",
    image: p.image || "",
  }));

  return (
    <>
      <Hero banners={banners} />
      <OffersSection />
      <MenuSection
        categories={categories}
        products={productsWithDefaults}
      />
    </>
  );
}