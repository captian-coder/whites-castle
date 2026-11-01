import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";

export const metadata: Metadata = {
  title: "Menu",
  description: "Explore the White's Castle menu with category tabs, search, and cart actions."
};

export default function MenuPage() {
  return (
    <>
      <Hero compact />
      <MenuSection />
    </>
  );
}
