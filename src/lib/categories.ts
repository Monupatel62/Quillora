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
    name: "Design",
    slug: "design",
    icon: "🎨",
    description:
      "Thoughtful writing on UI design, UX principles, visual craft, and the art of building products that feel effortless to use.",
    color: "#22d3ee",
  },
  {
    name: "Culture",
    slug: "culture",
    icon: "📚",
    description:
      "Essays on media, books, reading culture, digital society, and the ideas and forces that shape how we think and what we value.",
    color: "#fb923c",
  },
  {
    name: "Science",
    slug: "science",
    icon: "🔬",
    description:
      "Accessible science writing on neuroscience, psychology, behavioral research, and new discoveries — what the data actually says, clearly explained.",
    color: "#4ade80",
  },
  {
    name: "Finance",
    slug: "finance",
    icon: "💰",
    description:
      "Practical personal finance articles on investing, financial independence, the FIRE movement, savings strategies, and building long-term wealth.",
    color: "#facc15",
  },
  {
    name: "Health",
    slug: "health",
    icon: "🏃",
    description:
      "Evidence-based health articles on sleep optimization, athletic recovery, nutrition science, and the habits that improve performance and longevity.",
    color: "#38bdf8",
  },
  {
    name: "Travel",
    slug: "travel",
    icon: "✈️",
    description:
      "Writing on slow travel, digital nomad life, budget travel strategies, and the philosophy of moving through the world with intention.",
    color: "#fb923c",
  },
  {
    name: "Life",
    slug: "life",
    icon: "🌱",
    description:
      "Philosophy, Stoicism, habit formation, mindset, and practical wisdom for living with more clarity, resilience, and purpose.",
    color: "#f472b6",
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
  design: [
    "UI design articles",
    "UX design blog",
    "product design",
    "web design principles",
    "minimalism design",
    "user experience writing",
    "design thinking",
    "interface design",
  ],
  culture: [
    "culture blog",
    "reading culture",
    "media criticism",
    "digital society",
    "books and reading",
    "long form essays",
    "ideas blog",
    "cultural commentary",
  ],
  science: [
    "science blog",
    "neuroscience articles",
    "behavioral psychology",
    "habit science",
    "research explained",
    "psychology blog",
    "science writing",
    "behavior change",
  ],
  finance: [
    "personal finance blog",
    "financial independence",
    "FIRE movement",
    "investing articles",
    "wealth building",
    "savings tips",
    "financial freedom",
    "index fund investing",
  ],
  health: [
    "health blog",
    "sleep optimization",
    "athletic recovery",
    "wellness articles",
    "health science",
    "performance health",
    "longevity tips",
    "evidence based health",
  ],
  travel: [
    "slow travel blog",
    "digital nomad",
    "travel writing",
    "long term travel",
    "budget travel tips",
    "travel philosophy",
    "living abroad",
    "remote work travel",
  ],
  life: [
    "life philosophy",
    "stoicism articles",
    "personal growth blog",
    "mindset articles",
    "self improvement",
    "habit formation",
    "resilience mindset",
    "practical philosophy",
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
