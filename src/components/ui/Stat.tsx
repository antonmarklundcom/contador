import type { SiteStat } from "@/content/types";

/**
 * Hero figures. Renders nothing when the owner has not confirmed real numbers
 * — plan.md §1.4 forbids placeholder stats.
 */
export function StatRow({
  stats,
  tone = "ink",
}: {
  stats: SiteStat[];
  tone?: "ink" | "light";
}) {
  if (stats.length === 0) return null;

  const divider = tone === "ink" ? "border-white/12" : "border-line";
  const labelClass = tone === "ink" ? "text-white/60" : "text-muted";

  return (
    <dl className={`flex flex-wrap gap-9 border-t pt-3 ${divider}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-0.5 pt-3.5">
          <dt className="sr-only">{stat.label}</dt>
          <dd className="m-0 font-display text-display-sm font-extrabold">
            {stat.value}
          </dd>
          <span className={`text-[13px] ${labelClass}`}>{stat.label}</span>
        </div>
      ))}
    </dl>
  );
}
