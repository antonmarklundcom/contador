import Link from "next/link";
import { ui } from "@/content/ui";
import type { Crumb } from "@/lib/jsonld";

/**
 * Breadcrumb trail. The live site renders a flat "Home » Page"; the rebuild
 * shows the real hierarchy (plan.md §6.1.1) and emits BreadcrumbList JSON-LD
 * from the same array.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length === 0) return null;

  return (
    <nav aria-label={ui.nav.breadcrumb} className="text-[13px] text-muted">
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-ink">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="no-underline hover:text-ink">
                  {crumb.name}
                </Link>
              )}
              {isLast ? null : (
                <span aria-hidden="true" className="text-line-strong">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
