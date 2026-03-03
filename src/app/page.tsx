import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { events } from "@/content/events";
import { notices } from "@/content/notices";
import { site } from "@/content/site";
import { staffMembers } from "@/content/staff";
import { formatDate } from "@/lib/date";

export default function Home() {
  const latestNotices = [...notices]
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
    .slice(0, 3);
  const upcomingEvents = [...events]
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO))
    .slice(0, 3);
  const featuredStaff = staffMembers.slice(0, 4);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_circle_at_20%_20%,color-mix(in_srgb,var(--primary)_20%,transparent),transparent_55%),radial-gradient(900px_circle_at_80%_10%,color-mix(in_srgb,var(--ring)_20%,transparent),transparent_55%)]" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-medium text-black/70 backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white/70">
              <span>{site.location}</span>
              <span className="text-black/30 dark:text-white/30">•</span>
              <a
                className="underline underline-offset-4 hover:no-underline"
                href={site.links.university}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.affiliation}
              </a>
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              {site.fullName}
            </h1>
            <p className="mt-4 text-base leading-7 text-black/70 dark:text-white/70">
              {site.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/admissions" size="lg">
                Admissions
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact us
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <Card className="p-5">
                <div className="text-sm font-medium text-black/70 dark:text-white/70">
                  Staff & faculty
                </div>
                <div className="mt-2 text-2xl font-semibold">
                  {staffMembers.length}+
                </div>
              </Card>
              <Card className="p-5">
                <div className="text-sm font-medium text-black/70 dark:text-white/70">
                  Notices
                </div>
                <div className="mt-2 text-2xl font-semibold">
                  {notices.length}+
                </div>
              </Card>
            </div>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Latest notices</CardTitle>
                <CardDescription>
                  Important updates for students and applicants.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {latestNotices.map((n) => (
                  <Link
                    key={n.id}
                    href="/notices"
                    className="rounded-xl border border-black/10 bg-white/60 p-4 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {n.category ? <Badge>{n.category}</Badge> : null}
                      <span className="text-xs text-black/60 dark:text-white/60">
                        {formatDate(n.dateISO)}
                      </span>
                    </div>
                    <div className="mt-2 text-sm font-semibold">{n.title}</div>
                    {n.summary ? (
                      <div className="mt-1 text-sm text-black/70 dark:text-white/70">
                        {n.summary}
                      </div>
                    ) : null}
                  </Link>
                ))}
                <div className="pt-2">
                  <Button href="/notices" variant="ghost">
                    View all notices
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming events</CardTitle>
                <CardDescription>Campus activities and programs.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {upcomingEvents.map((e) => (
                  <div
                    key={e.id}
                    className="rounded-xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {e.type ? <Badge>{e.type}</Badge> : null}
                      <span className="text-xs text-black/60 dark:text-white/60">
                        {formatDate(e.dateISO)}
                        {e.time ? ` • ${e.time}` : ""}
                      </span>
                    </div>
                    <div className="mt-2 text-sm font-semibold">{e.title}</div>
                    {e.location ? (
                      <div className="mt-1 text-sm text-black/70 dark:text-white/70">
                        {e.location}
                      </div>
                    ) : null}
                  </div>
                ))}
                <div className="pt-2">
                  <Button href="/events" variant="ghost">
                    View all events
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Our staff</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Academic, administration and support staff.
            </p>
          </div>
          <Button href="/staff" variant="secondary">
            View staff list
          </Button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredStaff.map((s) => (
            <Card key={s.id}>
              <CardHeader>
                <CardTitle className="text-base">{s.name}</CardTitle>
                <CardDescription>
                  {s.role}
                  {s.department ? ` • ${s.department}` : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-black/70 dark:text-white/70">
                  {s.qualification ? s.qualification : "Qualification: —"}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <Card className="overflow-hidden">
          <div className="grid gap-6 p-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">
                Admissions & information
              </h3>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                Learn about eligibility, required documents, fees, and how to apply.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="/admissions">Admission details</Button>
                <Button href="/contact" variant="secondary">
                  Ask a question
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_25%,transparent),transparent_40%),linear-gradient(45deg,color-mix(in_srgb,var(--ring)_25%,transparent),transparent_40%)] p-6 dark:border-white/10">
              <div className="text-sm font-semibold">Office</div>
              <div className="mt-2 text-sm text-black/70 dark:text-white/70">
                <div>{site.contact.address}</div>
                <div className="mt-1">
                  Phone: <span className="font-medium">{site.contact.phone}</span>
                </div>
                <div className="mt-1">
                  Email:{" "}
                  <a
                    className="font-medium underline underline-offset-4 hover:no-underline"
                    href={`mailto:${site.contact.email}`}
                  >
                    {site.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
