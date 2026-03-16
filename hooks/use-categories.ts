import { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import type { Category } from "@/types/category";

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const result = await client.fetch<Category[]>(`
          *[_type == "category"] | order(title asc) {
            _id, title, slug
          }
        `);
        setCategories(result);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading };
}
