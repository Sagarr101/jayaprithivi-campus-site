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
    <header className="sticky top-0 z-50 text-white" style={{ background: "linear-gradient(90deg, #0d9488 0%, #0f766e 100%)", borderBottom: "3px solid #f97316" }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt={`${site.name} Logo`}
            className="size-10 rounded-lg object-contain"
            style={{ background: "rgba(255,255,255,0.15)" }}
          />
          <div className="leading-tight">
            <div className="text-sm font-bold text-white">{site.name}</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
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
                "rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-all hover:text-white",
                isActive(pathname, item.href)
                  ? "text-white font-bold"
                  : ""
              )}
              style={
                isActive(pathname, item.href)
                  ? { background: "#f97316" }
                  : {}
              }
              onMouseEnter={e => {
                if (!isActive(pathname, item.href))
                  (e.currentTarget as HTMLElement).style.background = "rgba(249,115,22,0.25)";
              }}
              onMouseLeave={e => {
                if (!isActive(pathname, item.href))
                  (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-white md:hidden"
          style={{ background: "#f97316" }}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="px-4 py-4 md:hidden" style={{ background: "#0f766e" }}>
          <div className="mx-auto grid max-w-7xl gap-2">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-all",
                  isActive(pathname, item.href) && "text-white font-bold"
                )}
                style={isActive(pathname, item.href) ? { background: "#f97316" } : {}}
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
