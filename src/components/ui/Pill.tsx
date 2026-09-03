import type { ReactNode } from "react";

/** The hero eyebrow pill: translucent chip with an amber dot. */
export function Pill({
  children,
  tone = "ink",
}: {
  children: ReactNode;
  tone?: "ink" | "light";
}) {
  const toneClasses =
    tone === "ink"
      ? "bg-white/10 border-white/15 text-white"
      : "bg-surface border-line text-ink";

  return (
    <span
      className={`inline-flex items-center gap-2 self-start rounded-pill border px-3.5 py-[7px] text-[13px] font-medium ${toneClasses}`}
    >
      <span aria-hidden="true" className="block h-2 w-2 rounded-full bg-amber" />
      {children}
    </span>
  );
}

/** The green "Al día" style status chip. */
export function StatusChip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-pill bg-ok-tint px-2.5 py-1 text-xs font-semibold text-ok-text">
      {children}
    </span>
  );
}
