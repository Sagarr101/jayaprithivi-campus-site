import type { Metadata } from "next";

import { site } from "@/content/site";

export const metadata: Metadata = {
    title: "Campus Life",
    description: `Discover the campus life facilities at ${site.fullName} — library, labs, sports, hostel, and student clubs.`,
};

const facilities = [
    {
        icon: "📚",
        title: "Library",
        description:
            "Our modern library houses thousands of books, journals, and digital resources. Open to all students daily, with quiet study areas and research support.",
        color: "var(--primary)",
    },
    {
        icon: "🔬",
        title: "Laboratories",
        description:
            "Well-equipped science and computer laboratories providing students with hands-on practical experience to complement theoretical learning.",
        color: "var(--accent)",
    },
    {
        icon: "⚽",
        title: "Sports Facilities",
        description:
            "A dedicated sports ground for football, volleyball, and cricket, along with indoor facilities for table tennis, badminton, and more.",
        color: "var(--primary)",
    },
    {
        icon: "🏠",
        title: "Hostel",
        description:
            "Affordable on-campus hostel accommodation available for outstation students, with separate wings and 24/7 security.",
        color: "var(--accent)",
    },
    {
        icon: "🎭",
        title: "Student Clubs",
        description:
            "Multiple student-led clubs — cultural, debate, environment, tech — fostering leadership, teamwork, and extracurricular growth.",
        color: "var(--primary)",
    },
    {
        icon: "🍽️",
        title: "Canteen",
        description:
            "A clean and affordable campus canteen serving nutritious meals and snacks throughout academic hours.",
        color: "var(--accent)",
    },
];

export default function CampusLifePage() {
    return (
        <div>
            {/* Page Hero */}
            <div className="bg-[color:var(--primary)] text-white py-20 px-4">
                <div className="mx-auto max-w-6xl">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--accent)]/20 text-[color:var(--accent)] mb-4">
                        Life on Campus
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        Campus Life
                    </h1>
                    <p className="mt-4 text-white/75 text-lg max-w-2xl">
                        Experience a vibrant, holistic campus life that goes beyond the
                        classroom — nurturing body, mind, and community.
                    </p>
                </div>
            </div>

            <section className="mx-auto max-w-6xl px-4 py-16">
                <div className="text-center mb-12">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--primary)]/10 text-[color:var(--primary)] dark:text-[color:var(--accent)] mb-3">
                        Facilities & Resources
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Everything You Need to Thrive
                    </h2>
                    <p className="mt-3 text-black/60 dark:text-white/60 max-w-xl mx-auto">
                        From world-class labs to sports fields, Jayaprithivi Campus provides
                        a rich environment for academic and personal growth.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {facilities.map((f, i) => (
                        <div
                            key={i}
                            className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-7 shadow-sm hover:-translate-y-1 transition-all hover:shadow-lg"
                        >
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow"
                                style={{ background: `color-mix(in srgb, ${f.color} 15%, transparent)` }}
                            >
                                {f.icon}
                            </div>
                            <h3
                                className="text-lg font-bold mb-2"
                                style={{ color: `color-mix(in srgb, ${f.color} 100%, transparent)` }}
                            >
                                {f.title}
                            </h3>
                            <p className="text-sm text-black/65 dark:text-white/65 leading-7">
                                {f.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Student Life Section */}
                <div className="mt-20">
                    <div className="text-center mb-12">
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--primary)]/10 text-[color:var(--primary)] dark:text-[color:var(--accent)] mb-3">
                            Community
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">Student Wellbeing</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            { title: "Academic Support", desc: "Tutoring, mentoring, and regular academic counselling sessions to help students excel." },
                            { title: "Cultural Programs", desc: "Annual cultural festivals, drama performances, and traditional events celebrating Nepal's rich heritage." },
                            { title: "Placement Support", desc: "Career guidance, placement drives, and industry connections to help graduates launch their careers." },
                        ].map((item, i) => (
                            <div key={i} className="rounded-2xl bg-[color:var(--primary)]/5 dark:bg-white/5 border border-[color:var(--primary)]/10 dark:border-white/10 p-6">
                                <div className="font-bold text-[color:var(--primary)] dark:text-[color:var(--accent)] mb-2">{item.title}</div>
                                <p className="text-sm text-black/65 dark:text-white/65 leading-7">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
