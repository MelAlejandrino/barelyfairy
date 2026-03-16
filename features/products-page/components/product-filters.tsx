"use client";

import { useCategories } from "@/hooks/use-categories";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (id: string | null) => void;
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onClearFilters: () => void;
}

const MAX_PRICE_LIMIT = 1000;

export default function ProductFilters({
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onClearFilters,
}: ProductFiltersProps) {
  const { categories, loading } = useCategories();

  const hasActiveFilters =
    selectedCategory !== null || minPrice > 0 || maxPrice < MAX_PRICE_LIMIT;

  return (
    <div className="flex flex-col gap-4">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant="outline"
          onClick={() => onCategoryChange(null)}
          className={`cursor-pointer rounded-full px-4 py-1.5 text-xs transition-colors ${
            selectedCategory === null
              ? "border-rose-300 bg-rose-400 text-white"
              : "border-rose-200 bg-white text-rose-400 hover:bg-rose-50"
          }`}
        >
          All
        </Badge>
        {!loading &&
          categories.map((cat) => (
            <Badge
              key={cat._id}
              variant="outline"
              onClick={() =>
                onCategoryChange(selectedCategory === cat._id ? null : cat._id)
              }
              className={`cursor-pointer rounded-full px-4 py-1.5 text-xs transition-colors ${
                selectedCategory === cat._id
                  ? "border-rose-300 bg-rose-400 text-white"
                  : "border-rose-200 bg-white text-rose-400 hover:bg-rose-50"
              }`}
            >
              {cat.title}
            </Badge>
          ))}
      </div>

      {/* Price range + clear */}
      <div className="flex items-center gap-2">
        <span className="shrink-0 text-[11px] font-medium uppercase tracking-widest text-rose-300">
          Price
        </span>
        <div className="relative max-w-[100px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-rose-300">
            ₱
          </span>
          <Input
            type="number"
            min={0}
            placeholder="Min"
            value={minPrice === 0 ? "" : minPrice}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              onMinPriceChange(isNaN(val) ? 0 : val);
            }}
            className="rounded-full border-rose-100 bg-white pl-6 text-xs text-rose-900 placeholder:text-rose-300 focus-visible:ring-rose-200"
          />
        </div>
        <span className="text-xs text-rose-300">–</span>
        <div className="relative max-w-[100px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-rose-300">
            ₱
          </span>
          <Input
            type="number"
            min={0}
            placeholder="Max"
            value={maxPrice >= MAX_PRICE_LIMIT ? "" : maxPrice}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              onMaxPriceChange(isNaN(val) ? MAX_PRICE_LIMIT : val);
            }}
            className="rounded-full border-rose-100 bg-white pl-6 text-xs text-rose-900 placeholder:text-rose-300 focus-visible:ring-rose-200"
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="ml-auto h-auto rounded-full px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-50 hover:text-rose-400"
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
