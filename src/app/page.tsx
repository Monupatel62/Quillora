import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getFeaturedPost, formatDate } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import { siteConfig } from "@/lib/config";
import { FeaturedCard } from "@/components/blog/FeaturedCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { Newsletter } from "@/components/ui/Newsletter";

/* ── Homepage Metadata ────────────────────────────────────────
   Strategy:
   - Title: brand + primary value proposition
   - Description: 150-160 chars, keyword-rich, action-oriented
   - Keywords: broad + long-tail mix for homepage authority
   - OG/Twitter: full social sharing optimization
   ──────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Quillora — Thoughtful Articles on Technology, Design & Culture",
  description:
    "Quillora publishes in-depth articles on technology, UI design, science, personal finance, health, travel, and life philosophy. Ideas worth reading, every week.",
  keywords: [
    "technology blog",
    "design articles",
    "science blog",
    "personal finance tips",
    "health and wellness",
    "travel blog",
    "life philosophy",
    "AI articles",
    "UX design blog",
    "long form reading",
    "quillora",
    "ideas blog",
    "culture articles",
  ],
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Quillora — Thoughtful Articles on Technology, Design & Culture",
    description:
      "In-depth articles on technology, design, science, finance, health, travel, and life. No noise — just ideas worth reading.",
    images: [
      {
        url: `${siteConfig.url}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "Quillora — Ideas worth reading",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    title: "Quillora — Thoughtful Articles on Technology, Design & Culture",
    description:
      "In-depth articles on technology, design, science, finance, health, travel, and life.",
    images: [`${siteConfig.url}/og-default.png`],
  },
};

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
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full animate-orb"
            style={{ background: "var(--accent)", filter: "blur(90px)", opacity: 0.18 }} />
          <div className="absolute top-1/2 -right-40 w-[420px] h-[420px] rounded-full animate-orb"
            style={{ background: "#22d3ee", filter: "blur(90px)", opacity: 0.14, animationDelay: "-3s" }} />
          <div className="absolute -bottom-20 left-1/3 w-[360px] h-[360px] rounded-full animate-orb"
            style={{ background: "#f472b6", filter: "blur(90px)", opacity: 0.12, animationDelay: "-6s" }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 py-28 grid md:grid-cols-2 gap-12 items-center w-full">
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
              In-depth articles on technology, design, science, finance, health, and culture.
              Written for curious minds who want more than headlines.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-12 animate-fade-up delay-300">
              <Link
                href="/blog"
                className="px-7 py-3.5 rounded-full font-semibold text-white text-sm bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] shadow-[0_4px_20px_var(--glow)] hover:shadow-[0_8px_30px_var(--glow)] hover:-translate-y-0.5 transition-all duration-200"
              >
                Start Reading
              </Link>
              <Link
                href="#featured"
                className="px-7 py-3.5 rounded-full font-semibold text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all duration-200"
              >
                Featured Posts ↓
              </Link>
            </div>

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

          {/* Floating preview cards */}
          <div className="hidden md:block relative h-[420px]" aria-hidden>
            {allPosts.slice(0, 3).map((post, i) => {
              const positions = ["top-0 left-0 w-52", "top-24 right-0 w-48", "bottom-8 left-16 w-52"];
              const delays = ["0s", "-2s", "-4s"];
              return (
                <div
                  key={post.slug}
                  className={`absolute ${positions[i]} p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xl animate-float`}
                  style={{ animationDelay: delays[i] }}
                >
                  <p className="text-xs font-semibold text-[var(--accent2)] mb-1">{post.category}</p>
                  <p className="text-sm font-bold text-[var(--text)] leading-snug line-clamp-2">{post.title}</p>
                  <p className="text-[0.7rem] text-[var(--text3)] mt-2">{formatDate(post.publishedAt)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED ──────────────────────────────────────── */}
      <section id="featured" className="max-w-6xl mx-auto px-5 py-16" aria-labelledby="featured-heading">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent2)] mb-2">✦ Editor&apos;s Pick</p>
          <h2 id="featured-heading" className="font-serif font-bold text-3xl text-[var(--text)]">Featured Post</h2>
        </div>
        <FeaturedCard post={featured} />
      </section>

      {/* ── CATEGORIES ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 py-12" aria-labelledby="categories-heading">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent2)] mb-2">✦ Explore</p>
          <h2 id="categories-heading" className="font-serif font-bold text-3xl text-[var(--text)]">Browse by Topic</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3" role="list">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              role="listitem"
              className="flex flex-col items-center gap-2 py-5 px-3 rounded-2xl text-center bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] hover:-translate-y-1.5 card-glow transition-all duration-200 animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
              aria-label={`Browse ${cat.name} articles`}
            >
              <span className="text-2xl" role="img" aria-label={cat.name}>{cat.icon}</span>
              <span className="text-xs font-semibold text-[var(--text)]">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── LATEST POSTS ──────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 py-12" aria-labelledby="latest-heading">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent2)] mb-2">✦ Latest</p>
            <h2 id="latest-heading" className="font-serif font-bold text-3xl text-[var(--text)]">Recent Articles</h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-[var(--accent2)] hover:text-[var(--accent)] transition-colors" aria-label="View all blog posts">
            View all articles →
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

      {/* ── INDIA IT JOBS — Internal linking hub ──────────
          Critical for Google crawl: direct links to all job
          posts from homepage boosts crawl budget allocation
      ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 pb-20" aria-labelledby="jobs-hub-heading">
        <div className="border border-[var(--border)] rounded-3xl p-8 bg-[var(--surface)]">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent2)] mb-2">💼 Job Resources</p>
            <h2 id="jobs-hub-heading" className="font-serif font-bold text-2xl text-[var(--text)]">
              India IT Jobs 2026
            </h2>
            <p className="text-sm text-[var(--text2)] mt-2">
              Latest hiring guides — by city, company, role, and experience level.
            </p>
          </div>

          {/* City Jobs */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text3)] mb-3">By City</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Bangalore", slug: "it-jobs-bangalore-2026" },
                { label: "Hyderabad", slug: "it-jobs-hyderabad-2026" },
                { label: "Pune", slug: "it-jobs-pune-2026" },
                { label: "Mumbai", slug: "it-jobs-mumbai-2026" },
                { label: "Chennai", slug: "it-jobs-chennai-2026" },
                { label: "Noida & NCR", slug: "it-jobs-noida-delhi-ncr-2026" },
              ].map((city) => (
                <Link
                  key={city.slug}
                  href={`/blog/${city.slug}`}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[var(--surface2)] border border-[var(--border)] text-[var(--text2)] hover:border-[var(--accent)] hover:text-[var(--accent2)] transition-all duration-200"
                >
                  {city.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company Jobs */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text3)] mb-3">By Company</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "TCS", slug: "tcs-jobs-freshers-salary-2026" },
                { label: "Infosys", slug: "infosys-jobs-freshers-salary-2026" },
                { label: "Wipro", slug: "wipro-jobs-freshers-salary-2026" },
                { label: "HCLTech", slug: "hcltech-jobs-freshers-salary-2026" },
                { label: "Cognizant", slug: "cognizant-jobs-freshers-salary-2026" },
                { label: "Accenture", slug: "accenture-jobs-freshers-salary-2026" },
                { label: "Capgemini", slug: "capgemini-jobs-freshers-salary-2026" },
                { label: "Tech Mahindra", slug: "tech-mahindra-jobs-freshers-salary-2026" },
              ].map((co) => (
                <Link
                  key={co.slug}
                  href={`/blog/${co.slug}`}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[var(--surface2)] border border-[var(--border)] text-[var(--text2)] hover:border-[var(--accent)] hover:text-[var(--accent2)] transition-all duration-200"
                >
                  {co.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Role Jobs */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text3)] mb-3">By Role</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Software Engineer", slug: "software-engineer-jobs-india-2026" },
                { label: "AI / ML Engineer", slug: "ai-ml-engineer-jobs-india-2026" },
                { label: "Data Scientist", slug: "data-scientist-jobs-india-2026" },
                { label: "Full Stack Developer", slug: "full-stack-developer-jobs-india-2026" },
                { label: "Cloud Engineer", slug: "cloud-engineer-jobs-india-2026" },
                { label: "DevOps Engineer", slug: "devops-engineer-jobs-india-2026" },
                { label: "Cybersecurity", slug: "cybersecurity-jobs-india-2026" },
                { label: "Business Analyst", slug: "business-analyst-jobs-india-2026" },
              ].map((role) => (
                <Link
                  key={role.slug}
                  href={`/blog/${role.slug}`}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[var(--surface2)] border border-[var(--border)] text-[var(--text2)] hover:border-[var(--accent)] hover:text-[var(--accent2)] transition-all duration-200"
                >
                  {role.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text3)] mb-3">By Experience</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Fresher Jobs (TCS NQT, InfyTQ, NLTH)", slug: "fresher-it-jobs-india-2026" },
                { label: "2–5 Years Lateral Hiring", slug: "2-5-years-experience-it-jobs-india-2026" },
                { label: "Senior 7+ Years (20–80 LPA)", slug: "senior-it-jobs-india-2026-7-plus-years" },
              ].map((exp) => (
                <Link
                  key={exp.slug}
                  href={`/blog/${exp.slug}`}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[var(--surface2)] border border-[var(--border)] text-[var(--text2)] hover:border-[var(--accent)] hover:text-[var(--accent2)] transition-all duration-200"
                >
                  {exp.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
