import type { Metadata } from "next";

import { site } from "@/content/site";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Faculty & Staff",
  description: `Meet the faculty and staff of ${site.fullName}.`,
};

export default async function StaffPage() {
  const staff = await prisma.staff.findMany({ orderBy: { name: "asc" } });

  const grouped = staff.reduce(
    (acc, s) => {
      const key = s.position ?? "Other";
      if (!acc[key]) acc[key] = [];
      acc[key].push(s);
      return acc;
    },
    {} as Record<string, typeof staff>
  );

  return (
    <div>
      {/* Page Hero */}
      <div className="bg-[color:var(--primary)] text-white py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--accent)]/20 text-[color:var(--accent)] mb-4">
            Our Team
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Faculty & Staff
          </h1>
          <p className="mt-4 text-white/75 text-lg max-w-2xl">
            Meet the dedicated educators and professionals committed to your academic and personal growth.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16">
        {staff.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">👩‍🏫</div>
            <h3 className="text-xl font-semibold mb-2">No staff added yet</h3>
            <p className="text-black/60 dark:text-white/60">
              Staff and faculty members will appear here once added via the admin panel.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(grouped).map(([role, members]) => (
              <div key={role}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold">{role}</h2>
                  <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                  <span className="text-sm text-black/60 dark:text-white/60">{members.length} member{members.length !== 1 ? "s" : ""}</span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {members.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all group hover:border-[color:var(--accent)]"
                    >
                      <div className="w-14 h-14 rounded-full bg-[color:var(--primary)] text-[color:var(--accent)] flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
                        {s.name.charAt(0)}
                      </div>
                      <div className="font-bold text-[color:var(--primary)] dark:text-white">{s.name}</div>
                      {s.department && (
                        <div className="text-xs text-[color:var(--accent)] font-medium mt-0.5">{s.department}</div>
                      )}
                      <div className="mt-3 space-y-1">
                        {s.email && (
                          <a
                            className="block text-xs text-[color:var(--primary)] dark:text-[color:var(--accent)] hover:underline underline-offset-4 truncate"
                            href={`mailto:${s.email}`}
                          >
                            ✉ {s.email}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
