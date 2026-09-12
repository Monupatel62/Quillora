import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { WebsiteJsonLd } from "@/components/seo/JsonLd";

const GA_ID  = process.env.NEXT_PUBLIC_GA_ID  ?? "G-G2XHV6ZK90";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-MNLF3NQ5";

/* ── Fonts ────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

/* ── Root Metadata ────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: [
    "blog",
    "technology",
    "design",
    "culture",
    "science",
    "finance",
    "health",
    "travel",
    "life",
    "articles",
    "writing",
  ],

  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  /* ── Open Graph ──────────────────────────────────────────── */
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },

  /* ── Twitter / X ─────────────────────────────────────────── */
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.defaultOgImage],
  },

  /* ── Robots ──────────────────────────────────────────────── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Canonical ───────────────────────────────────────────── */
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },

  /* ── Verification ───────────────────────────────────────── */
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? "google5cf17b48e7a56fbf",
  },

  /* ── Icons ───────────────────────────────────────────────── */
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  /* ── Manifest ────────────────────────────────────────────── */
  manifest: "/site.webmanifest",
};

/* ── Viewport ─────────────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0f" },
  ],
  width: "device-width",
  initialScale: 1,
};

/* ── Root Layout ──────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        {/* Preconnect to Google Fonts CDN */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for analytics */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* ── Multitag Ad Script (direct in head) ── */}
        <script
          src="https://quge5.com/88/tag.min.js"
          data-zone="278856"
          async
          data-cfasync="false"
        />

        {/* ── Vignette Banner Ad ── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='11779339',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
          }}
        />

        {/* ── Service Worker Registration for Push Ads ── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js', { scope: '/' })
                    .then(function(reg) { console.log('SW registered'); })
                    .catch(function(err) { console.log('SW error:', err); });
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {/* ── Google Tag Manager (noscript fallback) ── */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        {/* ── Google Tag Manager ── */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>

        {/* ── Google Analytics GA4 ── */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { page_path: window.location.pathname });`}
        </Script>

        <ThemeProvider>
          {/* Website-level JSON-LD structured data */}
          <WebsiteJsonLd />
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
