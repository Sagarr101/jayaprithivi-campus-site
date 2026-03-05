import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.fullName} — our history, vision, mission, and the principal's message.`,
};

const milestones = [
  { year: "1995", event: "Campus established in Chainpur, Bajhang" },
  { year: "2005", event: "Affiliated with Far Western University" },
  { year: "2012", event: "Launched postgraduate programs" },
  { year: "2020", event: "New library building inaugurated" },
  { year: "2024", event: "Expanded science laboratories" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Page Hero */}
      <div className="bg-[color:var(--primary)] text-white py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--accent)]/20 text-[color:var(--accent)] mb-4">
            Est. 1995
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            About Jayaprithivi Campus
          </h1>
          <p className="mt-4 text-white/75 text-lg max-w-2xl">
            {site.fullName} is a leading academic institution in Bajhang, Nepal, committed to delivering quality education and shaping future leaders.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16">
        {/* Vision and Mission */}
        <div className="grid gap-6 md:grid-cols-2 mb-16">
          <Card className="border-t-4 border-t-[color:var(--primary)] shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-[color:var(--primary)] text-[color:var(--accent)] flex items-center justify-center text-2xl mb-3">
                🎯
              </div>
              <CardTitle className="text-xl font-bold">Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-black/75 dark:text-white/75">
              To be a premier institution of higher education that shapes ethical,
              innovative, and socially responsible leaders who contribute meaningfully
              to the development of Bajhang, Nepal, and beyond.
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-[color:var(--accent)] shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-[color:var(--accent)] text-[color:var(--primary)] flex items-center justify-center text-2xl mb-3">
                🚀
              </div>
              <CardTitle className="text-xl font-bold">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-black/75 dark:text-white/75">
              To provide accessible, high-quality education at the bachelor&apos;s and
              master&apos;s levels, foster research and critical thinking, build
              employable skills, and serve the community through academic excellence.
            </CardContent>
          </Card>
        </div>

        {/* College Overview */}
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          <div className="md:col-span-2">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--primary)]/10 text-[color:var(--primary)] dark:text-[color:var(--accent)] mb-3">
              Overview
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Our Institution</h2>
            <div className="space-y-4 text-base leading-8 text-black/75 dark:text-white/75">
              <p>
                {site.fullName} is a constituent campus situated in the scenic hills of Chainpur,
                Bajhang, in Sudurpashchim Province, Nepal. Affiliated with Far Western University,
                the campus has been a beacon of academic excellence for the region for nearly three decades.
              </p>
              <p>
                We offer a diverse range of undergraduate and postgraduate programs in Management,
                Education, Science, and Humanities, ensuring students have multiple pathways to
                their academic and professional aspirations.
              </p>
              <p>
                With a dedicated faculty team, modern facilities, and a student-centred approach,
                Jayaprithivi Campus is committed to empowering every student to reach their fullest potential.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: "Established", value: "1995" },
              { label: "Affiliation", value: site.affiliation },
              { label: "Location", value: "Chainpur, Bajhang" },
              { label: "Programs", value: "UG & PG" },
              { label: "Province", value: "Sudurpashchim" },
            ].map((item) => (
              <Card key={item.label} className="p-4">
                <div className="text-xs text-black/60 dark:text-white/60 uppercase tracking-wide">{item.label}</div>
                <div className="mt-1 font-semibold text-[color:var(--primary)] dark:text-white">{item.value}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Principal's Message */}
        <div className="mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--primary)]/10 text-[color:var(--primary)] dark:text-[color:var(--accent)] mb-3">
            Leadership
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-8">Principal&apos;s Message</h2>
          <Card className="border-l-4 border-l-[color:var(--accent)] shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 md:items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-[color:var(--primary)] text-[color:var(--accent)] flex items-center justify-center text-3xl font-bold">
                    P
                  </div>
                </div>
                <div>
                  <blockquote className="text-base leading-8 text-black/75 dark:text-white/75 italic">
                    &ldquo;At Jayaprithivi Campus, we believe education is the most powerful tool to transform
                    lives and communities. We are committed to nurturing not just academic excellence, but
                    also character, values, and a spirit of service. I invite all aspiring students to join
                    us in this journey of knowledge and growth. Together, we will build a brighter future
                    for ourselves and for Nepal.&rdquo;
                  </blockquote>
                  <div className="mt-4">
                    <div className="font-bold text-[color:var(--primary)] dark:text-white">The Principal</div>
                    <div className="text-sm text-black/60 dark:text-white/60">{site.fullName}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History Timeline */}
        <div>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--primary)]/10 text-[color:var(--primary)] dark:text-[color:var(--accent)] mb-3">
            Our Journey
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-8">History & Milestones</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[color:var(--primary)]/20 dark:bg-white/10" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={i} className="relative flex gap-6 items-start">
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-[color:var(--primary)] text-[color:var(--accent)] flex items-center justify-center text-sm font-bold">
                    {m.year}
                  </div>
                  <Card className="flex-1 shadow-sm">
                    <CardContent className="p-4 text-sm text-black/75 dark:text-white/75">{m.event}</CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
