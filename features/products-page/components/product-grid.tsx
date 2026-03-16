"use client";

import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import ProductCard from "./product-card";

export default function ProductGrid() {
  const { products, loading, error, currentPage, totalPages, goToPage } =
    useProducts();

  console.log("products", products);
  return (
    <div className="flex flex-col gap-6">
      {/* Error */}
      {error && (
        <p className="text-center text-xs text-rose-400">
          Something went wrong. Please try again.
        </p>
      )}

      {/* Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-2xl bg-rose-100"
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && products.length === 0 && (
        <p className="py-16 text-center text-xs text-rose-300">
          No products yet. Check back soon! 🌸
        </p>
      )}

      {/* Grid */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            className="rounded-full border-rose-200 px-4 text-xs text-rose-400 hover:bg-rose-50 disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            ← Prev
          </Button>
          <span className="text-xs text-rose-300">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            className="rounded-full border-rose-200 px-4 text-xs text-rose-400 hover:bg-rose-50 disabled:opacity-40"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  );
}
