import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { events } from "@/content/events";
import { site } from "@/content/site";
import { formatDate } from "@/lib/date";

export const metadata: Metadata = {
  title: "Events",
  description: `Campus events and programs at ${site.fullName}.`,
};

export default function EventsPage() {
  const sorted = [...events].sort((a, b) => a.dateISO.localeCompare(b.dateISO));

  return (
    <div>
      <PageHeader
        title="Events"
        description="Upcoming events, workshops, sports and campus activities."
      />

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Event list</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {sorted.map((e) => (
                <div
                  key={e.id}
                  className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {e.type ? <Badge>{e.type}</Badge> : null}
                    <span className="text-xs text-black/60 dark:text-white/60">
                      {formatDate(e.dateISO)}
                      {e.time ? ` • ${e.time}` : ""}
                    </span>
                  </div>
                  <div className="mt-2 text-base font-semibold">{e.title}</div>
                  {e.location ? (
                    <div className="mt-1 text-sm text-black/70 dark:text-white/70">
                      Location: {e.location}
                    </div>
                  ) : null}
                  {e.description ? (
                    <div className="mt-2 text-sm leading-7 text-black/70 dark:text-white/70">
                      {e.description}
                    </div>
                  ) : null}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

