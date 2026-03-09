import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { site } from "@/content/site";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
    title: "Courses & Programs",
    description: `Undergraduate and postgraduate academic programs offered at ${site.fullName}.`,
};

const staticCourses = [
    { id: -1, name: "B.Ed. (Bachelor of Education)", category: "Undergraduate", duration: "4 Years", department: "Education", description: "Prepares students for teaching careers with a blend of pedagogy and subject knowledge." },
    { id: -2, name: "BBA (Bachelor of Business Administration)", category: "Undergraduate", duration: "4 Years", department: "Management", description: "Foundational business studies covering management, finance, and marketing." },
    { id: -3, name: "B.Sc. (Bachelor of Science)", category: "Undergraduate", duration: "4 Years", department: "Science", description: "Science program covering Mathematics, Physics, Chemistry, and Biology." },
    { id: -4, name: "BA (Bachelor of Arts)", category: "Undergraduate", duration: "3 Years", department: "Humanities", description: "A broad liberal arts program with options in Nepali, English, History, and more." },
    { id: -5, name: "M.Ed. (Master of Education)", category: "Postgraduate", duration: "2 Years", department: "Education", description: "Advanced pedagogy and curriculum design for educators seeking to lead." },
    { id: -6, name: "MBA (Master of Business Administration)", category: "Postgraduate", duration: "2 Years", department: "Management", description: "Leadership-focused graduate business program for working professionals." },
];

export default async function CoursesPage() {
    let dbCourses: { id: number; name: string; category: string; duration: string; description: string | null; department: string | null }[] = [];
    try {
        dbCourses = await prisma.course.findMany({ orderBy: { category: "asc" } });
    } catch {
        dbCourses = [];
    }

    const allCourses = dbCourses.length > 0 ? dbCourses : staticCourses;
    const undergrad = allCourses.filter((c) => c.category === "Undergraduate");
    const postgrad = allCourses.filter((c) => c.category === "Postgraduate");

    return (
        <div>
            {/* Page Hero */}
            <div className="text-white py-20 px-4" style={{ background: "linear-gradient(120deg, #0d9488 0%, #f97316 100%)" }}>
                <div className="mx-auto max-w-6xl">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
                        Academic Programs
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                        Courses & Programs
                    </h1>
                    <p className="mt-4 text-white/90 text-lg max-w-2xl">
                        Explore our undergraduate and postgraduate programs designed to equip you with the skills for tomorrow&apos;s world.
                    </p>
                </div>
            </div>

            <section className="mx-auto max-w-6xl px-4 py-16">
                {/* Undergraduate Programs */}
                <div className="mb-16">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: "#f0fdfa", color: "#0d9488" }}>
                        UG Programs
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight mb-8" style={{ color: "#0f172a" }}>Undergraduate Programs</h2>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {undergrad.map((course) => (
                            <div key={course.id} className="bg-white shadow-lg rounded-2xl hover:-translate-y-1 transition-transform border-t-4 flex flex-col overflow-hidden" style={{ borderTopColor: "#0d9488" }}>
                                <div className="p-6 flex flex-col flex-1">
                                    {course.department && (
                                        <span className="self-start mb-2 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#f0fdfa", color: "#0d9488" }}>
                                            {course.department}
                                        </span>
                                    )}
                                    <div className="text-lg font-bold mb-1" style={{ color: "#0f172a" }}>{course.name}</div>
                                    <div className="text-sm text-gray-400 mb-3">Duration: <span className="font-semibold text-gray-600">{course.duration}</span></div>
                                    <p className="text-sm text-gray-600 leading-6 flex-1">{course.description}</p>
                                    <Link href="/admissions" className="mt-4 block text-center px-4 py-2 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity" style={{ background: "#f97316" }}>
                                        Apply Now →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Postgraduate Programs */}
                {postgrad.length > 0 && (
                    <div className="mb-16">
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: "#fff7ed", color: "#f97316" }}>
                            PG Programs
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-8" style={{ color: "#0f172a" }}>Postgraduate Programs</h2>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {postgrad.map((course) => (
                                <div key={course.id} className="bg-white shadow-lg rounded-2xl hover:-translate-y-1 transition-transform border-t-4 flex flex-col overflow-hidden" style={{ borderTopColor: "#f97316" }}>
                                    <div className="p-6 flex flex-col flex-1">
                                        {course.department && (
                                            <span className="self-start mb-2 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#fff7ed", color: "#f97316" }}>
                                                {course.department}
                                            </span>
                                        )}
                                        <div className="text-lg font-bold mb-1" style={{ color: "#0f172a" }}>{course.name}</div>
                                        <div className="text-sm text-gray-400 mb-3">Duration: <span className="font-semibold text-gray-600">{course.duration}</span></div>
                                        <p className="text-sm text-gray-600 leading-6 flex-1">{course.description}</p>
                                        <Link href="/admissions" className="mt-4 block text-center px-4 py-2 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity" style={{ background: "#0d9488" }}>
                                            Apply Now →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="p-8 md:p-12 text-white text-center rounded-2xl" style={{ background: "linear-gradient(120deg, #0d9488 0%, #f97316 100%)" }}>
                    <h3 className="text-2xl font-extrabold mb-3">Ready to Start Your Journey?</h3>
                    <p className="text-white/90 mb-6 max-w-lg mx-auto">Apply for admission to Jayaprithivi Campus today and take the first step toward your future.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/admissions" className="px-8 py-3 rounded-full font-bold text-teal-700 bg-white hover:bg-gray-100 transition-colors">Apply Now →</Link>
                        <Link href="/contact" className="px-8 py-3 rounded-full font-bold border-2 border-white text-white hover:bg-white hover:text-orange-600 transition-colors">Contact Us</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
