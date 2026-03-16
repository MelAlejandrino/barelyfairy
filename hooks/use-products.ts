import { useState, useEffect, useMemo } from "react";
import { client } from "@/sanity/client";
import type { Product } from "@/types/products";

const PAGE_SIZE = 5;

interface UseProductsFilters {
  categoryId?: string | null;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export function useProducts(filters?: UseProductsFilters): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = useMemo(
    () => Math.ceil(totalCount / PAGE_SIZE),
    [totalCount],
  );

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const start = (currentPage - 1) * PAGE_SIZE;

        const categoryFilter = filters?.categoryId
          ? `&& category._ref == "${filters.categoryId}"`
          : "";

        const hasMin = filters?.minPrice && filters.minPrice > 0;
        const hasMax = filters?.maxPrice && filters.maxPrice < 1000;

        const priceFilter =
          hasMin || hasMax
            ? `&& (
              (!hasVariants && ${hasMin ? `price >= ${filters!.minPrice}` : "true"} && ${hasMax ? `price <= ${filters!.maxPrice}` : "true"}) ||
              (hasVariants && count(variants[${hasMin ? `price >= ${filters!.minPrice}` : "true"} && ${hasMax ? `price <= ${filters!.maxPrice}` : "true"}]) > 0)
            )`
            : "";

        const searchFilter = filters?.search
          ? `&& (title match "*${filters.search}*" || "${filters.search}" in tags)`
          : "";

        const baseQuery = `*[_type == "product" ${categoryFilter} ${priceFilter} ${searchFilter}]`;

        const [result, count] = await Promise.all([
          client.fetch<Product[]>(`
            ${baseQuery} | order(publishedAt desc) [${start}...${start + PAGE_SIZE + 1}] {
              _id, _type, title, slug, publishedAt,
              category->{_id, title},
              hasVariants, variants, price, stock, inStock,
              featured_image, tags, seo
            }
          `),
          client.fetch<number>(`count(${baseQuery})`),
        ]);

        setProducts(result.slice(0, PAGE_SIZE));
        setTotalCount(count);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [
    filters,
    currentPage,
    filters?.categoryId,
    filters?.minPrice,
    filters?.maxPrice,
    filters?.search,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    filters?.categoryId,
    filters?.minPrice,
    filters?.maxPrice,
    filters?.search,
  ]);

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  return { products, loading, error, currentPage, totalPages, goToPage };
}
