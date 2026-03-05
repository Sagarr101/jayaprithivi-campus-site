"use client";

import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--primary)] text-white hover:bg-[color:color-mix(in_srgb,var(--primary)_85%,black)] focus-visible:ring-[color:var(--primary)]",
  secondary:
    "bg-[color:var(--muted)] text-[color:var(--foreground)] hover:bg-[color:color-mix(in_srgb,var(--muted)_85%,black)] focus-visible:ring-[color:var(--ring)]",
  ghost:
    "bg-transparent text-[color:var(--foreground)] hover:bg-[color:var(--muted)] focus-visible:ring-[color:var(--ring)]",
  outline:
    "border border-black/15 bg-transparent text-[color:var(--foreground)] hover:bg-[color:var(--muted)] focus-visible:ring-[color:var(--ring)] dark:border-white/15 dark:hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  ...props
}: (React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  href?: undefined;
}) | (React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  href: string;
})) {
  const cls = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <Link
        className={cls}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return (
    <button
      className={cls}
      type={(props as React.ButtonHTMLAttributes<HTMLButtonElement>).type ?? "button"}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}

