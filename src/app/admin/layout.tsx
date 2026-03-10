"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/queries", label: "Queries" },
  { href: "/admin/admissions", label: "Admissions" },
  { href: "/admin/notices", label: "Notices" },
  { href: "/admin/staff", label: "Staff" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/courses", label: "Courses" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/messages", label: "Messages" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f2f5" }}>

      {/* Sidebar */}
      <aside style={{
        width: "220px",
        minWidth: "220px",
        minHeight: "100vh",
        background: "#1e3a5f",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        zIndex: 20,
        boxShadow: "4px 0 24px rgba(0,0,0,0.2)",
      }}>

        {/* Profile */}
        <div style={{
          padding: "2rem 1.5rem 1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            overflow: "hidden",
            marginBottom: "0.75rem",
            border: "3px solid rgba(255,255,255,0.2)",
            flexShrink: 0,
          }}>
            <img
              src="/admin-photo.jpg"
              alt="Admin"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "1rem", margin: "0 0 0.25rem 0" }}>Admin</p>
          <p style={{ color: "#93c5fd", fontSize: "0.75rem", margin: 0 }}>admin@jayaprithivi.edu.np</p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "1.25rem 0.875rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} style={{
                display: "block",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: active ? 700 : 500,
                textDecoration: "none",
                color: active ? "#ffffff" : "#bfdbfe",
                background: active ? "rgba(255,255,255,0.15)" : "transparent",
                borderLeft: active ? "3px solid #38bdf8" : "3px solid transparent",
                transition: "all 0.15s",
              }}>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "1rem", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          <a href="/api/admin/logout" style={{
            display: "block",
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            fontSize: "0.9rem",
            fontWeight: 500,
            textDecoration: "none",
            color: "#fca5a5",
          }}>
            Logout
          </a>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Top Bar */}
        <header style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", margin: 0, textTransform: "capitalize" }}>
            {pathname?.split("/").pop()?.replace("-", " ") || "Dashboard"}
          </p>
          <div style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid #e2e8f0",
          }}>
            <img src="/admin-photo.jpg" alt="Admin" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}