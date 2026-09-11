import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getFeaturedPost, formatDate } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import { siteConfig } from "@/lib/config";
import { FeaturedCard } from "@/components/blog/FeaturedCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { Newsletter } from "@/components/ui/Newsletter";

/* ── Page-level Metadata ──────────────────────────────────── */
export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

/* ── This is a React Server Component ────────────────────── */
export default function HomePage() {
  const featured = getFeaturedPost();
  const allPosts = getAllPosts();
  const recentPosts = allPosts.filter((p) => p.slug !== featured.slug).slice(0, 6);
  const postCount = allPosts.length;

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] flex items-center overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Background orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full animate-orb"
            style={{ background: "var(--accent)", filter: "blur(90px)", opacity: 0.18 }}
          />
          <div
            className="absolute top-1/2 -right-40 w-[420px] h-[420px] rounded-full animate-orb"
            style={{ background: "#22d3ee", filter: "blur(90px)", opacity: 0.14, animationDelay: "-3s" }}
          />
          <div
            className="absolute -bottom-20 left-1/3 w-[360px] h-[360px] rounded-full animate-orb"
            style={{ background: "#f472b6", filter: "blur(90px)", opacity: 0.12, animationDelay: "-6s" }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 py-28 grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs font-semibold text-[var(--accent2)] mb-7 animate-fade-up">
              ✦ Welcome to Quillora
            </div>

            <h1
              id="hero-heading"
              className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-[var(--text)] mb-6 animate-fade-up delay-100"
            >
              Ideas worth
              <br />
              <em className="gradient-text not-italic">reading.</em>
            </h1>

            <p className="text-lg text-[var(--text2)] leading-relaxed max-w-lg mb-10 animate-fade-up delay-200">
              {siteConfig.description}
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-12 animate-fade-up delay-300">
              <Link
                href="/blog"
                className="
                  px-7 py-3.5 rounded-full font-semibold text-white text-sm
                  bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]
                  shadow-[0_4px_20px_var(--glow)]
                  hover:shadow-[0_8px_30px_var(--glow)] hover:-translate-y-0.5
                  transition-all duration-200
                "
              >
                Start Reading
              </Link>
              <Link
                href="#featured"
                className="
                  px-7 py-3.5 rounded-full font-semibold text-sm
                  bg-[var(--surface)] border border-[var(--border)]
                  text-[var(--text)] hover:border-[var(--accent)] hover:-translate-y-0.5
                  transition-all duration-200
                "
              >
                Featured Posts ↓
              </Link>
            </div>

            {/* Stats */}
            <dl className="flex items-center gap-6 animate-fade-up delay-400">
              <div>
                <dt className="text-xs text-[var(--text3)] font-medium">Articles</dt>
                <dd className="text-2xl font-bold text-[var(--text)]">{postCount}</dd>
              </div>
              <div className="w-px h-10 bg-[var(--border)]" aria-hidden />
              <div>
                <dt className="text-xs text-[var(--text3)] font-medium">Topics</dt>
                <dd className="text-2xl font-bold text-[var(--text)]">{CATEGORIES.length}</dd>
              </div>
              <div className="w-px h-10 bg-[var(--border)]" aria-hidden />
              <div>
                <dt className="text-xs text-[var(--text3)] font-medium">Readers</dt>
                <dd className="text-2xl font-bold text-[var(--text)]">12k+</dd>
              </div>
            </dl>
          </div>

          {/* Right — floating preview cards */}
          <div
            className="hidden md:block relative h-[420px]"
            aria-hidden
          >
            {allPosts.slice(0, 3).map((post, i) => {
              const positions = [
                "top-0 left-0 w-52",
                "top-24 right-0 w-48",
                "bottom-8 left-16 w-52",
              ];
              const delays = ["0s", "-2s", "-4s"];
              return (
                <div
                  key={post.slug}
                  className={`absolute ${positions[i]} p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xl animate-float`}
                  style={{ animationDelay: delays[i] }}
                >
                  <p className="text-xs font-semibold text-[var(--accent2)] mb-1">
                    {post.category}
                  </p>
                  <p className="text-sm font-bold text-[var(--text)] leading-snug line-clamp-2">
                    {post.title}
                  </p>
                  <p className="text-[0.7rem] text-[var(--text3)] mt-2">
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED ──────────────────────────────────────── */}
      <section
        id="featured"
        className="max-w-6xl mx-auto px-5 py-16"
        aria-labelledby="featured-heading"
      >
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent2)] mb-2">
            ✦ Editor&apos;s Pick
          </p>
          <h2
            id="featured-heading"
            className="font-serif font-bold text-3xl text-[var(--text)]"
          >
            Featured Post
          </h2>
        </div>
        <FeaturedCard post={featured} />
      </section>

      {/* ── CATEGORIES ────────────────────────────────────── */}
      <section
        className="max-w-6xl mx-auto px-5 py-12"
        aria-labelledby="categories-heading"
      >
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent2)] mb-2">
            ✦ Explore
          </p>
          <h2
            id="categories-heading"
            className="font-serif font-bold text-3xl text-[var(--text)]"
          >
            Browse by Topic
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3" role="list">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              role="listitem"
              className="
                flex flex-col items-center gap-2 py-5 px-3 rounded-2xl text-center
                bg-[var(--surface)] border border-[var(--border)]
                hover:border-[var(--accent)] hover:-translate-y-1.5
                card-glow transition-all duration-200
                animate-fade-up
              "
              style={{ animationDelay: `${i * 50}ms` }}
              aria-label={`Browse ${cat.name} articles`}
            >
              <span className="text-2xl" role="img" aria-label={cat.name}>
                {cat.icon}
              </span>
              <span className="text-xs font-semibold text-[var(--text)]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── LATEST POSTS ──────────────────────────────────── */}
      <section
        className="max-w-6xl mx-auto px-5 py-12"
        aria-labelledby="latest-heading"
      >
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent2)] mb-2">
              ✦ Latest
            </p>
            <h2
              id="latest-heading"
              className="font-serif font-bold text-3xl text-[var(--text)]"
            >
              Recent Posts
            </h2>
          </div>
          <Link
            href="/blog"
            className="
              text-sm font-semibold text-[var(--accent2)]
              hover:text-[var(--accent)] transition-colors
            "
            aria-label="View all blog posts"
          >
            View all posts →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 py-12 pb-20">
        <Newsletter />
      </section>
    </>
  );
}
