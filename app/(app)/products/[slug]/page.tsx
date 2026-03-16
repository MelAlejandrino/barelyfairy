import type { Metadata } from "next";
import { client, urlFor } from "@/sanity/client";
import type { Product } from "@/types/products";
import SingleProductPage from "@/features/single-product-page/page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: { current: string } }[]>(`
    *[_type == "product" && defined(slug.current)] {
      slug
    }
  `);
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await client.fetch<Product | null>(
    `
    *[_type == "product" && slug.current == $slug][0] {
      title, seo, featured_image, tags
    }
  `,
    { slug },
  );

  if (!product) {
    return { title: "Product Not Found | Barely Fairy" };
  }

  const title = product.seo?.metaTitle ?? `${product.title} | Barely Fairy`;
  const description =
    product.seo?.metaDescription ??
    `Handmade crochet piece by Barely Fairy — ${product.title}.`;

  const ogImage = product.seo?.ogImage
    ? urlFor(product.seo.ogImage).width(1200).height(630).url()
    : product.featured_image
      ? urlFor(product.featured_image).width(1200).height(630).url()
      : undefined;

  return {
    title,
    description,
    keywords: product.tags ?? [],
    openGraph: {
      title,
      description,
      type: "website",
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      }),
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <SingleProductPage slug={slug} />;
}
