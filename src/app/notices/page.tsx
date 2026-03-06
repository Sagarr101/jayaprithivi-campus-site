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
      <div className="bg-indigo-900 text-white py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-600 text-white mb-4">
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

      <section className="mx-auto max-w-6xl px-4 py-16 bg-gray-50">
        {notices.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">More notices coming soon</h3>
            <p className="text-gray-500">
              Check back soon for the latest updates.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {notices.map((n) => (
              <div
                key={n.id}
                className="bg-white shadow-lg rounded-xl p-6 group hover:shadow-md transition-all hover:border-violet-600 cursor-default"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {n.category ? (
                    <Badge className="bg-indigo-900/10 text-indigo-900 border-none">
                      {n.category}
                    </Badge>
                  ) : null}
                  <span className="text-xs text-gray-500">
                    {formatDate(n.createdAt.toISOString().slice(0, 10))}
                  </span>
                </div>
                <div className="text-base font-bold text-indigo-900 mb-1">
                  {n.title}
                </div>
                <div className="text-sm text-gray-700 leading-7">
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
