import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-5">
      <p className="text-7xl mb-6" aria-hidden>
        ✦
      </p>
      <h1 className="font-serif font-bold text-5xl text-[var(--text)] mb-4">
        404
      </h1>
      <p className="text-xl text-[var(--text2)] mb-2">Page not found</p>
      <p className="text-[var(--text3)] mb-10 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="
            px-6 py-3 rounded-full text-sm font-semibold text-white
            bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]
            shadow-[0_4px_14px_var(--glow)]
            hover:shadow-[0_6px_20px_var(--glow)] hover:-translate-y-0.5
            transition-all duration-200
          "
        >
          Go Home
        </Link>
        <Link
          href="/blog"
          className="
            px-6 py-3 rounded-full text-sm font-semibold
            bg-[var(--surface)] border border-[var(--border)]
            text-[var(--text)] hover:border-[var(--accent)]
            hover:-translate-y-0.5 transition-all duration-200
          "
        >
          Browse Articles
        </Link>
      </div>
    </div>
  );
}
