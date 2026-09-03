import Link from "next/link";
import { ui } from "@/content/ui";

/** Wordmark: amber square + "contador.com.py" in Bricolage 800. */
export function Logo({
  tone = "ink",
  size = "md",
}: {
  tone?: "ink" | "light";
  size?: "md" | "sm";
}) {
  const square = size === "sm" ? "h-[26px] w-[26px] rounded-[7px]" : "h-[30px] w-[30px] rounded-lg";
  const text = size === "sm" ? "text-lg" : "text-xl";
  const color = tone === "ink" ? "text-white" : "text-ink";

  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 no-underline ${color}`}
      aria-label={`${ui.brand.wordmark} — ${ui.nav.home}`}
    >
      <span aria-hidden="true" className={`block bg-amber ${square}`} />
      <span className={`font-display font-extrabold tracking-[-0.02em] ${text}`}>
        {ui.brand.wordmark}
      </span>
    </Link>
  );
}
