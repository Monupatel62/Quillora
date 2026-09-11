import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/posts";
import { getCategoryByName } from "@/lib/categories";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
  /** Stagger animation delay index */
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const cat = getCategoryByName(post.category);
  const delay = Math.min(index * 80, 400);

  return (
    <article
      className="
        group relative flex flex-col rounded-2xl overflow-hidden
        bg-[var(--surface)] border border-[var(--border)]
        hover:border-[var(--accent)] card-glow
        transition-all duration-300 hover:-translate-y-1.5
        animate-fade-up
      "
      style={{ animationDelay: `${delay}ms` }}
      aria-label={post.title}
    >
      {/* Cover */}
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read: ${post.title}`}
        className="block overflow-hidden"
        tabIndex={-1}
      >
        <div
          className={`
            h-48 flex items-center justify-center text-6xl
            bg-gradient-to-br ${post.coverGradient}
            transition-transform duration-500 group-hover:scale-105
          `}
          role="img"
          aria-label={`${post.category} article cover`}
        >
          {post.coverEmoji}
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Link
            href={`/blog/category/${post.category.toLowerCase()}`}
            className="
              text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full
              bg-[var(--surface2)] text-[var(--accent2)]
              hover:bg-[var(--accent)] hover:text-white transition-colors duration-200
            "
          >
            {cat?.icon} {post.category}
          </Link>
          <time
            dateTime={post.publishedAt}
            className="text-xs text-[var(--text3)]"
          >
            {formatDate(post.publishedAt)}
          </time>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-[1.1rem] leading-snug mb-2 text-[var(--text)] flex-1">
          <Link
            href={`/blog/${post.slug}`}
            className="
              link-underline
              group-hover:text-[var(--accent2)] transition-colors duration-200
            "
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-[var(--text2)] leading-relaxed line-clamp-3 mb-5">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-2.5">
            <div
              className="
                w-8 h-8 rounded-full flex items-center justify-center
                bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)]
                text-white text-xs font-bold shrink-0
              "
              aria-hidden="true"
            >
              {post.author.avatar}
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text)] leading-none">
                {post.author.name}
              </p>
              <p className="text-[0.7rem] text-[var(--text3)] mt-0.5">
                {post.author.role}
              </p>
            </div>
          </div>
          <span className="text-xs text-[var(--text3)] bg-[var(--surface2)] px-2.5 py-1 rounded-full">
            {post.readingTime} min
          </span>
        </div>
      </div>
    </article>
  );
}
