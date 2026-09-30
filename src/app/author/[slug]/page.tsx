import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAuthorBySlug,
  getPostsByAuthor,
  getAllAuthorSlugs,
} from "@/lib/posts";
import { siteConfig } from "@/lib/config";
import { AuthorJsonLd } from "@/components/seo/JsonLd";
import { BlogGrid } from "@/components/blog/BlogGrid";

/* ── SSG all author pages at build time ─────────────────── */
export async function generateStaticParams() {
  return getAllAuthorSlugs().map((slug) => ({ slug }));
}

/* ── Author Metadata ────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return { title: "Author Not Found" };

  const url = `${siteConfig.url}/author/${author.slug}`;
  const metaTitle = `${author.name} — ${author.role} | ${siteConfig.name}`;
  const metaDesc =
    author.bio.length > 155 ? author.bio.substring(0, 152) + "..." : author.bio;
  const ogImage = `${siteConfig.url}/og/author-${author.slug}.png`;

  return {
    title: `${author.name} — ${author.role}`,
    description: metaDesc,
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      url,
      siteName: siteConfig.name,
      title: metaTitle,
      description: metaDesc,
      images: [
        { url: ogImage, width: 1200, height: 630, alt: author.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: author.twitter ?? siteConfig.twitterHandle,
      title: metaTitle,
      description: metaDesc,
      images: [ogImage],
    },
  };
}

/* ── Author Page ────────────────────────────────────────── */
export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const posts = getPostsByAuthor(author.slug);

  return (
    <>
      <AuthorJsonLd
        name={author.name}
        slug={author.slug}
        bio={author.bio}
        role={author.role}
        postCount={posts.length}
      />

      <div className="max-w-6xl mx-auto px-5 pt-28 pb-20">
        {/* Breadcrumb — SEO hierarchy signal */}
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
              {author.name}
            </li>
          </ol>
        </nav>

        {/* Author hero */}
        <header className="mb-14 flex items-center gap-5">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] text-white font-bold text-2xl shrink-0"
            aria-hidden="true"
          >
            {author.avatar}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent2)] mb-1">
              ✦ Author
            </p>
            {/* H1 — author name */}
            <h1 className="font-serif font-bold text-4xl text-[var(--text)]">
              {author.name}
            </h1>
            <p className="text-[var(--text3)] mt-1">
              {author.role}
              {author.twitter && (
                <>
                  {" · "}
                  <a
                    href={`https://twitter.com/${author.twitter.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent2)] transition-colors"
                  >
                    {author.twitter}
                  </a>
                </>
              )}
            </p>
          </div>
        </header>

        {/* Bio */}
        <p className="text-[var(--text2)] text-lg max-w-2xl leading-relaxed mb-3">
          {author.bio}
        </p>
        <p className="text-sm text-[var(--text3)] mb-12 pb-10 border-b border-[var(--border)]">
          {posts.length} {posts.length === 1 ? "article" : "articles"} by {author.name}
        </p>

        {/* Posts grid */}
        {posts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-4xl mb-4">✍️</p>
            <p className="text-[var(--text2)]">No articles by this author yet.</p>
            <Link
              href="/blog"
              className="inline-block mt-6 text-sm font-semibold text-[var(--accent2)] hover:underline"
            >
              ← Browse all articles
            </Link>
          </div>
        ) : (
          <BlogGrid posts={posts} showFilter={false} showSearch initialCount={9} />
        )}
      </div>
    </>
  );
}
