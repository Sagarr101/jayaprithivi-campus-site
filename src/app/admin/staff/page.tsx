import { revalidatePath } from "next/cache";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";

type Staff = Awaited<ReturnType<typeof prisma.staff.findMany>>[number];

async function createStaff(formData: FormData) {
  "use server";

  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const department = String(formData.get("department") ?? "").trim() || undefined;
  const qualification =
    String(formData.get("qualification") ?? "").trim() || undefined;
  const email = String(formData.get("email") ?? "").trim() || undefined;
  const phone = String(formData.get("phone") ?? "").trim() || undefined;

  if (!name || !role) {
    return;
  }

  await prisma.staff.create({
    data: {
      name,
      role,
      department,
      qualification,
      email,
      phone,
    },
  });

  revalidatePath("/admin/staff");
}

export default async function AdminStaffPage() {
  const staff = await prisma.staff.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Manage staff"
        description="Add and maintain the campus staff directory."
        className="px-0 pt-0"
      />

      <Card>
        <CardHeader>
          <CardTitle>Add staff member</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createStaff} className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Name *</label>
              <input
                name="name"
                className="h-10 rounded-xl border border-black/10 bg-white/70 px-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5"
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Role *</label>
              <input
                name="role"
                className="h-10 rounded-xl border border-black/10 bg-white/70 px-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5"
                placeholder="Campus Chief, Lecturer, Administration, etc."
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Department (optional)</label>
              <input
                name="department"
                className="h-10 rounded-xl border border-black/10 bg-white/70 px-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">
                Qualification (optional)
              </label>
              <input
                name="qualification"
                className="h-10 rounded-xl border border-black/10 bg-white/70 px-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email (optional)</label>
              <input
                name="email"
                className="h-10 rounded-xl border border-black/10 bg-white/70 px-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Phone (optional)</label>
              <input
                name="phone"
                className="h-10 rounded-xl border border-black/10 bg-white/70 px-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5"
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Save staff</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing staff</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {staff.length === 0 ? (
            <div className="text-sm text-black/70 dark:text-white/70">
              No staff added yet.
            </div>
          ) : (
            staff.map((s: Staff) => (
              <div
                key={s.id}
                className="rounded-2xl border border-black/10 bg-white/60 p-4 text-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="font-semibold">{s.name}</div>
                <div className="mt-1 text-xs text-black/60 dark:text-white/60">
                  {s.role}
                  {s.department ? ` • ${s.department}` : ""}
                </div>
                {s.qualification ? (
                  <div className="mt-1 text-xs text-black/60 dark:text-white/60">
                    {s.qualification}
                  </div>
                ) : null}
                {(s.email || s.phone) && (
                  <div className="mt-2 text-xs text-black/70 dark:text-white/70">
                    {s.email && (
                      <span>
                        {s.email}
                        {s.phone ? " • " : ""}
                      </span>
                    )}
                    {s.phone && <span>{s.phone}</span>}
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}