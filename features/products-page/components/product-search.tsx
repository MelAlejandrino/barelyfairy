import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-rose-300" />
      <Input
        type="text"
        placeholder="Search pieces..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full border-rose-100 bg-white pl-8 text-xs text-rose-900 placeholder:text-rose-300 focus-visible:ring-rose-200"
      />
    </div>
  );
}
