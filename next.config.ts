import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import type { NextConfig } from "next";

/**
 * Standard (non-static) output: the site runs on a Hostinger managed Node.js
 * slot, so `/api/lead` and the 410 middleware need a server
 * (nextjs-deploy-hostinger §1).
 */
const nextConfig: NextConfig = {
  // Legacy WordPress URLs all carry a trailing slash (scan §2) — keep them.
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],

  async redirects() {
    return [
      {
        // The old footer's "Política De Privacidad" link (scan §1) — a 404 today.
        source: "/",
        has: [{ type: "query", key: "page_id", value: "3" }],
        destination: "/privacidad/",
        statusCode: 301,
      },
      {
        source: "/wp-sitemap.xml",
        destination: "/sitemap.xml",
        statusCode: 301,
      },
      {
        source: "/wp-sitemap-:slug",
        destination: "/sitemap.xml",
        statusCode: 301,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    // Blog posts (phase B2) carry YAML frontmatter; strip it from the body and
    // read it with gray-matter in the loader instead.
    remarkPlugins: [remarkFrontmatter],
  },
});

export default withMDX(nextConfig);
