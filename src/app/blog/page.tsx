import type { Metadata } from "next";
import { getAllPosts, getFeaturedPost } from "@/lib/posts";
import { siteConfig } from "@/lib/config";
import { FeaturedCard } from "@/components/blog/FeaturedCard";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogListJsonLd } from "@/components/seo/JsonLd";

/* ── SEO Metadata ─────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "All Articles",
  description:
    "Browse all articles on Inkwell — technology, design, culture, science, finance, health, travel, and life.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/blog`,
    title: `All Articles | ${siteConfig.name}`,
    description:
      "Browse all articles on Inkwell — technology, design, culture, science, finance, health, travel, and life.",
  },
};

/* ── React Server Component ───────────────────────────────── */
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
          <p className="text-[var(--text2)] max-w-xl mx-auto">
            {allPosts.length} articles across technology, design, culture, and more.
            Use the filters to find what interests you.
          </p>
        </header>

        {/* Featured post */}
        <section className="mb-14" aria-labelledby="blog-featured-heading">
          <h2 id="blog-featured-heading" className="sr-only">
            Featured article
          </h2>
          <FeaturedCard post={featured} />
        </section>

        {/* Filterable grid — client component */}
        <section aria-labelledby="all-posts-heading">
          <h2
            id="all-posts-heading"
            className="font-serif font-bold text-2xl text-[var(--text)] mb-6"
          >
            Browse All
          </h2>
          <BlogGrid
            posts={allPosts}
            showFilter
            showSearch
            initialCount={6}
          />
        </section>
      </div>
    </>
  );
}
