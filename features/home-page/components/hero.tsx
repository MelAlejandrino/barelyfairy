import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-rose-100 via-purple-50 to-rose-50 p-7 shadow-sm">
      {/* Decorative blob */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/40 blur-2xl" />
      {/* Decorative yarn emoji */}
      <span className="absolute bottom-4 right-5 text-4xl opacity-20">🧶</span>

      <Badge
        variant="secondary"
        className="mb-4 rounded-full border-none bg-white/60 text-xs font-medium text-rose-400"
      >
        🌸 handmade with love
      </Badge>

      <h1 className="mb-3 font-serif text-4xl leading-tight text-rose-900">
        Hi! I&apos;m <em className="text-rose-500">Mary</em>
      </h1>

      <p className="max-w-xs text-sm leading-relaxed text-rose-700/80">
        A crochet artist based in the Philippines. I make handmade crochet
        pieces — from flowers to accessories — all crafted with care and love.
        🧶
      </p>
    </div>
  );
}
