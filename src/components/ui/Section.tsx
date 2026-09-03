import type { ReactNode } from "react";

export type SectionTone = "white" | "surface" | "ink";

const toneClasses: Record<SectionTone, string> = {
  white: "bg-white text-ink",
  surface: "bg-surface text-ink",
  ink: "bg-ink text-white",
};

/**
 * A page band. Tones alternate blanco / #F4F6FA / azul tinta per the 1b
 * spacing rules.
 */
export function Section({
  tone = "white",
  id,
  className = "",
  children,
  as: Tag = "section",
}: {
  tone?: SectionTone;
  id?: string;
  className?: string;
  children: ReactNode;
  as?: "section" | "div";
}) {
  return (
    <Tag id={id} className={`section-y ${toneClasses[tone]} ${className}`}>
      <div className="container-site">{children}</div>
    </Tag>
  );
}

/** Eyebrow + H2 + optional lead, laid out as in the 1b section headers. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  tone = "white",
  align = "split",
  headingLevel: Heading = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: SectionTone;
  /** "split" puts the lead in a right-hand column at ≥1024px. */
  align?: "split" | "stacked";
  headingLevel?: "h1" | "h2";
  className?: string;
}) {
  const eyebrowClass = tone === "ink" ? "text-amber" : "text-amber-text";
  const leadClass = tone === "ink" ? "text-white/70" : "text-muted";

  return (
    <div
      className={[
        align === "split"
          ? "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
          : "flex flex-col gap-3",
        className,
      ].join(" ")}
    >
      <div className="flex max-w-[620px] flex-col gap-3">
        {eyebrow ? (
          <span className={`text-[13px] font-semibold ${eyebrowClass}`}>{eyebrow}</span>
        ) : null}
        <Heading className="m-0 text-[34px] font-extrabold tracking-[-0.03em] leading-[1.05] sm:text-[38px] lg:text-display">
          {title}
        </Heading>
      </div>
      {lead ? (
        <p className={`m-0 max-w-[380px] text-base leading-[1.55] ${leadClass}`}>{lead}</p>
      ) : null}
    </div>
  );
}
