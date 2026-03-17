import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://barelyfairy.vercel.com"),
  title: {
    default: "Barely Fairy",
    template: "%s | Barely Fairy",
  },
  description:
    "Handmade crochet pieces by Mary — amigurumi, flowers, and accessories crafted with care and love from the Philippines.",
  keywords: [
    "crochet",
    "amigurumi",
    "handmade",
    "Philippines",
    "crochet flowers",
    "crochet accessories",
    "Barely Fairy",
  ],
  openGraph: {
    title: "Barely Fairy",
    description:
      "Handmade crochet pieces by Mary — amigurumi, flowers, and accessories crafted with care and love from the Philippines.",
    type: "website",
    url: "https://barelyfairy.vercel.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Barely Fairy — Handmade Crochet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barely Fairy",
    description: "Handmade crochet pieces crafted with care and love.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="flex min-h-svh flex-col bg-rose-50/30 font-sans antialiased">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
