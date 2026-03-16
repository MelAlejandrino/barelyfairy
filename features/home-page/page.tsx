"use client";
import Hero from "./components/hero";
import PillTags from "./components/pill-tags";
import CtaBanner from "./components/cta-banner";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-col gap-6 px-5 py-6">
      <Hero />
      <PillTags />

      <div className="flex flex-col items-center gap-2 rounded-2xl bg-rose-50 px-6 py-8 text-center">
        <p className="font-serif text-lg text-rose-900">
          Handmade pieces, made to order 🌸
        </p>
        <p className="text-xs text-rose-400">
          Amigurumi, crochet flowers, and accessories
        </p>
        <Link
          href="/products"
          className="mt-2 inline-flex items-center rounded-full bg-rose-400 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-500"
        >
          Browse all pieces
        </Link>
      </div>

      <CtaBanner />
    </main>
  );
}
