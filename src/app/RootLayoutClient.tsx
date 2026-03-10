"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <SiteHeader />
      <main className="min-h-[calc(100dvh-64px)]">{children}</main>
      <SiteFooter />
    </>
  );
}