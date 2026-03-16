import { Button } from "@/components/ui/button";
import { FB_LINK } from "@/lib/constant";

export default function CtaBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 via-rose-50 to-rose-100 px-6 py-7 text-center shadow-sm">
      <span className="absolute left-4 top-3 text-lg opacity-40">✨</span>
      <span className="absolute bottom-3 right-4 text-lg opacity-40">🌸</span>

      <h2 className="mb-1 font-serif text-xl text-rose-900">
        Find us on Facebook
      </h2>
      <p className="mb-5 text-xs leading-relaxed text-rose-600/70">
        Browse our latest pieces, place orders, or just say hi 💌
      </p>

      <Button
        className="rounded-full bg-rose-400 px-6 text-white hover:bg-rose-500 cursor-pointer"
        onClick={() => window.open(FB_LINK, "_blank", "noopener,noreferrer")}
      >
        Visit Barely Fairy 🧶
      </Button>
    </div>
  );
}
