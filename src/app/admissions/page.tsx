import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Admissions",
  description: `Admissions information for ${site.fullName}.`,
};

const steps = [
  { title: "Check eligibility", desc: "Confirm program requirements and minimum criteria." },
  { title: "Prepare documents", desc: "Citizenship, certificates, transcripts, photos, etc." },
  { title: "Fill application", desc: "Collect form from campus / download (if available)." },
  { title: "Submit & verify", desc: "Submit the form and get your documents verified." },
  { title: "Fee payment", desc: "Pay admission/semester fees as instructed by the campus." },
];

const requiredDocuments = [
  "Photocopy of citizenship certificate",
  "Academic certificates / transcripts",
  "Passport-size photos",
  "Migration / character certificate (if applicable)",
  "Other documents required by the program",
];

export default function AdmissionsPage() {
  return (
    <div>
      <PageHeader
        title="Admissions"
        description="Admission process, required documents, and important information."
        right={<Button href="/contact" variant="secondary">Ask admissions</Button>}
      />

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>How to apply</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {steps.map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-black/10 bg-white/60 p-4 text-sm dark:border-white/10 dark:bg-white/5"
                >
                  <div className="font-semibold">{s.title}</div>
                  <div className="mt-1 text-black/70 dark:text-white/70">{s.desc}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Required documents</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm text-black/75 dark:text-white/75">
                {requiredDocuments.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-black/10 bg-white/60 p-4 text-sm dark:border-white/10 dark:bg-white/5">
                <div className="font-semibold">Need help?</div>
                <div className="mt-1 text-black/70 dark:text-white/70">
                  Contact the admission desk at{" "}
                  <a className="font-medium underline underline-offset-4 hover:no-underline" href={`mailto:${site.contact.email}`}>
                    {site.contact.email}
                  </a>
                  .
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Programs</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-black/75 dark:text-white/75">
              The campus offers bachelor’s and master’s degree programs. You can
              list the detailed intake capacity and eligibility for each program
              here.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fees</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-black/75 dark:text-white/75">
              Add tuition, admission, exam, and other fees here.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Downloads</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-black/75 dark:text-white/75">
              Add links to PDFs in <code className="rounded bg-black/5 px-1 py-0.5 dark:bg-white/10">public/docs</code> (e.g., admission form, prospectus).
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

