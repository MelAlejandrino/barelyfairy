import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "@sanity/types";

export const client = createClient({
  projectId: "3l6t6cdd",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: Image) {
  return builder.image(source);
}
