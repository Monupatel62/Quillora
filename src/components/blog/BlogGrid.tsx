"use client";

import { useState, useMemo } from "react";
import type { BlogPost, Category } from "@/types/blog";
import { BlogCard } from "./BlogCard";
import { CATEGORIES } from "@/lib/categories";

interface BlogGridProps {
  posts: BlogPost[];
  /** Show category filter tabs */
  showFilter?: boolean;
  /** Show search bar */
  showSearch?: boolean;
  /** Initial visible count */
  initialCount?: number;
}

const PAGE_SIZE = 6;

export function BlogGrid({
  posts,
  showFilter = true,
  showSearch = true,
  initialCount = PAGE_SIZE,
}: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(initialCount);

  /* Derive available categories from the passed posts only */
  const usedCategories = useMemo(
    () => [...new Set(posts.map((p) => p.category))],
    [posts]
  );

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          p.author.name.toLowerCase().includes(q)
      );
    }
    return result;
  }, [posts, activeCategory, query]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  /* Reset page when filter/search changes */
  function handleCategory(cat: Category | "All") {
    setActiveCategory(cat);
    setVisibleCount(initialCount);
  }
  function handleSearch(val: string) {
    setQuery(val);
    setVisibleCount(initialCount);
  }

  return (
    <div>
      {/* Filter + Search row */}
      {(showFilter || showSearch) && (
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {showFilter && (
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter by category"
            >
              <button
                onClick={() => handleCategory("All")}
                aria-pressed={activeCategory === "All"}
                className={`
                  px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
                  ${activeCategory === "All"
                    ? "bg-[var(--accent)] text-white shadow-[0_4px_12px_var(--glow)]"
                    : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text2)] hover:border-[var(--accent)] hover:text-[var(--accent2)]"
                  }
                `}
              >
                All
              </button>
              {usedCategories.map((cat) => {
                const meta = CATEGORIES.find((c) => c.name === cat);
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategory(cat)}
                    aria-pressed={activeCategory === cat}
                    className={`
                      px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
                      ${activeCategory === cat
                        ? "bg-[var(--accent)] text-white shadow-[0_4px_12px_var(--glow)]"
                        : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text2)] hover:border-[var(--accent)] hover:text-[var(--accent2)]"
                      }
                    `}
                  >
                    {meta?.icon} {cat}
                  </button>
                );
              })}
            </div>
          )}

          {showSearch && (
            <div className="sm:ml-auto flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-2.5 focus-within:border-[var(--accent)] transition-colors min-w-[220px]">
              <span className="text-[var(--text3)] text-sm" aria-hidden>🔍</span>
              <input
                type="search"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search articles…"
                aria-label="Search articles"
                className="bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--text3)] outline-none w-full"
              />
            </div>
          )}
        </div>
      )}

      {/* Grid */}
      {visible.length === 0 ? (
        <div className="py-20 text-center" aria-live="polite">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-[var(--text2)]">
            No articles found for{" "}
            <strong className="text-[var(--text)]">
              {query || activeCategory}
            </strong>
          </p>
        </div>
      ) : (
        <>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-live="polite"
            aria-label="Blog posts"
          >
            {visible.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="
                  px-8 py-3 rounded-full text-sm font-semibold
                  bg-[var(--surface)] border border-[var(--border)]
                  text-[var(--text)] hover:border-[var(--accent)]
                  hover:text-[var(--accent2)] hover:-translate-y-0.5
                  transition-all duration-200
                "
                aria-label={`Load more articles, ${filtered.length - visibleCount} remaining`}
              >
                Load More ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
