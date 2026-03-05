import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/content/site";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fb", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      {/* Admin top bar */}
      <header
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #1a2a4a 100%)",
          borderBottom: "3px solid #d4af37",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Left: branding */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt={`${site.name} Logo`}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "9px",
              objectFit: "contain",
              background: "rgba(255,255,255,0.1)",
            }}
          />
          <div>
            <span style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.9375rem", display: "block", lineHeight: 1.2 }}>
              {site.name}
            </span>
            <span
              style={{
                color: "#d4af37",
                fontSize: "0.6875rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Admin Panel
            </span>
          </div>
        </div>

        {/* Right: nav links + logout */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {[
            { href: "/admin", label: "Dashboard" },
            { href: "/admin/notices", label: "Notices" },
            { href: "/admin/events", label: "Events" },
            { href: "/admin/staff", label: "Staff" },
            { href: "/admin/courses", label: "Courses" },
            { href: "/admin/messages", label: "Messages" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                padding: "0.375rem 0.625rem",
                borderRadius: "6px",
                textDecoration: "none",
                transition: "background 0.15s, color 0.15s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)";
              }}
            >
              {label}
            </Link>
          ))}

          <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.15)", margin: "0 0.25rem" }} />

          <a
            href="/api/admin/logout"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.4rem 0.875rem",
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.35)",
              borderRadius: "7px",
              color: "rgba(239,100,100,1)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "background 0.15s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(239,68,68,0.28)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(239,68,68,0.15)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </a>
        </div>
      </header>

      {/* Page content */}
      <main style={{ maxWidth: "1152px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
        {children}
      </main>
    </div>
  );
}

