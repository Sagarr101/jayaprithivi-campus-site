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
        bgClass: "bg-indigo-900/15",
        titleClass: "text-indigo-900",
    },
    {
        icon: "🔬",
        title: "Laboratories",
        description:
            "Well-equipped science and computer laboratories providing students with hands-on practical experience to complement theoretical learning.",
        bgClass: "bg-violet-600/15",
        titleClass: "text-violet-600",
    },
    {
        icon: "⚽",
        title: "Sports Facilities",
        description:
            "A dedicated sports ground for football, volleyball, and cricket, along with indoor facilities for table tennis, badminton, and more.",
        bgClass: "bg-indigo-900/15",
        titleClass: "text-indigo-900",
    },
    {
        icon: "🏠",
        title: "Hostel",
        description:
            "Affordable on-campus hostel accommodation available for outstation students, with separate wings and 24/7 security.",
        bgClass: "bg-violet-600/15",
        titleClass: "text-violet-600",
    },
    {
        icon: "🎭",
        title: "Student Clubs",
        description:
            "Multiple student-led clubs — cultural, debate, environment, tech — fostering leadership, teamwork, and extracurricular growth.",
        bgClass: "bg-indigo-900/15",
        titleClass: "text-indigo-900",
    },
    {
        icon: "🍽️",
        title: "Canteen",
        description:
            "A clean and affordable campus canteen serving nutritious meals and snacks throughout academic hours.",
        bgClass: "bg-violet-600/15",
        titleClass: "text-violet-600",
    },
];

export default function CampusLifePage() {
    return (
        <div>
            {/* Page Hero */}
            <div className="bg-indigo-900 text-white py-20 px-4">
                <div className="mx-auto max-w-6xl">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-600 text-white mb-4">
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

            <section className="mx-auto max-w-6xl px-4 py-16 bg-gray-50">
                <div className="text-center mb-12">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/10 text-indigo-900 mb-3">
                        Facilities & Resources
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        Everything You Need to Thrive
                    </h2>
                    <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                        From world-class labs to sports fields, Jayaprithivi Campus provides
                        a rich environment for academic and personal growth.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {facilities.map((f, i) => (
                        <div
                            key={i}
                            className="bg-white shadow-lg rounded-xl p-7 group hover:-translate-y-1 transition-all hover:shadow-lg"
                        >
                            <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow ${f.bgClass}`}
                            >
                                {f.icon}
                            </div>
                            <h3
                                className={`text-lg font-bold mb-2 ${f.titleClass}`}
                            >
                                {f.title}
                            </h3>
                            <p className="text-sm text-gray-700 leading-7">
                                {f.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Student Life Section */}
                <div className="mt-20">
                    <div className="text-center mb-12">
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/10 text-indigo-900 mb-3">
                            Community
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Student Wellbeing</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            { title: "Academic Support", desc: "Tutoring, mentoring, and regular academic counselling sessions to help students excel." },
                            { title: "Cultural Programs", desc: "Annual cultural festivals, drama performances, and traditional events celebrating Nepal's rich heritage." },
                            { title: "Placement Support", desc: "Career guidance, placement drives, and industry connections to help graduates launch their careers." },
                        ].map((item, i) => (
                            <div key={i} className="bg-indigo-900/5 border border-indigo-900/10 p-6 rounded-xl">
                                <div className="font-bold text-indigo-900 mb-2">{item.title}</div>
                                <p className="text-sm text-gray-700 leading-7">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
