import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white/60 dark:bg-neutral-900/60 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold">
            kegth
          </Link>
          <nav className="hidden md:flex gap-4 text-sm">
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/blog" className="px-3 py-1 rounded-md border text-sm">All blogs</Link>
        </div>
      </div>
    </header>
  );
}
