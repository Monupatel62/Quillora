import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { siteConfig } from "@/lib/config";

export function Footer() {
  const year = new Date().getFullYear();

  const topCategories = CATEGORIES.slice(0, 4);

  return (
    <footer
      className="border-t border-[var(--border)] bg-[var(--bg2)] mt-20"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-[var(--accent2)] text-sm">✦</span>
              <span className="gradient-text font-serif font-bold text-xl">Quillora</span>
            </Link>
            <p className="text-sm text-[var(--text2)] leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href={`https://twitter.com/${siteConfig.twitterHandle.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Quillora on Twitter"
                className="
                  w-9 h-9 rounded-full flex items-center justify-center text-sm
                  bg-[var(--surface)] border border-[var(--border)]
                  text-[var(--text2)] hover:text-[var(--accent2)]
                  hover:border-[var(--accent)] transition-all duration-200
                "
              >
                𝕏
              </a>
              <a
                href="/feed.xml"
                aria-label="RSS feed"
                className="
                  w-9 h-9 rounded-full flex items-center justify-center text-sm
                  bg-[var(--surface)] border border-[var(--border)]
                  text-[var(--text2)] hover:text-[var(--accent2)]
                  hover:border-[var(--accent)] transition-all duration-200
                "
              >
                📡
              </a>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text3)] mb-4">
              Topics
            </h3>
            <ul className="space-y-2.5">
              {topCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/blog/category/${cat.slug}`}
                    className="text-sm text-[var(--text2)] hover:text-[var(--accent2)] transition-colors duration-200 flex items-center gap-2"
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text3)] mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "All Articles", href: "/blog" },
                { label: "IT Jobs India 2026", href: "/blog/category/jobs" },
                { label: "Fresher IT Jobs", href: "/blog/fresher-it-jobs-india-2026" },
                { label: "TCS Jobs 2026", href: "/blog/tcs-jobs-freshers-salary-2026" },
                { label: "Infosys Jobs 2026", href: "/blog/infosys-jobs-freshers-salary-2026" },
                { label: "Technology", href: "/blog/category/technology" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--text2)] hover:text-[var(--accent2)] transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text3)]">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p>
            Made with{" "}
            <span aria-label="love" className="text-rose-400">♥</span>{" "}
            for readers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
