import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://barelyfairy.vercel.com";

  const slugs = await client.fetch<
    { slug: { current: string }; _updatedAt: string }[]
  >(`
    *[_type == "product" && defined(slug.current)] {
      slug, _updatedAt
    }
  `);

  const productUrls = slugs.map((p) => ({
    url: `${baseUrl}/products/${p.slug.current}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...productUrls,
  ];
}
