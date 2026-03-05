import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const sections = [
  { href: "/admin/notices", title: "Notices", desc: "Create and manage campus notices.", icon: "📋" },
  { href: "/admin/events", title: "Events", desc: "Create and manage events and programs.", icon: "📅" },
  { href: "/admin/staff", title: "Staff", desc: "Maintain the staff directory.", icon: "👩‍🏫" },
  { href: "/admin/courses", title: "Courses", desc: "Manage undergraduate and postgraduate programs.", icon: "🎓" },
  { href: "/admin/messages", title: "Messages", desc: "View contact and admission enquiry messages.", icon: "✉️" },
];

export default function AdminHomePage() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {sections.map((s) => (
        <Link key={s.href} href={s.href}>
          <Card className="h-full transition-colors hover:bg-black/5 dark:hover:bg-white/10 border-t-4 border-t-[color:var(--primary)]">
            <CardHeader>
              <div className="text-2xl mb-2">{s.icon}</div>
              <CardTitle>{s.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-black/75 dark:text-white/75">
              {s.desc}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

