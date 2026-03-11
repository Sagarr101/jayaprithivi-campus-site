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
    latestNotices = await prisma.notice.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
    });

    staffCount = await prisma.staff.count();
    featuredStaff = await prisma.staff.findMany({ take: 4 });
    courses = await prisma.course.findMany({ take: 6 });
  } catch (error) {
    console.error("Database connection error:", error);
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>

      {/* HERO SECTION */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/jaya-prithvi.png')",
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(120deg, rgba(0,128,128,0.82) 0%, rgba(234,88,12,0.72) 100%)" }}
        />
        <div className="absolute top-10 right-20 w-64 h-64 rounded-full z-10 opacity-10" style={{ background: "#f97316", filter: "blur(40px)" }} />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full z-10 opacity-10" style={{ background: "#0d9488", filter: "blur(30px)" }} />

        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-white uppercase tracking-widest" style={{ background: "rgba(249,115,22,0.85)", letterSpacing: "0.15em" }}>
            🙏 In Loving Memory
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg" style={{ lineHeight: 1.1 }}>
            Late Jaya Prithvi<br />
            <span style={{ color: "#fcd34d" }}>Bahadur Singh</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-2 font-medium">
            A visionary leader, reformer, and champion of education in Nepal.
          </p>
          <p className="text-base text-white/80 max-w-2xl mb-10">
            Jayaprithivi Multiple Campus is proudly named in his honour, carrying forward his legacy of knowledge, justice, and service to the people of Bajhang and Nepal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/admissions/apply"
              className="px-8 py-3 font-bold rounded-full shadow-lg text-white transition-all hover:scale-105"
              style={{ background: "#f97316", fontSize: "1rem" }}
            >
              Apply Now →
            </Link>
            <Link
              href="/courses"
              className="px-8 py-3 font-bold rounded-full border-2 border-white text-white transition-all hover:bg-white hover:text-teal-700"
              style={{ fontSize: "1rem" }}
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="py-0 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 -mt-10 relative z-30">
            {[
              { icon: "🎓", title: "Quality Education", desc: "Affiliated with Far Western University with modern curriculum." },
              { icon: "👩‍🏫", title: "Expert Faculty", desc: "Experienced teachers committed to student success." },
              { icon: "📚", title: "Rich Library", desc: "Thousands of books and digital resources." },
              { icon: "🏛️", title: "Modern Campus", desc: "State-of-the-art facilities for learning." },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-white shadow-xl border-t-4 hover:shadow-2xl transition-shadow"
                style={{ borderTopColor: i % 2 === 0 ? "#f97316" : "#0d9488" }}>
                <div className="text-4xl mb-3">{feature.icon}</div>
                <div className="text-base font-bold mb-1" style={{ color: "#1e293b" }}>{feature.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / WELCOME SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: "#fff7ed", color: "#f97316" }}>
                ✦ Welcome to {site.fullName}
              </div>
              <h2 className="text-4xl font-extrabold mb-6" style={{ color: "#0f172a", lineHeight: 1.2 }}>
                Our Education System<br />
                <span style={{ color: "#f97316" }}>Inspires</span> You More.
              </h2>
              <p className="text-gray-600 leading-8 mb-6">
                {site.fullName} is a leading academic institution in Chainpur, Bajhang, Sudurpashchim Province, Nepal. Affiliated with Far Western University, we have been a beacon of academic excellence for nearly three decades.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "🎯", title: "Education Services", desc: "Diverse undergraduate and postgraduate programs in Management, Education, Science, and Humanities." },
                  { icon: "🌏", title: "Community Impact", desc: "Shaping ethical, innovative, and socially responsible leaders for Nepal and beyond." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg" style={{ background: "#f0fdfa", border: "2px solid #0d9488" }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-bold text-sm" style={{ color: "#0f172a" }}>{item.title}</div>
                      <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-4">
                <Link href="/about" className="px-6 py-3 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity" style={{ background: "#f97316" }}>
                  Discover More →
                </Link>
                <a href="tel:+977" className="px-6 py-3 rounded-full font-bold text-sm border-2 hover:bg-gray-50 transition-colors" style={{ borderColor: "#0d9488", color: "#0d9488" }}>
                  📞 Contact Us
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                  <img src="/gallery/WhatsApp Image 2026-03-10 at 12.54.27 AM.jpeg" alt="Campus" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-48 mt-8">
                  <img src="/gallery/WhatsApp Image 2026-03-10 at 12.54.26 AM.jpeg" alt="Students" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                  <img src="/gallery/WhatsApp Image 2026-03-10 at 12.54.28 AM.jpeg" alt="Learning" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-48 mt-8">
                  <img src="/gallery/WhatsApp Image 2026-03-10 at 12.54.27 AM (1).jpeg" alt="Conference" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Years badge */}
              <div className="absolute bottom-4 left-4 rounded-2xl p-4 shadow-xl text-white text-center" style={{ background: "#f97316" }}>
                <div className="text-3xl font-extrabold">25+</div>
                <div className="text-xs font-semibold">Years of<br />Quality Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="py-20" style={{ background: "#0d9488" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "5000+", label: "Total Students", icon: "🎓" },
              { value: "150+", label: "Skilled Lecturers", icon: "👩‍🏫" },
              { value: "40+", label: "Programs", icon: "📚" },
              { value: "25+", label: "Win Awards", icon: "🏆" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm font-medium">+ {stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      {courses.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3" style={{ background: "#fff7ed", color: "#f97316" }}>
                ✦ Our Programs
              </div>
              <h2 className="text-4xl font-extrabold mb-2" style={{ color: "#0f172a" }}>
                Let&apos;s Check Our <span style={{ color: "#f97316" }}>Courses</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {courses.map((course: any) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border-b-4" style={{ borderBottomColor: "#f97316" }}>
                  <div className="h-3 w-full" style={{ background: "linear-gradient(90deg, #0d9488, #f97316)" }} />
                  <div className="p-6">
                    <div className="font-bold text-lg mb-2" style={{ color: "#0f172a" }}>{course.title}</div>
                    {course.description && <div className="text-sm text-gray-500 mb-4">{course.description}</div>}
                    <Link href="/courses" className="text-sm font-bold hover:underline" style={{ color: "#f97316" }}>
                      Learn more →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/courses" className="px-8 py-3 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity" style={{ background: "#f97316" }}>
                View All Programs →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CAMPUS CHIEF MESSAGE */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3" style={{ background: "#f0fdfa", color: "#0d9488" }}>
              ✦ Leadership
            </div>
            <h2 className="text-4xl font-extrabold" style={{ color: "#0f172a" }}>
              Message by <span style={{ color: "#f97316" }}>Campus Chief</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl" style={{ border: "2px solid #f0fdfa" }}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 flex-shrink-0 relative">
                <img
                  src="/campus-chief.jpg"
                  alt="Campus Chief Dirgha Raj Pandit"
                  className="w-full h-full object-cover object-center min-h-[320px]"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 text-white text-center" style={{ background: "linear-gradient(to top, rgba(13,148,136,0.95), transparent)" }}>
                  <div className="font-bold text-lg">Dirgha Raj Pandit</div>
                  <div className="text-xs opacity-90">Campus Chief</div>
                </div>
              </div>
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center" style={{ background: "#f8fafc" }}>
                <div className="text-6xl mb-4" style={{ color: "#f97316", lineHeight: 1 }}>&ldquo;</div>
                <blockquote className="text-base leading-8 text-gray-700 italic mb-6">
                  At Jayaprithivi Campus, we are dedicated to nurturing the potential of every student through quality education, strong values, and a spirit of community. Our goal is to create graduates who are not only academically excellent but also responsible citizens who contribute positively to society. I warmly welcome all aspiring students to be part of our growing family.
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-1 rounded-full" style={{ background: "#f97316" }} />
                  <div>
                    <div className="font-extrabold" style={{ color: "#0f172a" }}>Dirgha Raj Pandit</div>
                    <div className="text-xs" style={{ color: "#0d9488" }}>Campus Chief, {site.fullName}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOTICES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3" style={{ background: "#fff7ed", color: "#f97316" }}>
              ✦ Notices & Announcements
            </div>
            <h2 className="text-4xl font-extrabold" style={{ color: "#0f172a" }}>
              Latest <span style={{ color: "#f97316" }}>Campus Notices</span>
            </h2>
          </div>
          {latestNotices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestNotices.map((n: any) => (
                <div key={n.id} className="bg-white shadow-md rounded-2xl p-6 flex flex-col border-l-4 hover:shadow-xl transition-shadow" style={{ borderLeftColor: "#0d9488" }}>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {n.category && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#f0fdfa", color: "#0d9488" }}>{n.category}</span>
                    )}
                    <span className="text-xs font-bold text-gray-400">
                      {formatDate(n.createdAt.toISOString().slice(0, 10))}
                    </span>
                  </div>
                  <div className="text-base font-bold mb-2" style={{ color: "#0f172a" }}>{n.title}</div>
                  {n.content && (
                    <div className="text-sm text-gray-500 mb-4 flex-1 line-clamp-3">{n.content}</div>
                  )}
                  <Link href="/notices" className="mt-auto inline-block px-4 py-2 rounded-full text-white text-sm font-bold text-center hover:opacity-90 transition-opacity" style={{ background: "#f97316" }}>
                    Read More →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">No notices yet. Check back soon!</div>
          )}
          <div className="text-center mt-10">
            <Link href="/notices" className="px-8 py-3 rounded-full font-bold text-white text-sm hover:opacity-90" style={{ background: "#0d9488" }}>
              View All Notices →
            </Link>
          </div>
        </div>
      </section>

      {/* ADMISSION CTA */}
      <section className="py-20" style={{ background: "linear-gradient(120deg, #0d9488 0%, #f97316 100%)" }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Start Your Academic Journey Today
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Ready to take the next step? Apply now or contact our admissions team for more information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admissions/apply" className="px-8 py-3 rounded-full font-bold text-teal-700 bg-white hover:bg-gray-100 transition-colors shadow-lg text-base">
              Apply Now →
            </Link>
            <Link href="/contact" className="px-8 py-3 rounded-full font-bold border-2 border-white text-white hover:bg-white hover:text-orange-600 transition-colors text-base">
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>

      {/* FACULTY SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3" style={{ background: "#fff7ed", color: "#f97316" }}>
              ✦ Faculty & Staff
            </div>
            <h2 className="text-4xl font-extrabold" style={{ color: "#0f172a" }}>
              Meet Our <span style={{ color: "#f97316" }}>Faculty</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Our dedicated faculty and staff are committed to student success and academic excellence.
            </p>
          </div>
          {featuredStaff.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredStaff.map((s: any, i: number) => (
                <div key={s.id} className="flex flex-col items-center text-center rounded-2xl p-8 hover:shadow-xl transition-shadow border" style={{ borderColor: i % 2 === 0 ? "#fed7aa" : "#99f6e4" }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-extrabold mb-4" style={{ background: i % 2 === 0 ? "#f97316" : "#0d9488" }}>
                    {s.name.charAt(0)}
                  </div>
                  <div className="font-bold text-base mb-1" style={{ color: "#0f172a" }}>{s.name}</div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "#f97316" }}>{s.department || s.role}</div>
                  <div className="text-xs text-gray-400">{s.qualification || ""}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">Faculty profiles coming soon.</div>
          )}
          <div className="text-center mt-10">
            <Link href="/staff" className="px-8 py-3 rounded-full font-bold text-white text-sm hover:opacity-90" style={{ background: "#0d9488" }}>
              View All Faculty →
            </Link>
          </div>
        </div>
      </section>

      <Chatbot />
    </div>
  );
}
