import type { PortableTextBlock, Image } from "@sanity/types";
import { Category } from "./category";

export interface ProductVariant {
  size: "small" | "medium" | "large";
  price: number;
  stock: number;
}

export interface ProductSEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: Image;
}

export interface Product {
  _id: string;
  _type: "product";
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  publishedAt: string;
  category: Category;
  hasVariants: boolean;
  variants?: ProductVariant[];
  price?: number;
  stock?: number;
  inStock: boolean;
  featured_image?: Image;
  gallery?: Image[];
  description?: PortableTextBlock[];
  seo?: ProductSEO;
  tags?: string[];
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
}
