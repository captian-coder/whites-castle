type PageIntroProps = {
  eyebrow: string;
  title: string;
  copy: string;
};

export function PageIntro({ eyebrow, title, copy }: PageIntroProps) {
  return (
    <section className="bg-brand-500">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:py-16">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-900/70">
          {eyebrow}
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base font-semibold text-brand-900/75">
          {copy}
        </p>
      </div>
    </section>
  );
}
