import type { Metadata } from "next";
import { getAllPosts, getFeaturedPost } from "@/lib/posts";
import { siteConfig } from "@/lib/config";
import { FeaturedCard } from "@/components/blog/FeaturedCard";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogListJsonLd } from "@/components/seo/JsonLd";

/* ── SEO Metadata ─────────────────────────────────────────────
   Strategy:
   - Title: "All Articles" → keyword-rich + intent-matching
   - Description: covers the two categories — Technology & Jobs
   - Keywords: all category terms + blog-specific terms
   - Canonical: /blog (not homepage)
   ──────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "All Articles — Technology & Latest IT Jobs in India",
  description:
    "Browse every article on Quillora — in-depth technology writing plus the latest IT job openings in India by city, company, role, and experience level.",
  keywords: [
    "technology articles",
    "AI blog",
    "software development blog",
    "tech trends 2026",
    "IT jobs India 2026",
    "software jobs India",
    "tech jobs India",
    "fresher IT jobs India",
    "blog articles",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    title: "All Articles — Quillora",
    description:
      "In-depth technology articles and the latest IT jobs in India. Browse every post on Quillora.",
    images: [
      {
        url: `${siteConfig.url}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "Quillora Blog — All Articles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    title: "All Articles — Quillora",
    description:
      "In-depth technology articles and the latest IT jobs in India.",
    images: [`${siteConfig.url}/og-default.png`],
  },
};

export default function BlogPage() {
  const featured = getFeaturedPost();
  const allPosts = getAllPosts();

  return (
    <>
      <BlogListJsonLd />

      <div className="max-w-6xl mx-auto px-5 pt-28 pb-20">
        {/* Page header */}
        <header className="mb-14 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent2)] mb-3">
            ✦ All Articles
          </p>
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-[var(--text)] mb-4">
            Every post, one place.
          </h1>
          <p className="text-[var(--text2)] max-w-xl mx-auto leading-relaxed">
            {allPosts.length} in-depth articles across technology and IT jobs in India.
            Filter by topic or search below.
          </p>
        </header>

        {/* Featured post */}
        <section className="mb-14" aria-labelledby="blog-featured-heading">
          <h2 id="blog-featured-heading" className="sr-only">Featured article</h2>
          <FeaturedCard post={featured} />
        </section>

        {/* Filterable grid */}
        <section aria-labelledby="all-posts-heading">
          <h2
            id="all-posts-heading"
            className="font-serif font-bold text-2xl text-[var(--text)] mb-6"
          >
            Browse All Articles
          </h2>
          <BlogGrid posts={allPosts} showFilter showSearch initialCount={6} />
        </section>
      </div>
    </>
  );
}
