import { PortableText } from "@portabletext/react";
import type { Product } from "@/types/products";
import ProductTags from "./product-tags";

interface ProductInfoProps {
  product: Product;
}

function getDisplayPrice(product: Product): string {
  if (product.hasVariants && product.variants?.length) {
    const prices = product.variants.map((v) => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `₱${min}` : `₱${min} – ₱${max}`;
  }
  return product.price != null ? `₱${product.price}` : "";
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const displayPrice = getDisplayPrice(product);

  return (
    <div className="flex flex-col gap-4">
      {/* Category */}
      {product.category && (
        <span className="text-[11px] font-medium uppercase tracking-widest text-rose-300">
          {product.category.title}
        </span>
      )}

      {/* Title */}
      <h1 className="font-serif text-2xl leading-tight text-rose-900">
        {product.title}
      </h1>

      {/* Price */}
      <p className="text-lg font-medium text-rose-500">{displayPrice}</p>

      {/* Variants */}
      {product.hasVariants && product.variants?.length && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-medium uppercase tracking-widest text-rose-300">
            Sizes
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <div
                key={v.size}
                className="flex items-center gap-1.5 rounded-full border border-rose-200 bg-white px-4 py-1.5"
              >
                <span className="text-xs capitalize text-rose-700">
                  {v.size}
                </span>
                <span className="text-xs text-rose-400">₱{v.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {product.description && (
        <div className="prose prose-sm prose-rose max-w-none text-rose-700/80 [&_p]:leading-relaxed">
          <PortableText value={product.description} />
        </div>
      )}

      {/* Tags */}
      <ProductTags tags={product.tags} />
    </div>
  );
}
