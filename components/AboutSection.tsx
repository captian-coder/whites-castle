import { Clock, Flame, ShieldCheck } from "lucide-react";
import { brand } from "@/lib/data";

type AboutSectionProps = {
  expanded?: boolean;
};

const values = [
  {
    icon: Flame,
    title: "Fresh pizza",
    copy: "Pizzas, starters, and pasta stay front and center so customers can order quickly."
  },
  {
    icon: ShieldCheck,
    title: "Branch-first ordering",
    copy: "Customers select delivery or pick-up, choose a city, then order from the right branch."
  },
  {
    icon: Clock,
    title: "Late hours",
    copy: "Long daily service hours are surfaced across branch cards and contact areas."
  }
];

export function AboutSection({ expanded = false }: AboutSectionProps) {
  return (
    <section id="about" className="bg-white py-12">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="animate-fade-up">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-600">
            About Us
          </p>
          <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
            White&apos;s Castle brings pizza cravings closer
          </h2>
          <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
            {brand.name} is known for pizza, royal starters, pasta, and sharing deals served
            through a quick branch-first ordering experience.
          </p>
          {expanded ? (
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
              The menu experience keeps categories, search, product cards, cart totals, and
              location selection easy to scan on mobile and desktop.
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-lg bg-mist p-5 shadow-soft ring-1 ring-black/5"
            >
              <div className="mb-3 grid h-11 w-11 place-items-center rounded-lg bg-brand-500 text-ink">
                <value.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black">{value.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {value.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}