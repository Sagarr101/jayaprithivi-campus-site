import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const sections = [
  { href: "/admin/notices", title: "Notices", desc: "Create and manage campus notices." },
  { href: "/admin/events", title: "Events", desc: "Create and manage events and programs." },
  { href: "/admin/staff", title: "Staff", desc: "Maintain the staff directory." },
];

export default function AdminHomePage() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {sections.map((s) => (
        <Link key={s.href} href={s.href}>
          <Card className="h-full transition-colors hover:bg-black/5 dark:hover:bg-white/10">
            <CardHeader>
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

