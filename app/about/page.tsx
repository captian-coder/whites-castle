import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about White's Castle, a pizza restaurant brand serving Faisalabad and nearby cities."
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="Taste, speed, and late-night pizza"
        copy="White's Castle serves pizza, starters, pasta, and family deals with a branch-first online ordering flow."
      />
      <AboutSection expanded />
    </>
  );
}
