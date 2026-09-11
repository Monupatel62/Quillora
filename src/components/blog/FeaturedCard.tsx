import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/posts";
import { getCategoryByName } from "@/lib/categories";

export function FeaturedCard({ post }: { post: BlogPost }) {
  const cat = getCategoryByName(post.category);

  return (
    <article
      className="
        group grid md:grid-cols-2 rounded-3xl overflow-hidden
        bg-[var(--surface)] border border-[var(--border)]
        hover:border-[var(--accent)] card-glow
        transition-all duration-300 hover:-translate-y-1
        min-h-[400px]
      "
      aria-label={`Featured: ${post.title}`}
    >
      {/* Cover */}
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read featured post: ${post.title}`}
        tabIndex={-1}
        className="block overflow-hidden relative"
      >
        <div
          className={`
            h-full min-h-[280px] flex items-center justify-center text-8xl
            bg-gradient-to-br ${post.coverGradient}
            transition-transform duration-500 group-hover:scale-105
          `}
          role="img"
          aria-label={`${post.category} featured cover`}
        >
          {post.coverEmoji}
        </div>
        {/* Fade to body on desktop */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-[var(--surface)]" />
      </Link>

      {/* Body */}
      <div className="flex flex-col justify-center p-8 md:p-10">
        {/* Featured badge + category */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent2)]">
            ✦ Featured
          </span>
          <Link
            href={`/blog/category/${post.category.toLowerCase()}`}
            className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-[var(--surface2)] text-[var(--text2)] hover:text-[var(--accent2)] transition-colors"
          >
            {cat?.icon} {post.category}
          </Link>
          <time dateTime={post.publishedAt} className="text-xs text-[var(--text3)]">
            {formatDate(post.publishedAt)}
          </time>
        </div>

        {/* Title */}
        <h2 className="font-serif font-bold text-2xl md:text-3xl leading-tight text-[var(--text)] mb-4">
          <Link
            href={`/blog/${post.slug}`}
            className="link-underline group-hover:text-[var(--accent2)] transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h2>

        <p className="text-[var(--text2)] text-sm leading-relaxed line-clamp-3 mb-6">
          {post.excerpt}
        </p>

        {/* Author row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] text-white text-sm font-bold shrink-0">
              {post.author.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text)]">{post.author.name}</p>
              <p className="text-xs text-[var(--text3)]">{post.author.role} · {post.readingTime} min read</p>
            </div>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="
              px-5 py-2.5 rounded-full text-sm font-semibold text-white
              bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]
              shadow-[0_4px_14px_var(--glow)]
              hover:shadow-[0_6px_20px_var(--glow)] hover:-translate-y-0.5
              transition-all duration-200
            "
            aria-label={`Read: ${post.title}`}
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
