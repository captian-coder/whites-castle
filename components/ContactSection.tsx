import { ContactInfo } from "./contact/ContactInfo";
import { ContactForm } from "./contact/ContactForm";

type ContactSectionProps = {
  compact?: boolean;
};

export function ContactSection({ compact = false }: ContactSectionProps) {
  return (
    <section id="contact" className={`bg-mist ${compact ? "py-12" : "py-8 pb-12"}`}>
      <div className="mx-auto grid max-w-[1200px] gap-6 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}