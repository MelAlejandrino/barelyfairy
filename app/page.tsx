import type { Metadata } from "next";
import HomePage from "@/features/home-page/page";

export const metadata: Metadata = {
  title: "Barely Fairy",
  description:
    "Hi! I'm Mary, a crochet artist based in the Philippines. I make handmade crochet pieces — from flowers to accessories — all crafted with care and love.",
  openGraph: {
    title: "Barely Fairy",
    description:
      "Handmade crochet pieces from the Philippines — flowers, accessories, and more.",
    type: "website",
  },
};

export default function Page() {
  return <HomePage />;
}
