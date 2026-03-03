import { revalidatePath } from "next/cache";
import type { Event } from "@prisma/client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";

async function createEvent(formData: FormData) {
  "use server";

  const title = String(formData.get("title") ?? "").trim();
  const dateISO = String(formData.get("dateISO") ?? "").trim();
  const time = String(formData.get("time") ?? "").trim() || undefined;
  const location = String(formData.get("location") ?? "").trim() || undefined;
  const type = String(formData.get("type") ?? "").trim() || undefined;
  const description =
    String(formData.get("description") ?? "").trim() || undefined;

  if (!title || !dateISO) {
    return;
  }

  await prisma.event.create({
    data: {
      title,
      dateISO,
      time,
      location,
      type,
      description,
    },
  });

  revalidatePath("/admin/events");
}

export default async function AdminEventsPage() {
  const events: Event[] = await prisma.event.findMany({
    orderBy: { dateISO: "asc" },
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Manage events"
        description="Create and manage campus events."
        className="px-0 pt-0"
      />

      <Card>
        <CardHeader>
          <CardTitle>Create event</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createEvent} className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Title *</label>
              <input
                name="title"
                className="h-10 rounded-xl border border-black/10 bg-white/70 px-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5"
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Date (YYYY-MM-DD) *</label>
              <input
                name="dateISO"
                type="date"
                className="h-10 rounded-xl border border-black/10 bg-white/70 px-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5"
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Time (optional)</label>
              <input
                name="time"
                className="h-10 rounded-xl border border-black/10 bg-white/70 px-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Location (optional)</label>
              <input
                name="location"
                className="h-10 rounded-xl border border-black/10 bg-white/70 px-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5"
              />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label className="text-sm font-medium">Type (optional)</label>
              <input
                name="type"
                className="h-10 rounded-xl border border-black/10 bg-white/70 px-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5"
              />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label className="text-sm font-medium">
                Description (optional)
              </label>
              <textarea
                name="description"
                className="min-h-24 rounded-xl border border-black/10 bg-white/70 p-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5"
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Save event</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing events</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {events.length === 0 ? (
            <div className="text-sm text-black/70 dark:text-white/70">
              No events yet.
            </div>
          ) : (
            events.map((e: Event) => (
              <div
                key={e.id}
                className="rounded-2xl border border-black/10 bg-white/60 p-4 text-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="text-xs text-black/60 dark:text-white/60">
                  {e.dateISO} {e.time ? `• ${e.time}` : ""}{" "}
                  {e.type ? `• ${e.type}` : ""}
                </div>
                <div className="mt-1 font-semibold">{e.title}</div>
                {e.location ? (
                  <div className="mt-1 text-black/70 dark:text-white/70">
                    {e.location}
                  </div>
                ) : null}
                {e.description ? (
                  <div className="mt-1 text-black/70 dark:text-white/70">
                    {e.description}
                  </div>
                ) : null}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

