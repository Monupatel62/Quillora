import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  /* ── Static pages — highest priority ─────────────────── */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${base}/blog/category/jobs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  /* ── Category pages ────────────────────────────────────── */
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${base}/blog/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    // Jobs category gets highest priority — most traffic potential
    priority: cat.slug === "jobs" ? 0.9 : 0.75,
  }));

  /* ── Blog post pages ───────────────────────────────────── */
  const posts = getAllPosts();
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.updatedAt
      ? new Date(post.updatedAt)
      : new Date(post.publishedAt),
    changeFrequency: post.category === "Jobs" ? "weekly" as const : "monthly" as const,
    // Featured gets 0.9, Jobs posts get 0.85 (high search intent), others 0.7
    priority: post.featured ? 0.9 : post.category === "Jobs" ? 0.85 : 0.7,
  }));

  return [...staticPages, ...categoryPages, ...postPages];
}
