"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useProduct } from "@/hooks/use-product";
import ProductImages from "./components/product-images";
import ProductInfo from "./components/product-info";

interface SingleProductPageProps {
  slug: string;
}

export default function SingleProductPage({ slug }: SingleProductPageProps) {
  const { product, loading, error } = useProduct(slug);

  if (loading) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-col gap-6 px-5 py-6">
        <div className="aspect-square w-full animate-pulse rounded-2xl bg-rose-100" />
        <div className="flex flex-col gap-3">
          <div className="h-3 w-24 animate-pulse rounded-full bg-rose-100" />
          <div className="h-7 w-48 animate-pulse rounded-full bg-rose-100" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-rose-100" />
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-col items-center gap-4 px-5 py-20 text-center">
        <p className="text-sm text-rose-400">Product not found 🌸</p>
        <Link
          href="/products"
          className="text-xs font-medium text-rose-400 underline underline-offset-4 hover:text-rose-600"
        >
          Back to products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-lg flex-col gap-6 px-5 py-6">
      {/* Back */}
      <Link
        href="/products"
        className="flex w-fit items-center gap-1.5 text-xs text-rose-400 transition-colors hover:text-rose-600"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to products
      </Link>

      <ProductImages
        featuredImage={product.featured_image}
        gallery={product.gallery}
        title={product.title}
      />

      <ProductInfo product={product} />
    </main>
  );
}
