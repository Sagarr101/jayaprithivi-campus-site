      {/* PRINCIPAL MESSAGE SECTION */}
      <section className="section bg-gray-50">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/10 text-indigo-900 mb-3">
              Leadership Message
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
              Message from the Principal
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10 bg-white shadow-lg rounded-xl p-8">
            <div className="flex-shrink-0 mb-6 md:mb-0">
              <img
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80"
                alt="Principal"
                className="w-40 h-40 rounded-full object-cover border-4 border-indigo-900 shadow-md"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-indigo-900 mb-4">Dr. Prithivi Bahadur Singh</h3>
              <p className="text-lg text-gray-700 mb-4">
                Welcome to Jaya Prithivi Campus. Our commitment is to provide quality education, foster innovation, and nurture leadership in every student. We believe in empowering our students to become responsible citizens and global leaders.
              </p>
              <p className="text-gray-500">
                "Education is the most powerful tool for transforming lives and communities. At Jaya Prithivi Campus, we strive to create an environment where every student can thrive, grow, and achieve their dreams."
              </p>
            </div>
          </div>
        </div>
      </section>
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
import Chatbot from "@/components/Chatbot";
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
      {/* HERO SECTION */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center bg-indigo-900">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
          alt="Campus View"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur">
            <span>{site.location}</span>
            <span className="text-white/30">2</span>
      {/* ADMISSION CALL-TO-ACTION SECTION */}
      <section className="section bg-indigo-900">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">
              Start Your Academic Journey Today
            </h2>
            <p className="text-lg text-white mb-8">
              Ready to take the next step? Apply now or contact our admissions team for more information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/admissions" className="btn bg-violet-600 text-white hover:bg-violet-700 rounded-lg text-lg font-semibold shadow-lg">
                Apply Now
              </Button>
              <Button href="/contact" className="btn bg-white text-violet-700 hover:bg-gray-100 rounded-lg text-lg font-semibold shadow-lg border border-white/20">
                Contact Admissions
              </Button>
            </div>
          </div>
        </div>
      </section>
                  {item.title}
                </div>
                <div className="mt-2 text-xl font-bold text-[color:var(--primary)] dark:text-white">
                  {item.value}
                </div>
              </Card>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE OUR CAMPUS */}
      <section className="section">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-600/10 text-indigo-900 mb-3">
              Why Choose Jaya Prithivi Campus
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
              Why Choose Our Campus
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover the advantages that make us a top choice for students seeking quality education and a vibrant campus life.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "👩‍🏫",
                title: "Experienced Faculty",
                desc: "Learn from highly qualified and dedicated educators who inspire academic excellence."
              },
              {
                icon: "🎓",
                title: "Quality Education",
                desc: "Benefit from a curriculum designed for holistic development and real-world skills."
              },
              {
                icon: "🏢",
                title: "Modern Learning Environment",
                desc: "Study in well-equipped classrooms, labs, and digital facilities for optimal learning."
              },
              {
                icon: "💼",
                title: "Student Support & Career Guidance",
                desc: "Get personalized support and guidance for your academic and professional journey."
              }
            ].map((feature, i) => (
              <div key={i} className="card group flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white rounded-xl p-8">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <div className="card-title mb-2">{feature.title}</div>
                <div className="card-desc card-secondary">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLEGE STATISTICS SECTION */}
      <section className="section bg-gray-50">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/10 text-indigo-900 mb-3">
              Campus Achievements
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
              College Statistics
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our campus is proud of its achievements and commitment to excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "5000+", label: "Students", icon: "🎓" },
              { value: "150+", label: "Faculty", icon: "👩‍🏫" },
              { value: "40+", label: "Programs", icon: "📚" },
              { value: "25+", label: "Years of Excellence", icon: "🏛️" },
            ].map((stat, i) => (
              <div key={i} className="card flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white rounded-xl p-8">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-extrabold text-indigo-900 mb-2">{stat.value}</div>
                <div className="card-desc card-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* CAMPUS LIFE GALLERY SECTION */}
        <section className="section bg-white">
          <div className="container mx-auto">
            <div className="mb-12 text-center">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/10 text-indigo-900 mb-3">
                Campus Life
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
                Campus Life Gallery
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Experience vibrant student life, events, and activities at Jaya Prithivi Campus.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  img: "https://images.unsplash.com/photo-1464983953574-0892a7162a1e?auto=format&fit=crop&w=800&q=80",
                  alt: "Students",
                  caption: "Students"
                },
                {
                  img: "https://images.unsplash.com/photo-1503676382389-2d6b7b8dd0c0?auto=format&fit=crop&w=800&q=80",
                  alt: "Events",
                  caption: "Events"
                },
                {
                  img: "https://images.unsplash.com/photo-1517520287167-4bbf64a7c7d4?auto=format&fit=crop&w=800&q=80",
                  alt: "Campus Environment",
                  caption: "Campus Environment"
                },
                {
                  img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
                  alt: "Activities",
                  caption: "Activities"
                }
              ].map((item, i) => (
                <div key={i} className="card p-0 overflow-hidden group">
                  <div className="relative h-64 w-full">
                    <img
                      src={item.img}
                      alt={item.alt}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                      <span className="text-white text-lg font-semibold drop-shadow">{item.caption}</span>
                    </div>
                  </div>
                </div>
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
                    {/* NOTICES / ANNOUNCEMENTS SECTION */}
                    <section className="section bg-white">
                      <div className="container mx-auto">
                        <div className="mb-12 text-center">
                          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-600/10 text-indigo-900 mb-3">
                            Notices & Announcements
                          </div>
                          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
                            Latest Campus Notices
                          </h2>
                          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            Stay up to date with important campus news, events, and announcements.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                          {latestNotices.map((n) => (
                            <div key={n.id} className="card shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white rounded-xl p-8 flex flex-col">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                {n.category ? <Badge className="bg-indigo-900/10 text-indigo-900 border-none">{n.category}</Badge> : null}
                                <span className="text-xs font-bold text-gray-500">{formatDate(n.dateISO)}</span>
                              </div>
                              <div className="card-title mb-2">{n.title}</div>
                              {n.summary ? (
                                <div className="card-desc card-secondary mb-4">{n.summary}</div>
                              ) : null}
                              <Button href="/notices" className="btn bg-violet-600 text-white hover:bg-violet-700 rounded-lg mt-auto">Read More</Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
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

      {/* FACULTY SECTION */}
      <section className="section bg-gray-50">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-600/10 text-indigo-900 mb-3">
              Faculty & Staff
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
              Meet Our Faculty
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our dedicated faculty and staff are committed to student success and academic excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredStaff.map((s) => (
              <div key={s.id} className="card flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white rounded-xl p-8">
                <div className="w-20 h-20 rounded-full bg-indigo-900 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {s.name.charAt(0)}
                </div>
                <div className="card-title mb-2">{s.name}</div>
                <div className="card-desc card-secondary mb-2">{s.department || s.role}</div>
                <div className="text-sm text-gray-500 mb-2">{s.qualification || "—"}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Chatbot />
    </div>
  );
}
