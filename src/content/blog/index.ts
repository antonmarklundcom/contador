import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost } from "../types";

/**
 * Blog loader. Articles are MDX files in this directory with YAML
 * frontmatter; phase B2 writes the five launch articles.
 *
 * The listing reads frontmatter off disk (cheap, cached by the build); the
 * article page renders the MDX body via a dynamic import. A1 ships the plumbing
 * with zero posts, which is a valid state — /blog/ renders an empty-state.
 */
const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

const WORDS_PER_MINUTE = 200;

function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === "string");
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);

      return {
        slug,
        path: `/blog/${slug}/`,
        title: typeof data.title === "string" ? data.title : slug,
        description: typeof data.description === "string" ? data.description : "",
        date: typeof data.date === "string" ? data.date : "1970-01-01",
        tags: toStringArray(data.tags),
        relatedServices: toStringArray(data.relatedServices),
        readingMinutes: readingMinutes(content),
      } satisfies BlogPost;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
