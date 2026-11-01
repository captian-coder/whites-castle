import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { brand } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-white py-10 pb-24 text-ink">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div className="flex gap-6">
            <Link
              href="/"
              aria-label={`${brand.name} home`}
              className="focus-ring grid h-[130px] w-[130px] shrink-0 place-items-center overflow-hidden rounded-lg bg-brand-50"
            >
              <Image
                src="/images/logo.png"
                alt=""
                width={130}
                height={130}
                unoptimized
                className="h-full w-full overflow-hidden object-cover object-center"
              />
            </Link>
            <div>
              <h2 className="text-lg font-black">{brand.name}</h2>
              <p className="mt-3 text-sm font-semibold text-slate-600">
                <span className="font-black text-ink">Phone:</span> {brand.phone}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                <span className="font-black text-ink">Email:</span> {brand.email}
              </p>
              <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-slate-600">
                <span className="font-black text-ink">Address:</span> {brand.address}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black">Our Timings</h3>
            <p className="mt-3 text-sm font-semibold text-slate-600">{brand.hours}</p>
            <h3 className="mt-5 text-lg font-black">Follow Us:</h3>
            <div className="mt-3 flex gap-3">
              <Link
                href="/contact"
                aria-label="Facebook"
                title="Facebook"
                className="focus-ring grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-700 transition hover:bg-brand-500 hover:text-ink"
              >
                <Facebook aria-hidden="true" className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                aria-label="Instagram"
                title="Instagram"
                className="focus-ring grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-700 transition hover:bg-brand-500 hover:text-ink"
              >
                <Instagram aria-hidden="true" className="h-5 w-5" />
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-slate-600">
              <Link href="/about" className="focus-ring hover:text-brand-700">
                Terms and conditions
              </Link>
              <Link href="/contact" className="focus-ring hover:text-brand-700">
                Privacy Policy
              </Link>
              <Link href="/sitemap.xml" className="focus-ring hover:text-brand-700">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-9 border-t border-black/10 pt-6 text-center text-sm font-semibold text-slate-500">
          (c) 2026 White&apos;s Castle. Online ordering experience.
        </div>
      </div>
    </footer>
  );
}