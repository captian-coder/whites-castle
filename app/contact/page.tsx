import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact White's Castle for orders, catering, and feedback."
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Questions, catering, or feedback"
        copy="Reach White's Castle by phone, email, or the contact form for order help and branch questions."
      />
      <ContactSection />
    </>
  );
}
