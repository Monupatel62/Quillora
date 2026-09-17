// ============================================================
//  QUILLORA — Core TypeScript Types
// ============================================================

export type Category =
  | "Technology"
  | "Jobs";

export interface Author {
  name: string;
  slug: string;
  bio: string;
  avatar: string; // initials fallback
  role: string;
  twitter?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string
  category: Category;
  tags: string[];
  author: Author;
  publishedAt: string; // ISO 8601
  updatedAt?: string;
  readingTime: number; // minutes
  featured: boolean;
  coverEmoji: string;
  coverGradient: string;
  /** Optional cover image path for OG and featured display (e.g. "/images/post-cover.png") */
  coverImage?: string;
  /** Absolute URL populated at runtime from SITE_URL */
  url?: string;
}

export interface CategoryMeta {
  name: Category;
  slug: string;
  icon: string;
  description: string;
  color: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  twitterHandle: string;
  locale: string;
  defaultOgImage: string;
}
