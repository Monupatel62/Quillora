import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── Output ──────────────────────────────────────────────── */
  // 'standalone' for Docker/production; remove for Vercel
  // output: 'standalone',

  /* ── Compression ─────────────────────────────────────────── */
  compress: true,

  /* ── Images ───────────────────────────────────────────────── */
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // 24 hours
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* ── Strict CSP & security headers ───────────────────────── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options",           value: "DENY" },
          // Stop MIME sniffing
          { key: "X-Content-Type-Options",    value: "nosniff" },
          // XSS protection (legacy browsers)
          { key: "X-XSS-Protection",          value: "1; mode=block" },
          // Control referrer info sent to other sites
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          // Permissions policy — disable unused APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // HSTS — tell browsers to always use HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      /* Cache static assets aggressively */
      {
        source: "/(.*)\\.(woff2|woff|ttf|otf|svg|png|jpg|jpeg|gif|ico|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      /* Cache JS/CSS chunks */
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  /* ── Redirects ────────────────────────────────────────────── */
  async redirects() {
    return [
      // Normalise trailing slashes
      {
        source: "/blog/",
        destination: "/blog",
        permanent: true,
      },
    ];
  },

  /* ── Experimental ─────────────────────────────────────────── */
  experimental: {
    // Optimise CSS loading
    optimizeCss: true,
    // Pre-render server components with PPR when available
    // ppr: true, // Uncomment when on Next 16 canary with PPR stable
  },

  /* ── TypeScript ───────────────────────────────────────────── */
  typescript: {
    ignoreBuildErrors: false,
  },

  /* ── Power source maps in production for better debugging ─── */
  productionBrowserSourceMaps: false,
};

export default nextConfig;
