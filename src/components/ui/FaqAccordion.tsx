import type { FaqItem } from "@/content/types";

/**
 * Native <details> accordion — works without JavaScript and is keyboard
 * accessible for free.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-card border border-line bg-white px-6 py-5 open:bg-surface"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-lg font-semibold tracking-[-0.01em] marker:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-amber-text transition-transform duration-150 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="m-0 pt-3 text-[15px] leading-[1.6] text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
