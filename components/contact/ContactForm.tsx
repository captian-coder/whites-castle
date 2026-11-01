"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow-soft ring-1 ring-black/5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-black">Name</span>
          <input required className="focus-ring h-12 w-full rounded-lg border border-black/12 px-4 text-sm font-semibold" placeholder="Your name" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-black">Phone</span>
          <input required className="focus-ring h-12 w-full rounded-lg border border-black/12 px-4 text-sm font-semibold" placeholder="0300 0000000" />
        </label>
      </div>
      
      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-black">Email</span>
        <input type="email" className="focus-ring h-12 w-full rounded-lg border border-black/12 px-4 text-sm font-semibold" placeholder="name@email.com" />
      </label>
      
      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-black">Message</span>
        <textarea required rows={4} className="focus-ring w-full resize-none rounded-lg border border-black/12 px-4 py-3 text-sm font-semibold" placeholder="How can we help?" />
      </label>
      
      <button type="submit" className="focus-ring mt-5 h-12 w-full rounded-lg bg-brand-500 text-base font-black text-ink transition hover:bg-brand-600">
        Send Message
      </button>
      
      {sent && (
        <p className="mt-3 rounded-lg bg-green-50 px-4 py-3 text-sm font-bold text-leaf">
          Message captured locally. Connect a form service when ready.
        </p>
      )}
    </form>
  );
}