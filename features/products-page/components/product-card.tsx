import Image from "next/image";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {urlFor} from "@/sanity/client";
import type {Product} from "@/types/products";

interface ProductCardProps {
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

export default function ProductCard({product}: ProductCardProps) {
    const displayPrice = getDisplayPrice(product);
    const imageUrl = product.featured_image
        ? urlFor(product.featured_image).url()
        : null;

    return (
        <Link href={`/products/${product.slug.current}`}>
            <div
                className="group overflow-hidden rounded-2xl border-none bg-white shadow-sm transition-transform active:scale-95">
                <div className="relative aspect-square w-full overflow-hidden bg-rose-50">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-4xl">
                            🧶
                        </div>
                    )}
                </div>

                <div className="px-3 py-3">
                    <p className="truncate font-serif text-sm text-rose-900">
                        {product.title}
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-rose-500">
              {displayPrice}
            </span>
                        {product.hasVariants && (
                            <Badge
                                variant="outline"
                                className="rounded-full border-purple-200 px-2 py-0 text-[10px] text-purple-400"
                            >
                                variants
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
