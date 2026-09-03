import type { ReactNode } from "react";

/**
 * "Tarjeta: blanco, borde #E6EAF0, radio 16, sin sombra. Inversa: #0F1B2D."
 * — 1b style guide.
 */
export function Card({
  as: Tag = "div",
  tone = "light",
  className = "",
  children,
}: {
  as?: "div" | "article" | "li" | "figure" | "section";
  tone?: "light" | "ink";
  className?: string;
  children: ReactNode;
}) {
  const toneClasses =
    tone === "ink"
      ? "bg-ink text-white"
      : "bg-white text-ink border border-line";

  return (
    <Tag className={`rounded-card p-7 ${toneClasses} ${className}`}>{children}</Tag>
  );
}

/** The numbered 40×40 ink square used on the service cards (01–06). */
export function CardNumber({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 items-center justify-center rounded-tile bg-ink font-display text-base font-extrabold text-amber"
    >
      {children}
    </span>
  );
}
