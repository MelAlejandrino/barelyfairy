import { useState, useEffect } from "react";
import { client } from "@/sanity/client";
import type { Product } from "@/types/products";

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: Error | null;
}

export function useProduct(slug: string): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const result = await client.fetch<Product | null>(
          `
          *[_type == "product" && slug.current == $slug][0] {
            _id, _type, title, slug, publishedAt,
            category->{_id, title},
            hasVariants, variants, price, stock, inStock,
            featured_image, gallery, description, tags, seo
          }
        `,
          { slug },
        );
        setProduct(result);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
}
