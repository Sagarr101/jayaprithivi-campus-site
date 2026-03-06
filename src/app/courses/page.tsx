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
            <div className="bg-indigo-900 text-white py-20 px-4">
                <div className="mx-auto max-w-6xl">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-600 text-white mb-4">
                        Academic Programs
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        Courses & Programs
                    </h1>
                    <p className="mt-4 text-white/75 text-lg max-w-2xl">
                        Explore our undergraduate and postgraduate programs designed to equip you with the skills for tomorrow&apos;s world.
                    </p>
                </div>
            </div>

            <section className="mx-auto max-w-6xl px-4 py-16 bg-gray-50">
                {/* Undergraduate Programs */}
                <div className="mb-16">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/10 text-indigo-900 mb-3">
                        UG Programs
                    </div>
                    <div className="flex items-end justify-between mb-8">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Undergraduate Programs</h2>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {undergrad.map((course) => (
                            <Card key={course.id} className="bg-white shadow-lg rounded-xl hover:-translate-y-1 transition-transform border-t-4 border-t-indigo-900 flex flex-col">
                                <CardHeader className="pb-2">
                                    {course.department && (
                                        <Badge className="self-start mb-2 bg-indigo-900/10 text-indigo-900 border-none">
                                            {course.department}
                                        </Badge>
                                    )}
                                    <CardTitle className="text-lg">{course.name}</CardTitle>
                                    <div className="text-sm text-black/60 dark:text-white/60">Duration: <span className="font-semibold">{course.duration}</span></div>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col gap-4">
                                    <p className="text-sm text-gray-700 leading-6 flex-1">
                                        {course.description}
                                    </p>
                                    <Button href="/admissions" className="bg-violet-600 text-white hover:bg-violet-700 w-full text-center mt-2">
                                        Apply Now
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Postgraduate Programs */}
                {postgrad.length > 0 && (
                    <div className="mb-16">
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-600/10 text-violet-600 mb-3">
                            PG Programs
                        </div>
                        <div className="flex items-end justify-between mb-8">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Postgraduate Programs</h2>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {postgrad.map((course) => (
                                <Card key={course.id} className="bg-white shadow-lg rounded-xl hover:-translate-y-1 transition-transform border-t-4 border-t-violet-600 flex flex-col">
                                    <CardHeader className="pb-2">
                                        {course.department && (
                                            <Badge className="self-start mb-2 bg-violet-600/10 text-violet-600 border-none">
                                                {course.department}
                                            </Badge>
                                        )}
                                        <CardTitle className="text-lg text-gray-900">{course.name}</CardTitle>
                                        <div className="text-sm text-black/60 dark:text-white/60">Duration: <span className="font-semibold">{course.duration}</span></div>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col gap-4">
                                        <p className="text-sm text-black/70 dark:text-white/70 leading-6 flex-1">
                                            {course.description}
                                        </p>
                                        <Button href="/admissions" className="bg-violet-600 text-white hover:bg-violet-700 w-full text-center mt-2 font-bold">
                                            Apply Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-indigo-900 p-8 md:p-12 text-white text-center rounded-xl">
                    <h3 className="text-2xl font-bold mb-3 text-white">Ready to Start Your Journey?</h3>
                    <p className="text-white/75 mb-6 max-w-lg mx-auto">Apply for admission to Jayaprithivi Campus today and take the first step toward your future.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button href="/admissions" className="bg-violet-600 text-white font-bold border-none hover:bg-violet-700">Apply Now</Button>
                        <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors">Contact Us</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
