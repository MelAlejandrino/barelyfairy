"use client";

import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/use-products";
import ProductCard from "./components/product-card";
import ProductSearch from "./components/product-search";
import ProductFilters from "./components/product-filters";
import SectionLabel from "@/components/shared/section-label";
import { Button } from "@/components/ui/button";

const MAX_PRICE_LIMIT = 1000;

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE_LIMIT);

  const clearFilters = () => {
    setCategoryId(null);
    setMinPrice(0);
    setMaxPrice(MAX_PRICE_LIMIT);
    setSearch("");
  };

  const debouncedSearch = useDebounce(search, 400);
  const debouncedMinPrice = useDebounce(minPrice, 400);
  const debouncedMaxPrice = useDebounce(maxPrice, 400);

  const { products, loading, error, currentPage, totalPages, goToPage } =
    useProducts({
      search: debouncedSearch,
      categoryId,
      minPrice: debouncedMinPrice,
      maxPrice: debouncedMaxPrice,
    });

  return (
    <main className="mx-auto flex w-full max-w-lg flex-col gap-6 px-5 py-6">
      <div>
        <h1 className="font-serif text-2xl text-rose-900">Our pieces</h1>
        <p className="mt-1 text-xs text-rose-400">
          All handmade with care and love 🧶
        </p>
      </div>

      <ProductSearch value={search} onChange={setSearch} />

      <ProductFilters
        selectedCategory={categoryId}
        onCategoryChange={setCategoryId}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onClearFilters={clearFilters}
      />

      <div className="h-px bg-rose-100" />

      <div className="flex flex-col gap-6">
        {error && (
          <p className="text-center text-xs text-rose-400">
            Something went wrong. Please try again.
          </p>
        )}

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

        {!loading && !error && products.length === 0 && (
          <p className="py-16 text-center text-xs text-rose-300">
            No products found. Try adjusting your filters 🌸
          </p>
        )}

        {!loading && products.length > 0 && (
          <>
            <SectionLabel>
              {products.length} piece{products.length !== 1 ? "s" : ""} found
            </SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}

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
    </main>
  );
}
