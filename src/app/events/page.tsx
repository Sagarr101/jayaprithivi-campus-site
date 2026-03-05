import type { Metadata } from "next";

import { Badge } from "@/components/ui/Badge";
import { site } from "@/content/site";
import { formatDate } from "@/lib/date";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Events",
  description: `Upcoming events and activities at ${site.fullName}.`,
};

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { dateISO: "asc" },
  });

  return (
    <div>
      {/* Page Hero */}
      <div className="bg-[color:var(--primary)] text-white py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--accent)]/20 text-[color:var(--accent)] mb-4">
            What&apos;s On
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Events & Programs
          </h1>
          <p className="mt-4 text-white/75 text-lg max-w-2xl">
            Find out about upcoming seminars, workshops, cultural events, and placement drives at Jayaprithivi Campus.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16">
        {events.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">No events scheduled</h3>
            <p className="text-black/60 dark:text-white/60">
              Check back soon for upcoming events.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {events.map((e) => (
              <div
                key={e.id}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all hover:border-[color:var(--accent)]"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {e.type ? (
                    <Badge className="bg-[color:var(--accent)]/10 text-[color:var(--primary)] dark:text-[color:var(--accent)] border-none">
                      {e.type}
                    </Badge>
                  ) : null}
                  <span className="text-xs text-black/60 dark:text-white/60">
                    {formatDate(e.dateISO)}
                    {e.time ? ` • ${e.time}` : ""}
                  </span>
                </div>
                <div className="text-lg font-bold text-[color:var(--primary)] dark:text-white mb-2">
                  {e.title}
                </div>
                {e.location ? (
                  <div className="flex items-center gap-1 text-sm text-[color:var(--accent)] font-medium mb-2">
                    <span>📍</span>
                    <span>{e.location}</span>
                  </div>
                ) : null}
                {e.description ? (
                  <div className="mt-2 text-sm leading-7 text-black/70 dark:text-white/70">
                    {e.description}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
