import type { Metadata } from "next";

import { Badge } from "@/components/ui/Badge";
import { site } from "@/content/site";
import { formatDate } from "@/lib/date";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Notices",
  description: `Latest notices and announcements from ${site.fullName}.`,
};

export default async function NoticesPage() {
  const notices = await prisma.notice.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* Page Hero */}
      <div className="bg-[color:var(--primary)] text-white py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--accent)]/20 text-[color:var(--accent)] mb-4">
            Announcements
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Notices & Announcements
          </h1>
          <p className="mt-4 text-white/75 text-lg max-w-2xl">
            Stay up to date with official notices, exam schedules, holiday
            announcements, and admission updates.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16">
        {notices.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">More notices coming soon</h3>
            <p className="text-black/60 dark:text-white/60">
              Check back soon for the latest updates.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {notices.map((n) => (
              <div
                key={n.id}
                className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm hover:shadow-md transition-all hover:border-[color:var(--accent)] cursor-default"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {n.category ? (
                    <Badge className="bg-[color:var(--primary)]/10 text-[color:var(--primary)] dark:text-white border-none">
                      {n.category}
                    </Badge>
                  ) : null}
                  <span className="text-xs text-black/60 dark:text-white/60">
                    {formatDate(n.createdAt.toISOString().slice(0, 10))}
                  </span>
                </div>
                <div className="text-base font-bold text-[color:var(--primary)] dark:text-white mb-1">
                  {n.title}
                </div>
                <div className="text-sm text-black/70 dark:text-white/70 leading-7">
                  {n.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
