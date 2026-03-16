"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import type { Image as SanityImage } from "@sanity/types";
import { Button } from "@/components/ui/button";

interface ProductImagesProps {
  featuredImage?: SanityImage;
  gallery?: SanityImage[];
  title: string;
}

export default function ProductImages({
  featuredImage,
  gallery,
  title,
}: ProductImagesProps) {
  const allImages = [
    ...(featuredImage ? [featuredImage] : []),
    ...(gallery ?? []),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = allImages[activeIndex];

  if (allImages.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-rose-50 text-6xl">
        🧶
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-rose-50">
        <Image
          src={urlFor(activeImage).url()}
          alt={title}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <Button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                i === activeIndex
                  ? "border-rose-400"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={urlFor(img).url()}
                alt={`${title} ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
