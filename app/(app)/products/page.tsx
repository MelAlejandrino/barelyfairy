import type { Metadata } from "next";
import ProductsPage from "@/features/products-page/page";

export const metadata: Metadata = {
  title: "Products | Barely Fairy",
  description:
    "Browse all handmade crochet pieces by Barely Fairy — amigurumi, flowers, and accessories crafted with care and love.",
};

export default function Page() {
  return <ProductsPage />;
}
