interface Category {
  _id: string; // Sanity document ID
  _type: "category"; // Sanity document type
  title: string; // Category title
  slug: {
    _type: "slug";
    current: string; // The actual slug string
  };
  _createdAt?: string; // Optional: document creation date
  _updatedAt?: string; // Optional: document update date
  _rev?: string; // Optional: Sanity revision ID
}

export type { Category };
