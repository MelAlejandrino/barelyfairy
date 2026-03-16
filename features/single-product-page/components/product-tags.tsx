import { Badge } from "@/components/ui/badge";

interface ProductTagsProps {
  tags?: string[];
}

export default function ProductTags({ tags }: ProductTagsProps) {
  if (!tags?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="rounded-full border-rose-200 bg-white px-3 py-1 text-xs font-normal text-rose-400"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
