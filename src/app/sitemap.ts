import type { MetadataRoute } from "next";
import { getAllPosts } from "@/content/blog";
import { staticPages } from "@/content/pages";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

/**
 * Only pages that are actually indexable are listed. Service pages whose copy
 * has not been written yet (`hero === null`, A1 seed state) carry `noindex`,
 * so they stay out until phase B1 fills them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home = {
    url: absoluteUrl("/"),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  const pages = staticPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: page.slug === "servicios" ? 0.9 : 0.7,
  }));

  const serviceUrls = services
    .filter((service) => service.hero !== null)
    .map((service) => ({
      url: absoluteUrl(service.path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const posts = getAllPosts().map((post) => ({
    url: absoluteUrl(post.path),
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [home, ...pages, ...serviceUrls, ...posts];
}
