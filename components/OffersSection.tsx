import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


interface Offer {
  id: string;
  image: string;
  price: string;
  title: string;
  copy: string;
}

const offers: Offer[] = [];

export function OffersSection() {
  return (
    <section>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {offers.map((offer: Offer) => (
            <article
              key={offer.id}
              className="overflow-hidden rounded-lg bg-mist shadow-soft ring-1 ring-black/5 transition duration-300 hover:-translate-y-1"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={offer.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="mb-2 inline-flex rounded-md bg-brand-400 px-3 py-1 text-sm font-black">
                  {offer.price}
                </div>
                <h3 className="text-xl font-black">{offer.title}</h3>
                <p className="mt-2 min-h-[44px] text-sm font-semibold leading-snug text-slate-500">
                  {offer.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
