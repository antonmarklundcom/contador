import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { Crumb } from "@/lib/jsonld";

/**
 * Ink page header used by every interior page: breadcrumbs, eyebrow, H1 and a
 * lead paragraph. Phase A2 layers the homepage hero on top of the same tokens.
 */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-ink text-white">
      <div className="container-site flex flex-col gap-6 py-12 lg:py-20">
        <div className="text-white/60 [&_a:hover]:text-white [&_a]:text-white/60 [&_span[aria-current]]:text-white">
          <Breadcrumbs crumbs={crumbs} />
        </div>
        <div className="flex max-w-[760px] flex-col gap-5">
          {eyebrow ? (
            <span className="text-[13px] font-semibold text-amber">{eyebrow}</span>
          ) : null}
          <h1 className="m-0 text-[38px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-[48px] lg:text-display-xl">
            {title}
          </h1>
          {lead ? (
            <p className="m-0 max-w-[560px] text-lg leading-[1.55] text-white/72">
              {lead}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
