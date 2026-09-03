import type { MDXComponents } from "mdx/types";

/**
 * Required by @next/mdx in the App Router. Article typography is applied by
 * the wrapper in `app/blog/[slug]/page.tsx`, so the defaults stay unchanged
 * here; phase B2 can add custom components (callouts, tables) if needed.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
