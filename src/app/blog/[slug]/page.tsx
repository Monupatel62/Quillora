import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  formatDate,
  postUrl,
} from "@/lib/posts";
import { getCategoryByName } from "@/lib/categories";
import { siteConfig } from "@/lib/config";
import { ArticleJsonLd } from "@/components/seo/JsonLd";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { BlogCard } from "@/components/blog/BlogCard";
import { Newsletter } from "@/components/ui/Newsletter";

/* ── Static params — SSG all posts at build time ────────────── */
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ── Per-post Metadata ────────────────────────────────────────
   Strategy (30-year SEO expertise level):
   1. Title: Primary keyword first, brand last, under 60 chars
   2. Description: 150-155 chars, includes primary + secondary keyword
   3. Keywords: post tags + LSI terms (already research-optimized in posts.ts)
   4. OG article: publishedTime, modifiedTime, authors, section, tags
   5. Twitter card: summary_large_image for max CTR
   6. Canonical: exact post URL — no trailing slash
   7. openGraph.locale for international signals
   ──────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const url = postUrl(slug);

  /* Per-post social share image (generated at build in /public/og). */
  const ogImage = `${siteConfig.url}/og/${slug}.png`;

  /* Title: 55–60 chars ideal — primary keyword | brand */
  const metaTitle = `${post.title} | ${siteConfig.name}`;

  /* Description: 150-155 chars, action-oriented, keyword-rich */
  const metaDesc =
    post.excerpt.length > 155
      ? post.excerpt.substring(0, 152) + "..."
      : post.excerpt;

  return {
    title: post.title,       // Next.js applies template: "title | Quillora"
    description: metaDesc,
    keywords: post.tags,

    authors: [
      {
        name: post.author.name,
        url: `${siteConfig.url}/author/${post.author.slug}`,
      },
    ],

    alternates: {
      canonical: url,
    },

    /* ── Open Graph — Article type for Google rich results ── */
    openGraph: {
      type: "article",
      url,
      title: metaTitle,
      description: metaDesc,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    /* ── Twitter/X Card ─────────────────────────────────── */
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: post.author.twitter ?? siteConfig.twitterHandle,
      title: metaTitle,
      description: metaDesc,
      images: [ogImage],
    },
  };
}

