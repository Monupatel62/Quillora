import type { SiteConfig } from "@/types/blog";

export const siteConfig: SiteConfig = {
  name: "Quillora",
  tagline: "Ideas worth reading.",
  description:
    "In-depth technology articles and the latest IT jobs in India. No noise — just ideas and opportunities worth reading.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://quillora-io.vercel.app",
  twitterHandle: "@quillorablog",
  locale: "en_US",
  defaultOgImage: "/og-default.png",
};
