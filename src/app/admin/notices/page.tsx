import { revalidatePath } from "next/cache";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";

async function createNotice(formData: FormData) {
  "use server";

  const title = String(formData.get("title") ?? "").trim();
  const dateISO = String(formData.get("dateISO") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim() || undefined;
  const summary = String(formData.get("summary") ?? "").trim() || undefined;

  if (!title || !dateISO) {
    return;
  }

  await prisma.notice.create({
    data: {
      title,
      dateISO,
      category,
      summary,
    },
  });

  revalidatePath("/admin/notices");
}

export default async function AdminNoticesPage() {
  const notices = await prisma.notice.findMany({
    orderBy: { dateISO: "desc" },
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Manage notices"
        description="Create simple text notices that also appear on the public site."
        className="px-0 pt-0"
      />

      <Card>
        <CardHeader>
          <CardTitle>Create notice</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createNotice} className="grid gap-4 md:grid-cols-2">
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
            <div className="grid gap-2 md:col-span-2">
              <label className="text-sm font-medium">Category (optional)</label>
              <input
                name="category"
                className="h-10 rounded-xl border border-black/10 bg-white/70 px-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5"
              />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label className="text-sm font-medium">Summary (optional)</label>
              <textarea
                name="summary"
                className="min-h-24 rounded-xl border border-black/10 bg-white/70 p-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5"
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Save notice</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing notices</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {notices.length === 0 ? (
            <div className="text-sm text-black/70 dark:text-white/70">
              No notices yet.
            </div>
          ) : (
            notices.map((n) => (
              <div
                key={n.id}
                className="rounded-2xl border border-black/10 bg-white/60 p-4 text-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="text-xs text-black/60 dark:text-white/60">
                  {n.dateISO} {n.category ? `• ${n.category}` : ""}
                </div>
                <div className="mt-1 font-semibold">{n.title}</div>
                {n.summary ? (
                  <div className="mt-1 text-black/70 dark:text-white/70">
                    {n.summary}
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

