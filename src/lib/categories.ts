import type { Category, CategoryMeta } from "@/types/blog";

/* ── Category data with SEO-optimized descriptions ───────────
   Each description is:
   - 120-150 chars for use as meta description
   - Contains primary keyword for that category
   - Written for humans first, search engines second
   ──────────────────────────────────────────────────────────── */
export const CATEGORIES: CategoryMeta[] = [
  {
    name: "Technology",
    slug: "technology",
    icon: "💻",
    description:
      "In-depth articles on artificial intelligence, software development, and the digital technologies reshaping how we work, learn, and live in 2026.",
    color: "#7c6af7",
  },
  {
    name: "Jobs",
    slug: "jobs",
    icon: "💼",
    description:
      "Latest IT job openings in India — by city, company, role, and experience level. Real links, real salaries, real hiring data.",
    color: "#3b82f6",
  },
];

/* ── Per-category SEO keywords ──────────────────────────────
   Used in generateMetadata for category pages
   ──────────────────────────────────────────────────────────── */
export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  technology: [
    "technology articles",
    "AI blog",
    "artificial intelligence articles",
    "software development blog",
    "tech trends 2026",
    "digital transformation",
    "machine learning articles",
    "future of technology",
  ],
  jobs: [
    "IT jobs India 2026",
    "software jobs India",
    "tech jobs India",
    "IT job vacancies India",
    "India IT hiring 2026",
    "jobs in Bangalore",
    "jobs in Hyderabad",
    "fresher IT jobs India",
  ],
};

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryByName(name: Category): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.name === name);
}

export function categoryToSlug(name: Category): string {
  return name.toLowerCase();
}

export function slugToCategory(slug: string): Category | undefined {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  return cat?.name;
}

export function getCategoryKeywords(slug: string): string[] {
  return CATEGORY_KEYWORDS[slug] ?? [];
}
