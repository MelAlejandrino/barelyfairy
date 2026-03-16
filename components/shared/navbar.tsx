import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-rose-100 bg-rose-50/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-lg italic tracking-tight text-rose-900"
        >
          Barely Fairy
        </Link>
        <Link
          href="/products"
          className="text-xs font-medium text-rose-400 hover:text-rose-600 transition-colors"
        >
          Products
        </Link>
      </div>
    </header>
  );
}
