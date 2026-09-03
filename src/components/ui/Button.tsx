import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Buttons from the 1b style guide: amber pill (primary), outlined pill
 * (secondary) and the WhatsApp green pill. `onDark` swaps the secondary
 * outline for the ink-band variant used in the hero and header.
 */
export type ButtonVariant = "primary" | "secondary" | "whatsapp" | "ghost";
export type ButtonSize = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold no-underline transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-[22px] py-3.5 text-[15px]",
  lg: "px-[26px] py-4 text-base",
};

function variantClasses(variant: ButtonVariant, onDark: boolean): string {
  switch (variant) {
    case "primary":
      return "bg-amber text-ink hover:bg-amber-strong";
    case "whatsapp":
      return "bg-whatsapp text-white hover:brightness-95";
    case "ghost":
      return onDark
        ? "text-white hover:bg-white/10"
        : "text-ink hover:bg-surface";
    case "secondary":
    default:
      return onDark
        ? "border border-white/25 text-white hover:bg-white/10"
        : "border border-line-strong text-ink hover:bg-surface";
  }
}

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onDark?: boolean;
  className?: string;
  children: ReactNode;
}

export function buttonClassName({
  variant = "primary",
  size = "md",
  onDark = false,
  className = "",
}: Omit<CommonProps, "children">): string {
  return [base, sizes[size], variantClasses(variant, onDark), className]
    .filter(Boolean)
    .join(" ");
}

type ButtonLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

/** Internal hrefs go through next/link; external ones stay plain anchors. */
export function ButtonLink({
  href,
  variant,
  size,
  onDark,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const cls = buttonClassName({ variant, size, onDark, className });
  const isInternal = href.startsWith("/") && !href.startsWith("//");

  if (isInternal) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  );
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  variant,
  size,
  onDark,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, onDark, className })}
      {...rest}
    >
      {children}
    </button>
  );
}
