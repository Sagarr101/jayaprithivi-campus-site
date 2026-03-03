import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { site } from "@/content/site";
import { staffMembers, type StaffMember } from "@/content/staff";

export const metadata: Metadata = {
  title: "Staff",
  description: `Campus staff and faculty of ${site.fullName}.`,
};

function groupBy<T extends string>(
  items: StaffMember[],
  key: (x: StaffMember) => T,
): Array<{ group: T; items: StaffMember[] }> {
  const map = new Map<T, StaffMember[]>();
  for (const i of items) {
    const k = key(i);
    const arr = map.get(k) ?? [];
    arr.push(i);
    map.set(k, arr);
  }
  return [...map.entries()].map(([group, items]) => ({ group, items }));
}

export default function StaffPage() {
  const groups = groupBy(staffMembers, (s) => s.role);

  return (
    <div>
      <PageHeader
        title="Campus staff"
        description="Academic, administration, and support staff."
      />

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4">
          {groups.map((g) => (
            <Card key={g.group}>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle className="text-base">{g.group}</CardTitle>
                <Badge>{g.items.length}</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {g.items.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-2xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="text-sm font-semibold">{s.name}</div>
                      <div className="mt-1 text-xs text-black/60 dark:text-white/60">
                        {s.department ? `Department: ${s.department}` : "Department: —"}
                      </div>
                      <div className="mt-1 text-xs text-black/60 dark:text-white/60">
                        {s.qualification ? `Qualification: ${s.qualification}` : "Qualification: —"}
                      </div>
                      <div className="mt-3 grid gap-1 text-xs text-black/70 dark:text-white/70">
                        {s.email ? (
                          <a className="hover:underline underline-offset-4" href={`mailto:${s.email}`}>
                            {s.email}
                          </a>
                        ) : null}
                        {s.phone ? <div>{s.phone}</div> : null}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

