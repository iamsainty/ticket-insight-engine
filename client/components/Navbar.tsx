import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Ticket Insight Engine
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="transition hover:text-black">
            Home
          </Link>

          <Link href="/upload" className="transition hover:text-black">
            Upload
          </Link>

          <Link href="/dashboard" className="transition hover:text-black">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
