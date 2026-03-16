export default function Footer() {
  return (
    <footer className="w-full border-t border-rose-100 bg-rose-50/40 px-6 py-5 text-center text-xs text-rose-300">
      © {new Date().getFullYear()}
      <span className="font-medium text-rose-400">Barely Fairy</span> · Handmade
      in the Philippines 🌺
    </footer>
  );
}
