import Link from "next/link";
import { FiActivity } from "react-icons/fi";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 md:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity duration-200 hover:opacity-90"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 shadow-sm transition-all duration-200 group-hover:bg-slate-100">
            <FiActivity size={18} />
          </div>

          <div className="flex flex-col">
            <span className="text-[15px] font-semibold tracking-tight text-slate-900">
              Ticket Insight Engine
            </span>

            <span className="text-xs text-slate-500">
              AI-powered ticket intelligence
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-1">
          <Link
            href="/"
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
