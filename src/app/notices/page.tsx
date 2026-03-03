import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { notices } from "@/content/notices";
import { site } from "@/content/site";
import { formatDate } from "@/lib/date";

export const metadata: Metadata = {
  title: "Notices",
  description: `Latest notices and announcements from ${site.fullName}.`,
};

export default function NoticesPage() {
  const sorted = [...notices].sort((a, b) => b.dateISO.localeCompare(a.dateISO));

  return (
    <div>
      <PageHeader
        title="Notices"
        description="Official notices, announcements and downloadable documents."
      />

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <Card>
          <CardHeader>
            <CardTitle>All notices</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {sorted.map((n) => (
              <div
                key={n.id}
                className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {n.category ? <Badge>{n.category}</Badge> : null}
                  <span className="text-xs text-black/60 dark:text-white/60">
                    {formatDate(n.dateISO)}
                  </span>
                  {n.fileUrl ? (
                    <a
                      className="ml-auto text-xs font-medium underline underline-offset-4 hover:no-underline"
                      href={n.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  ) : null}
                </div>
                <div className="mt-2 text-base font-semibold">{n.title}</div>
                {n.summary ? (
                  <div className="mt-1 text-sm text-black/70 dark:text-white/70">
                    {n.summary}
                  </div>
                ) : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

