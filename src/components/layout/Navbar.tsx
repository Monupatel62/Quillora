"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Articles",   href: "/blog" },
  { label: "Technology", href: "/blog/category/technology" },
  { label: "Design",     href: "/blog/category/design" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 inset-x-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-[var(--bg)]/85 backdrop-blur-xl border-b border-[var(--border)] shadow-sm"
          : "bg-transparent"
        }
      `}
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto px-5 h-16 flex items-center gap-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg shrink-0"
          aria-label="Quillora — home"
        >
          <span className="text-[var(--accent2)] text-sm">✦</span>
          <span className="gradient-text font-serif">Quillora</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 ml-auto" role="list">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${active
                      ? "text-[var(--text)] bg-[var(--surface2)]"
                      : "text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--surface)]"
                    }
                  `}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="
              w-9 h-9 rounded-full flex items-center justify-center text-base
              bg-[var(--surface)] border border-[var(--border)]
              hover:border-[var(--accent)] transition-all duration-200 hover:rotate-12
            "
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          <Link
            href="/blog"
            className="
              px-4 py-1.5 rounded-full text-sm font-semibold text-white
              bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]
              shadow-[0_4px_14px_var(--glow)] hover:shadow-[0_6px_20px_var(--glow)]
              hover:-translate-y-0.5 transition-all duration-200
            "
          >
            Read Now
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="
              w-9 h-9 rounded-full flex items-center justify-center text-base
              bg-[var(--surface)] border border-[var(--border)]
            "
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="
              w-9 h-9 rounded-lg flex flex-col items-center justify-center gap-1.5
              bg-[var(--surface)] border border-[var(--border)]
            "
          >
            <span
              className={`block w-4 h-0.5 bg-[var(--text)] rounded transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-4 h-0.5 bg-[var(--text)] rounded transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-4 h-0.5 bg-[var(--text)] rounded transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl"
          role="menu"
        >
          <ul className="flex flex-col py-2 px-4" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="
                    flex items-center py-3 px-2 text-sm font-medium
                    text-[var(--text2)] hover:text-[var(--text)]
                    border-b border-[var(--border)] last:border-0
                    transition-colors duration-200
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
