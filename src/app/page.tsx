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

export default async function HomePage() {
  let latestNotices: any[] = [];
  let staffCount: number = 0;
  let featuredStaff: any[] = [];
  let courses: any[] = [];

  try {
    const allNotices = await prisma.notice.findMany();
    latestNotices = allNotices
      .sort((a: any, b: any) => b.dateISO.localeCompare(a.dateISO))
      .slice(0, 3);

    staffCount = await prisma.staff.count();
    featuredStaff = await prisma.staff.findMany({ take: 4 });
    courses = await prisma.course.findMany({ take: 6 });
  } catch (error) {
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
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur">
            <span>{site.location}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            {site.fullName}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
            Empowering students with quality education in the heart of Bajhang, Nepal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/admissions/apply"
              className="px-8 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors shadow-lg"
            >
              Apply Now
            </Link>
            <Link
              href="/courses"
              className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/30 backdrop-blur"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/10 text-indigo-900 mb-3">
              Why Choose Us
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Excellence in Education
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Jaya Prithivi Campus is committed to academic excellence and holistic student development.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🎓", title: "Quality Education", desc: "Affiliated with Tribhuvan University and NEB with modern curriculum." },
              { icon: "👩‍🏫", title: "Expert Faculty", desc: "Experienced and dedicated teaching staff committed to student success." },
              { icon: "📚", title: "Rich Library", desc: "Well-stocked library with thousands of books and digital resources." },
              { icon: "🏛️", title: "Modern Campus", desc: "State-of-the-art facilities designed for learning and growth." },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white rounded-xl p-8 border border-gray-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <div className="text-lg font-bold text-indigo-900 mb-2">{feature.title}</div>
                <div className="text-sm text-gray-600">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSION CTA SECTION */}
      <section className="py-20 bg-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white mb-4">
            Start Your Academic Journey Today
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Ready to take the next step? Apply now or contact our admissions team for more information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions/apply"
              className="px-8 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors shadow-lg text-lg"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-violet-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg text-lg"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>

      {/* COLLEGE STATISTICS SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/10 text-indigo-900 mb-3">
              Campus Achievements
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              College Statistics
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "5000+", label: "Students", icon: "🎓" },
              { value: "150+", label: "Faculty", icon: "👩‍🏫" },
              { value: "40+", label: "Programs", icon: "📚" },
              { value: "25+", label: "Years of Excellence", icon: "🏛️" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center shadow-lg bg-white rounded-xl p-8">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-extrabold text-indigo-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      {courses.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-600/10 text-indigo-900 mb-3">
                Our Programs
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
                Featured Courses
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {courses.map((course: any) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-indigo-900">{course.title}</CardTitle>
                    {course.description && (
                      <CardDescription>{course.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Link href="/courses" className="text-sm text-violet-600 font-semibold hover:underline">
                      Learn more →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/courses" className="px-6 py-3 bg-indigo-900 text-white font-semibold rounded-lg hover:bg-indigo-800 transition-colors">
                View All Programs
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CAMPUS LIFE GALLERY SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/10 text-indigo-900 mb-3">
              Campus Life
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Campus Life Gallery
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Experience vibrant student life, events, and activities at Jaya Prithivi Campus.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { img: "https://images.unsplash.com/photo-1464983953574-0892a7162a1e?auto=format&fit=crop&w=800&q=80", alt: "Students", caption: "Students" },
              { img: "https://images.unsplash.com/photo-1503676382389-2d6b7b8dd0c0?auto=format&fit=crop&w=800&q=80", alt: "Events", caption: "Events" },
              { img: "https://images.unsplash.com/photo-1517520287167-4bbf64a7c7d4?auto=format&fit=crop&w=800&q=80", alt: "Campus Environment", caption: "Campus Environment" },
              { img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80", alt: "Activities", caption: "Activities" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden group shadow-lg">
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

      {/* NOTICES SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-600/10 text-indigo-900 mb-3">
              Notices & Announcements
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Latest Campus Notices
            </h2>
          </div>
          {latestNotices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestNotices.map((n: any) => (
                <div key={n.id} className="bg-white shadow-lg rounded-xl p-8 flex flex-col border border-gray-100">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {n.category ? (
                      <Badge className="bg-indigo-900/10 text-indigo-900 border-none">{n.category}</Badge>
                    ) : null}
                    <span className="text-xs font-bold text-gray-500">{formatDate(n.dateISO)}</span>
                  </div>
                  <div className="text-lg font-bold text-indigo-900 mb-2">{n.title}</div>
                  {n.summary ? (
                    <div className="text-sm text-gray-600 mb-4">{n.summary}</div>
                  ) : null}
                  <Link
                    href="/notices"
                    className="mt-auto inline-block px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">No notices yet. Check back soon!</div>
          )}
          <div className="text-center mt-8">
            <Link href="/notices" className="px-6 py-3 bg-indigo-900 text-white font-semibold rounded-lg hover:bg-indigo-800 transition-colors">
              View All Notices
            </Link>
          </div>
        </div>
      </section>

      {/* FACULTY SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-600/10 text-indigo-900 mb-3">
              Faculty & Staff
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Meet Our Faculty
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our dedicated faculty and staff are committed to student success and academic excellence.
            </p>
          </div>
          {featuredStaff.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredStaff.map((s: any) => (
                <div key={s.id} className="flex flex-col items-center text-center shadow-lg bg-white rounded-xl p-8">
                  <div className="w-20 h-20 rounded-full bg-indigo-900 flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {s.name.charAt(0)}
                  </div>
                  <div className="text-lg font-bold text-indigo-900 mb-1">{s.name}</div>
                  <div className="text-sm text-violet-600 mb-1">{s.department || s.role}</div>
                  <div className="text-sm text-gray-500">{s.qualification || ""}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">Faculty profiles coming soon.</div>
          )}
          <div className="text-center mt-8">
            <Link href="/staff" className="px-6 py-3 bg-indigo-900 text-white font-semibold rounded-lg hover:bg-indigo-800 transition-colors">
              View All Faculty
            </Link>
          </div>
        </div>
      </section>

      <Chatbot />
    </div>
  );
}
