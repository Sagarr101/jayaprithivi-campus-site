"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { site } from "@/content/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-black/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt={`${site.name} Logo`}
            className="size-10 rounded-lg object-contain"
          />
          <div className="leading-tight">
            <div className="text-sm font-bold text-[color:var(--primary)] dark:text-white">{site.name}</div>
            <div className="text-xs text-black/60 dark:text-white/60">
              Affiliated to {site.affiliation}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-black/70 hover:bg-black/5 hover:text-black dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white",
                isActive(pathname, item.href) &&
                "bg-black/5 text-black dark:bg-white/10 dark:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-medium hover:bg-black/5 dark:border-white/10 dark:bg-black dark:hover:bg-white/10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-black/10 bg-white px-4 py-4 dark:border-white/10 dark:bg-black md:hidden"
        >
          <div className="mx-auto grid max-w-6xl gap-2">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium text-black/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/10",
                  isActive(pathname, item.href) &&
                  "bg-black/5 dark:bg-white/10",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

