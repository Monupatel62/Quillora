import { siteConfig } from "@/lib/config";
import type { BlogPost } from "@/types/blog";

/* ============================================================
   JSON-LD Structured Data Components
   Google recommends JSON-LD for all structured data.
   Reference: https://nextjs.org/docs/app/guides/json-ld
   ============================================================ */

/* ── Website-level JSON-LD ──────────────────────────────── */
export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ── Article JSON-LD (per blog post) ───────────────────── */
export function ArticleJsonLd({ post }: { post: BlogPost }) {
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    image: [`${siteConfig.url}/og/${post.slug}.png`],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "en-US",
    articleSection: post.category,
    keywords: post.tags.join(", "),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,

    author: {
      "@type": "Person",
      name: post.author.name,
      description: post.author.bio,
      url: `${siteConfig.url}/author/${post.author.slug}`,
    },

    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },

    isPartOf: {
      "@type": "Blog",
      name: siteConfig.name,
      url: `${siteConfig.url}/blog`,
    },

    /* Breadcrumb */
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${siteConfig.url}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.category,
          item: `${siteConfig.url}/blog/category/${post.category.toLowerCase()}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: post.title,
          item: postUrl,
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ── Blog listing page JSON-LD ──────────────────────────── */
export function BlogListJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    description: siteConfig.description,
    url: `${siteConfig.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${siteConfig.url}/blog`,
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ── Category page JSON-LD ──────────────────────────────── */
export function CategoryJsonLd({
  categoryName,
  categorySlug,
  description,
}: {
  categoryName: string;
  categorySlug: string;
  description: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} Articles — ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/blog/category/${categorySlug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${siteConfig.url}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: categoryName,
          item: `${siteConfig.url}/blog/category/${categorySlug}`,
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
