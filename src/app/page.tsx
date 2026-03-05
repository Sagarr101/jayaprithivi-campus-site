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
import { site } from "@/content/site";
import { formatDate } from "@/lib/date";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  let latestNotices: any[] = [];
  let upcomingEvents: any[] = [];
  let staffCount: number = 0;
  let featuredStaff: any[] = [];
  let allNotices: any[] = [];
  let allEvents: any[] = [];

  try {
    allNotices = await prisma.notice.findMany();
    latestNotices = allNotices
      .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
      .slice(0, 3);

    allEvents = await prisma.event.findMany();
    upcomingEvents = allEvents
      .sort((a, b) => a.dateISO.localeCompare(b.dateISO))
      .slice(0, 3);

    staffCount = await prisma.staff.count();
    featuredStaff = await prisma.staff.findMany({ take: 4 });
  } catch (error) {
    // Database connection failed - show empty state
    console.error("Database connection error:", error);
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-[color:var(--primary)] text-white">
        {/* Abstract background graphics */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_circle_at_20%_20%,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_55%),radial-gradient(900px_circle_at_80%_10%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_55%)] opacity-20" />

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:py-32 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur">
              <span>{site.location}</span>
              <span className="text-white/30">•</span>
              <a
                className="underline underline-offset-4 hover:no-underline text-[color:var(--accent)]"
                href={site.links.university}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.affiliation}
              </a>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl text-white">
              {site.fullName}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/80">
              {site.tagline}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/admissions" size="lg" className="bg-[color:var(--accent)] text-[color:var(--primary)] hover:bg-[color:var(--accent)]/90 font-bold border-none">
                Apply Now
              </Button>
              <Button href="/courses" variant="secondary" size="lg" className="bg-white/10 text-white hover:bg-white/20 border-white/20 border">
                Explore Programs
              </Button>
            </div>
          </div>

          <div className="hidden md:block relative h-full min-h-[400px] w-full rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
            {/* Displaying a placeholder for the campus image */}
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply z-10" />
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
              alt="Campus View"
              className="object-cover w-full h-full absolute inset-0"
            />
          </div>
        </div>
      </section>

      {/* Quick Information Bar */}
      <section className="-mt-10 relative z-20 mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Admissions Open", value: "2026 Batch", link: "/admissions" },
            { title: "Upcoming Events", value: `${allEvents.length}+ Events`, link: "/events" },
            { title: "Latest Notices", value: `${allNotices.length}+ Notices`, link: "/notices" },
            { title: "Campus News", value: "Updates", link: "/notices" },
          ].map((item, i) => (
            <Link key={i} href={item.link} className="block">
              <Card className="p-5 shadow-lg border-b-4 border-b-[color:var(--accent)] hover:-translate-y-1 transition-transform cursor-pointer h-full">
                <div className="text-sm font-medium text-black/70 dark:text-white/70">
                  {item.title}
                </div>
                <div className="mt-2 text-xl font-bold text-[color:var(--primary)] dark:text-white">
                  {item.value}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* About & Stats Section */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--accent)]/10 text-[color:var(--primary)] dark:text-[color:var(--accent)] mb-3">About Us</div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Shaping Futures in Bajhang Since 1995</h2>
            <p className="text-base leading-8 text-black/70 dark:text-white/70 mb-4">
              {site.fullName} is a constituent campus of Far Western University, located in Chainpur, Bajhang. For nearly three decades, we have been the cornerstone of higher education in the region, offering diverse undergraduate and postgraduate programs.
            </p>
            <p className="text-base leading-8 text-black/70 dark:text-white/70 mb-6">
              With a commitment to academic excellence, research, and community service, we empower students to become leaders and change-makers of tomorrow.
            </p>
            <Button href="/about" variant="outline">Learn More About Us</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "30+", label: "Years of Excellence", icon: "🏛️" },
              { value: "2000+", label: "Students Enrolled", icon: "🎓" },
              { value: `${staffCount}+`, label: "Faculty Members", icon: "👩‍🏫" },
              { value: "6+", label: "Programs Offered", icon: "📚" },
            ].map((stat, i) => (
              <Card key={i} className="p-6 text-center shadow-md hover:-translate-y-1 transition-transform border-none bg-gradient-to-br from-white to-[color:var(--muted)] dark:from-white/5 dark:to-white/[0.02]">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-2xl font-bold text-[color:var(--primary)] dark:text-[color:var(--accent)]">{stat.value}</div>
                <div className="mt-1 text-xs font-medium text-black/60 dark:text-white/60">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10">

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
                  <Button href="/notices" variant="outline" className="w-full">
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
                  <Button href="/events" variant="outline" className="w-full">
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
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--accent)]/10 text-[color:var(--primary)] dark:text-[color:var(--accent)] mb-3">Our Team</div>
            <h2 className="text-3xl font-bold tracking-tight">Faculty &amp; Staff</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              {staffCount}+ dedicated academic, administration and support staff.
            </p>
          </div>
          <Button href="/staff" variant="secondary">
            View all faculty
          </Button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredStaff.map((s) => (
            <Card key={s.id} className="hover:-translate-y-1 transition-transform border-t-4 border-t-[color:var(--primary)]">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[color:var(--primary)] text-white flex items-center justify-center text-lg font-bold mb-2">
                  {s.name.charAt(0)}
                </div>
                <CardTitle className="text-base">{s.name}</CardTitle>
                <CardDescription>
                  {s.role}
                  {s.department ? ` • ${s.department}` : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-black/70 dark:text-white/70">
                  {s.qualification ? s.qualification : "—"}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[color:var(--primary)] text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--accent)]/20 text-[color:var(--accent)] mb-4">Admissions 2026</div>
              <h3 className="text-3xl font-bold tracking-tight text-white">
                Begin Your Academic Journey
              </h3>
              <p className="mt-4 text-white/75 text-base leading-relaxed">
                Learn about eligibility, required documents, fees, and how to apply to Jayaprithivi Campus.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/admissions" className="bg-[color:var(--accent)] text-[color:var(--primary)] hover:bg-[color:var(--accent)]/90 font-bold border-none">Apply Now</Button>
                <Button href="/contact" className="bg-white/10 text-white hover:bg-white/20 border border-white/20">
                  Contact Admissions
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="text-xs font-semibold text-[color:var(--accent)] uppercase tracking-widest mb-4">Campus Office</div>
              <div className="space-y-3 text-white/80">
                <div className="flex items-start gap-3">
                  <span className="text-[color:var(--accent)] font-semibold min-w-[64px]">Address</span>
                  <span>{site.contact.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[color:var(--accent)] font-semibold min-w-[64px]">Phone</span>
                  <span>{site.contact.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[color:var(--accent)] font-semibold min-w-[64px]">Email</span>
                  <a className="hover:text-white transition-colors underline underline-offset-4" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
