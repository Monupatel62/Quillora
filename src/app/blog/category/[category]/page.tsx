import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostsByCategory } from "@/lib/posts";
import { CATEGORIES, getCategoryBySlug, slugToCategory } from "@/lib/categories";
import { siteConfig } from "@/lib/config";
import { CategoryJsonLd } from "@/components/seo/JsonLd";
import { BlogGrid } from "@/components/blog/BlogGrid";

/* ── Static params ────────────────────────────────────────── */
export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

/* ── Category Metadata ────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: "Category Not Found" };

  const title = `${cat.name} Articles`;
  const description = `${cat.description} — Browse all ${cat.name} articles on ${siteConfig.name}.`;
  const url = `${siteConfig.url}/blog/category/${cat.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}

/* ── Category Page ────────────────────────────────────────── */
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const categoryName = slugToCategory(category);
  if (!categoryName) notFound();

  const posts = getPostsByCategory(categoryName);

  return (
    <>
      <CategoryJsonLd
        categoryName={cat.name}
        categorySlug={cat.slug}
        description={cat.description}
      />

      <div className="max-w-6xl mx-auto px-5 pt-28 pb-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1.5 text-xs text-[var(--text3)]">
            <li>
              <Link href="/" className="hover:text-[var(--accent2)] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/blog" className="hover:text-[var(--accent2)] transition-colors">
                Blog
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-[var(--text2)]" aria-current="page">
              {cat.name}
            </li>
          </ol>
        </nav>

        {/* Category hero */}
        <header className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-5xl"
              role="img"
              aria-label={cat.name}
            >
              {cat.icon}
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent2)] mb-1">
                ✦ Topic
              </p>
              <h1 className="font-serif font-bold text-4xl text-[var(--text)]">
                {cat.name}
              </h1>
            </div>
          </div>
          <p className="text-[var(--text2)] text-lg max-w-2xl leading-relaxed">
            {cat.description}
          </p>
          <p className="text-sm text-[var(--text3)] mt-3">
            {posts.length} {posts.length === 1 ? "article" : "articles"} in this topic
          </p>
        </header>

        {/* All categories quick nav */}
        <nav
          aria-label="All topics"
          className="flex flex-wrap gap-2 mb-12 pb-10 border-b border-[var(--border)]"
        >
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/blog/category/${c.slug}`}
              aria-current={c.slug === category ? "page" : undefined}
              className={`
                px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
                ${c.slug === category
                  ? "bg-[var(--accent)] text-white shadow-[0_4px_12px_var(--glow)]"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text2)] hover:border-[var(--accent)] hover:text-[var(--accent2)]"
                }
              `}
            >
              {c.icon} {c.name}
            </Link>
          ))}
        </nav>

        {/* Posts grid — with search only (category already filtered) */}
        {posts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-4xl mb-4">✍️</p>
            <p className="text-[var(--text2)]">No articles yet in this topic. Check back soon!</p>
            <Link
              href="/blog"
              className="inline-block mt-6 text-sm font-semibold text-[var(--accent2)] hover:underline"
            >
              ← Back to all posts
            </Link>
          </div>
        ) : (
          <BlogGrid
            posts={posts}
            showFilter={false}
            showSearch
            initialCount={9}
          />
        )}
      </div>
    </>
  );
}
