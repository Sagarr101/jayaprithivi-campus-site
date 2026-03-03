import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.fullName} — location, affiliation, mission and facilities.`,
};

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About the campus"
        description={`${site.fullName} is located in ${site.location} and is affiliated to ${site.affiliation}.`}
      />

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-black/75 dark:text-white/75">
              <p>
                This is a starter website you can customize with your campus’s
                real history, programs, achievements, and official documents.
                Replace the placeholder text and staff lists with accurate data.
              </p>
              <p>
                We aim to provide a simple, reliable place for students,
                guardians, and visitors to find admissions info, staff contacts,
                notices, events, and campus updates.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge>Affiliated: {site.affiliation}</Badge>
                <Badge>Location: {site.location}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-black/75 dark:text-white/75">
              Provide quality higher education opportunities to students in and
              around Bajhang, support research and community service, and build
              employable skills.
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Programs</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-black/75 dark:text-white/75">
              Jayaprithvi Multiple Campus runs bachelor’s and master’s level
              programs. You can list each faculty and program here (for example:
              Education, Management, Humanities, etc.).
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Facilities</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-black/75 dark:text-white/75">
              Library, classrooms, labs, internet, sports ground, etc.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-black/75 dark:text-white/75">
              Upload PDFs (prospectus, rules, forms) and link them here.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

