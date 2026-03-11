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
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-violet-600 text-white mb-4">
            Announcements
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Notices & Announcements
          </h1>
          <p className="mt-4 text-white text-lg font-bold max-w-2xl mx-auto">
            Stay up to date with official notices, exam schedules, holiday announcements, and admission updates.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-20 bg-gray-50">
        {notices.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-2xl font-extrabold mb-2">More notices coming soon</h3>
            <p className="text-gray-700 font-bold">Check back soon for the latest updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {notices.map((n) => (
              <div
                key={n.id}
                className="card shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white rounded-xl p-8 flex flex-col"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {n.category && (
                    <Badge className="bg-indigo-900/10 text-indigo-900 border-none">
                      {n.category}
                    </Badge>
                  )}
                  <span className="text-xs font-bold text-gray-500">
                    {formatDate(n.createdAt.toISOString().slice(0, 10))}
                  </span>
                </div>
                <div className="card-title mb-2 text-base font-bold text-indigo-900">
                  {n.title}
                </div>
                <div className="card-desc card-secondary mb-4 text-sm text-gray-700 leading-7 line-clamp-4">
                  {n.content}
                </div>
                <a
                  href={`/notices/${n.id}`}
                  className="btn bg-violet-600 text-white hover:bg-violet-700 rounded-lg mt-auto text-center font-bold transition-all"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
