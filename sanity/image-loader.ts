import type { ImageLoaderProps } from "next/image";

export default function sanityImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  // src is the raw Sanity CDN URL, we rebuild it through urlFor-style params
  return `${src}?w=${width}&q=${quality ?? 75}&auto=format&fit=max`;
}
