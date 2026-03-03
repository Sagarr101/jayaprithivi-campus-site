import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photo gallery of ${site.fullName}.`,
};

const placeholders = [
  { title: "Campus building", subtitle: "Add your real photos in public/gallery/" },
  { title: "Classroom activities", subtitle: "Workshops, seminars and classes" },
  { title: "Library", subtitle: "Books, reading areas and resources" },
  { title: "Sports & events", subtitle: "Sports week and cultural programs" },
  { title: "Graduation / farewell", subtitle: "Special moments with students" },
  { title: "Community programs", subtitle: "Outreach and local engagement" },
];

export default function GalleryPage() {
  return (
    <div>
      <PageHeader
        title="Gallery"
        description="Campus photos, activities and events."
      />

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <Card>
          <CardHeader>
            <CardTitle>Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {placeholders.map((p) => (
                <div
                  key={p.title}
                  className="overflow-hidden rounded-2xl border border-black/10 bg-white/60 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="aspect-[16/10] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_55%),linear-gradient(45deg,color-mix(in_srgb,var(--ring)_18%,transparent),transparent_55%)]" />
                  <div className="p-4">
                    <div className="text-sm font-semibold">{p.title}</div>
                    <div className="mt-1 text-sm text-black/70 dark:text-white/70">
                      {p.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-5 text-sm text-black/75 dark:border-white/10 dark:bg-white/5 dark:text-white/75">
              To add real images, create a folder{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 dark:bg-white/10">
                public/gallery
              </code>{" "}
              and reference them like{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 dark:bg-white/10">
                /gallery/photo-1.jpg
              </code>
              .
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

