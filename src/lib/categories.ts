import type { Category, CategoryMeta } from "@/types/blog";

export const CATEGORIES: CategoryMeta[] = [
  {
    name: "Technology",
    slug: "technology",
    icon: "💻",
    description: "AI, software, hardware, and the digital world reshaping our lives.",
    color: "#7c6af7",
  },
  {
    name: "Design",
    slug: "design",
    icon: "🎨",
    description: "Craft, aesthetics, UX, and the art of making things well.",
    color: "#22d3ee",
  },
  {
    name: "Culture",
    slug: "culture",
    icon: "📚",
    description: "Media, books, ideas, and the forces that shape how we think.",
    color: "#fb923c",
  },
  {
    name: "Science",
    slug: "science",
    icon: "🔬",
    description: "Research, discoveries, and what the data actually says.",
    color: "#4ade80",
  },
  {
    name: "Finance",
    slug: "finance",
    icon: "💰",
    description: "Personal finance, investing, and building long-term wealth.",
    color: "#facc15",
  },
  {
    name: "Health",
    slug: "health",
    icon: "🏃",
    description: "Evidence-based insights on performance, sleep, and longevity.",
    color: "#38bdf8",
  },
  {
    name: "Travel",
    slug: "travel",
    icon: "✈️",
    description: "Slow travel, destinations, and the philosophy of moving through the world.",
    color: "#fb923c",
  },
  {
    name: "Life",
    slug: "life",
    icon: "🌱",
    description: "Philosophy, habits, meaning, and how to live better.",
    color: "#f472b6",
  },
];

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
