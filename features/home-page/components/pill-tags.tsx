import { Badge } from "@/components/ui/badge";
import { tags } from "@/lib/constant";

export default function PillTags() {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag.label}
          variant="outline"
          className="rounded-full border-rose-200 bg-white px-4 py-1.5 text-xs font-normal text-rose-500 shadow-sm"
        >
          {tag.emoji} {tag.label}
        </Badge>
      ))}
    </div>
  );
}
