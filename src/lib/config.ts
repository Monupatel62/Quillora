import type { SiteConfig } from "@/types/blog";

export const siteConfig: SiteConfig = {
  name: "Inkwell",
  tagline: "Ideas worth reading.",
  description:
    "Thoughtful articles on technology, design, culture, science, and the world around us. No noise — just ideas.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://inkwell.blog",
  twitterHandle: "@inkwellblog",
  locale: "en_US",
  defaultOgImage: "/og-default.png",
};