/* ── Blog Post Page ───────────────────────────────────────── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cat = getCategoryByName(post.category);
  const related = getRelatedPosts(slug, 3);
  const url = postUrl(slug);

  return (
    <>
      {/* Article JSON-LD — rich results for Google */}
      <ArticleJsonLd post={post} />

      {/* Reading progress indicator */}
      <ReadingProgress />

      <div className="pt-20">
        {/* ── Post Hero ──────────────────────────────────── */}
        <header className="max-w-3xl mx-auto px-5 py-12 text-center">

          {/* Breadcrumb — important for SEO hierarchy signals */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-1.5 text-xs text-[var(--text3)] flex-wrap">
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
              <li>
                <Link
                  href={`/blog/category/${post.category.toLowerCase()}`}
                  className="hover:text-[var(--accent2)] transition-colors"
                >
                  {post.category}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-[var(--text2)] line-clamp-1 max-w-[160px]" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Category + meta row */}
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            <Link
              href={`/blog/category/${post.category.toLowerCase()}`}
              className="text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent2)] hover:bg-[var(--accent)]/20 transition-colors"
            >
              {cat?.icon} {post.category}
            </Link>
            <time dateTime={post.publishedAt} className="text-xs text-[var(--text3)]">
              {formatDate(post.publishedAt)}
            </time>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span className="text-xs text-[var(--text3)]">
                · Updated {formatDate(post.updatedAt)}
              </span>
            )}
            <span className="text-xs text-[var(--text3)]">· {post.readingTime} min read</span>
          </div>

          {/* H1 — primary keyword must appear here */}
          <h1 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[var(--text)] mb-6">
            {post.title}
          </h1>

          {/* Excerpt — search snippet preview */}
          <p className="text-lg text-[var(--text2)] leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Author — E-E-A-T signal (Experience, Expertise, Authority, Trust) */}
          <div className="flex items-center justify-center gap-3 py-6 border-y border-[var(--border)]">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] text-white font-bold text-sm shrink-0"
              aria-hidden="true"
            >
              {post.author.avatar}
            </div>
            <div className="text-left">
              <p className="font-semibold text-[var(--text)]">{post.author.name}</p>
              <p className="text-sm text-[var(--text3)]">
                {post.author.role}
                {post.author.twitter && (
                  <>
                    {" · "}
                    <a
                      href={`https://twitter.com/${post.author.twitter.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent2)] transition-colors"
                    >
                      {post.author.twitter}
                    </a>
                  </>
                )}
              </p>
            </div>
          </div>
        </header>

        {/* ── Cover ──────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-5 mb-12">
          <div
            className={`h-72 md:h-96 rounded-3xl flex items-center justify-center text-8xl bg-gradient-to-br ${post.coverGradient}`}
            role="img"
            aria-label={`${post.category} article: ${post.title}`}
          >
            {post.coverEmoji}
          </div>
        </div>

        {/* ── Article Content ─────────────────────────────
            itemScope + itemType = Google Article microdata
            Boosts E-E-A-T and structured data signals
        ────────────────────────────────────────────────── */}
        <article
          className="
            max-w-3xl mx-auto px-5 mb-16
            prose prose-lg prose-quillora
            dark:prose-invert
            prose-headings:font-serif prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[var(--text2)] prose-p:leading-relaxed
            prose-blockquote:border-l-[var(--accent)] prose-blockquote:bg-[var(--surface)] prose-blockquote:rounded-r-xl prose-blockquote:py-1
            prose-strong:text-[var(--text)]
            prose-a:text-[var(--accent2)] prose-a:no-underline hover:prose-a:underline
            prose-code:text-[var(--accent2)] prose-code:bg-[var(--surface2)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-[var(--surface)] prose-pre:border prose-pre:border-[var(--border)] prose-pre:rounded-2xl
            max-w-none
          "
          itemScope
          itemType="https://schema.org/Article"
        >
          {/* Microdata — reinforces JSON-LD */}
          <meta itemProp="headline" content={post.title} />
          <meta itemProp="description" content={post.excerpt} />
          <meta itemProp="datePublished" content={post.publishedAt} />
          <meta itemProp="dateModified" content={post.updatedAt ?? post.publishedAt} />
          <meta itemProp="author" content={post.author.name} />
          <meta itemProp="publisher" content={siteConfig.name} />
          <meta itemProp="articleSection" content={post.category} />
          <meta itemProp="keywords" content={post.tags.join(", ")} />
          <meta itemProp="timeRequired" content={`PT${post.readingTime}M`} />

          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* ── Tags + Share ────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-5 mb-16">
          {/* Tags — internal linking + topic signals */}
          <div className="flex items-center gap-2 flex-wrap mb-8">
            <span className="text-xs font-semibold text-[var(--text3)] uppercase tracking-wider mr-1">
              Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text2)] hover:border-[var(--accent)] hover:text-[var(--accent2)] cursor-default transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          <ShareButtons url={url} title={post.title} />
        </div>

        {/* ── Related Posts — internal linking boost ──────── */}
        {related.length > 0 && (
          <section
            className="max-w-6xl mx-auto px-5 py-12 border-t border-[var(--border)]"
            aria-labelledby="related-heading"
          >
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent2)] mb-2">
                ✦ Continue Reading
              </p>
              <h2 id="related-heading" className="font-serif font-bold text-2xl text-[var(--text)]">
                Related Articles
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* ── Newsletter ─────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-5 py-12 pb-20">
          <Newsletter />
        </div>
      </div>
    </>
  );
}

/* ── Share Buttons ────────────────────────────────────────── */
function ShareButtons({ url, title }: { url: string; title: string }) {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs font-semibold text-[var(--text3)] uppercase tracking-wider">
        Share:
      </span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="w-9 h-9 rounded-full flex items-center justify-center text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text2)] hover:border-[var(--accent)] hover:text-[var(--accent2)] transition-all duration-200 hover:-translate-y-0.5"
      >𝕏</a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="w-9 h-9 rounded-full flex items-center justify-center text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text2)] hover:border-[var(--accent)] hover:text-[var(--accent2)] transition-all duration-200 hover:-translate-y-0.5"
      >💬</a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-9 h-9 rounded-full flex items-center justify-center text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text2)] hover:border-[var(--accent)] hover:text-[var(--accent2)] transition-all duration-200 hover:-translate-y-0.5"
      >in</a>
    </div>
  );
}
