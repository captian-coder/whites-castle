import type { Metadata } from "next";
import { MenuSection } from "@/components/MenuSection";
import { OffersSection } from "@/components/OffersSection";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Deals",
  description: "View White's Castle combo offers and value deals."
};

export default function DealsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Offers"
        title="Built-for-sharing deals"
        copy="Family-friendly White's Castle deals with pizzas, starters, pasta, and cold drinks."
      />
      <OffersSection />
      <MenuSection
        onlyCategory="popular"
        eyebrow="Quick order"
        title="Popular picks"
        copy="Add a favourite item to your cart or jump back to the full menu whenever you are ready."
      />
    </>
  );
}
