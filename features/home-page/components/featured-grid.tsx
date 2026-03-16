import { Card, CardContent } from "@/components/ui/card";
import SectionLabel from "@/components/shared/section-label";
import { products } from "@/lib/constant";

export default function FeaturedGrid() {
  return (
    <div>
      <SectionLabel>✦ Featured Pieces</SectionLabel>
      <div className="grid grid-cols-2 gap-3">
        {products.map((p) => (
          <Card
            key={p.name}
            className={`overflow-hidden border-none shadow-sm transition-transform active:scale-95 ${
              p.span ? "col-span-2" : ""
            }`}
          >
            <div
              className={`flex items-center justify-center bg-gradient-to-br ${p.bg} ${
                p.span ? "h-28 text-5xl" : "h-24 text-4xl"
              }`}
            >
              {p.emoji}
            </div>
            <CardContent className="px-4 py-3">
              <p className="font-serif text-sm text-rose-900">{p.name}</p>
              <p className="text-xs text-rose-300">{p.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
