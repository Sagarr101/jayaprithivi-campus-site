import type { Metadata } from "next";
import { site } from "@/content/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

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
      <div className="text-white py-20 px-4" style={{ background: "linear-gradient(120deg, #0d9488 0%, #f97316 100%)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
            Est. 1995
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            About Jayaprithivi Campus
          </h1>
          <p className="mt-4 text-white/90 text-lg max-w-2xl">
            {site.fullName} is a leading academic institution in Bajhang, Nepal, committed to delivering quality education and shaping future leaders.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16">
        {/* Vision and Mission */}
        <div className="grid gap-6 md:grid-cols-2 mb-16">
          <div className="rounded-2xl shadow-lg overflow-hidden border-t-4" style={{ borderTopColor: "#0d9488" }}>
            <div className="p-8 bg-white">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: "#f0fdfa" }}>
                🎯
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#0f172a" }}>Our Vision</h3>
              <p className="text-sm leading-7 text-gray-600">
                To be a premier institution of higher education that shapes ethical,
                innovative, and socially responsible leaders who contribute meaningfully
                to the development of Bajhang, Nepal, and beyond.
              </p>
            </div>
          </div>
          <div className="rounded-2xl shadow-lg overflow-hidden border-t-4" style={{ borderTopColor: "#f97316" }}>
            <div className="p-8 bg-white">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: "#fff7ed" }}>
                🚀
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#0f172a" }}>Our Mission</h3>
              <p className="text-sm leading-7 text-gray-600">
                To provide accessible, high-quality education at the bachelor&apos;s and
                master&apos;s levels, foster research and critical thinking, build
                employable skills, and serve the community through academic excellence.
              </p>
            </div>
          </div>
        </div>

        {/* College Overview */}
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          <div className="md:col-span-2">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: "#f0fdfa", color: "#0d9488" }}>
              Overview
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-6" style={{ color: "#0f172a" }}>Our Institution</h2>
            <div className="space-y-4 text-base leading-8 text-gray-600">
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
              <div key={item.label} className="p-4 rounded-xl bg-white shadow-sm border-l-4" style={{ borderLeftColor: "#0d9488" }}>
                <div className="text-xs uppercase tracking-wide text-gray-400">{item.label}</div>
                <div className="mt-1 font-bold" style={{ color: "#0d9488" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Principal's Message */}
        <div className="mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: "#fff7ed", color: "#f97316" }}>
            Leadership
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8" style={{ color: "#0f172a" }}>Campus Chief&apos;s Message</h2>
          <div className="rounded-2xl shadow-lg overflow-hidden border-l-4" style={{ borderLeftColor: "#f97316" }}>
            <div className="p-8 bg-white">
              <div className="flex flex-col md:flex-row gap-8 md:items-start">
                <div className="flex-shrink-0">
                  <img
                    src="/campus-chief.jpg"
                    alt="Campus Chief Dirgha Raj Pandit"
                    className="w-24 h-24 rounded-full object-cover"
                    style={{ border: "3px solid #f97316" }}
                  />
                </div>
                <div>
                  <blockquote className="text-base leading-8 text-gray-600 italic mb-4">
                    &ldquo;At Jayaprithivi Campus, we believe education is the most powerful tool to transform
                    lives and communities. We are committed to nurturing not just academic excellence, but
                    also character, values, and a spirit of service. I invite all aspiring students to join
                    us in this journey of knowledge and growth. Together, we will build a brighter future
                    for ourselves and for Nepal.&rdquo;
                  </blockquote>
                  <div className="font-bold" style={{ color: "#0d9488" }}>Dirgha Raj Pandit</div>
                  <div className="text-sm text-gray-400">Campus Chief, {site.fullName}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History Timeline */}
        <div>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: "#f0fdfa", color: "#0d9488" }}>
            Our Journey
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8" style={{ color: "#0f172a" }}>History & Milestones</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5" style={{ background: "#0d9488", opacity: 0.2 }} />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={i} className="relative flex gap-6 items-start">
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: i % 2 === 0 ? "#0d9488" : "#f97316" }}>
                    {m.year}
                  </div>
                  <div className="flex-1 rounded-xl bg-white shadow-sm p-4 border-l-2" style={{ borderLeftColor: i % 2 === 0 ? "#0d9488" : "#f97316" }}>
                    <p className="text-sm text-gray-600">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
