import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { site } from "@/content/site";

const steps = [
  { step: "01", title: "Check Eligibility", desc: "Confirm program requirements and minimum criteria for your chosen program.", icon: "✅" },
  { step: "02", title: "Prepare Documents", desc: "Collect your citizenship, certificates, transcripts, and passport photos.", icon: "📄" },
  { step: "03", title: "Fill Application Form", desc: "Collect the form from campus or download it (if available online).", icon: "✏️" },
  { step: "04", title: "Submit & Verify", desc: "Submit your completed form and get your documents verified by the office.", icon: "🏛️" },
  { step: "05", title: "Pay Fees", desc: "Pay admission and semester fees as instructed by the admissions desk.", icon: "💳" },
];

const requiredDocs = [
  "Photocopy of citizenship certificate",
  "Academic certificates & mark sheets",
  "Passport-size photographs (4)",
  "Migration / character certificate (if applicable)",
  "SLC / SEE & +2 transcripts",
  "Other documents as required by the program",
];

export const metadata: Metadata = {
  title: "Admissions",
  description: `Admission process, requirements, and enquiry form for ${site.fullName}.`,
};

export default function AdmissionsPage() {
  return (
    <div>
      {/* Page Hero */}
      <div className="bg-[color:var(--primary)] text-white py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--accent)]/20 text-[color:var(--accent)] mb-4">
            Admissions 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Admissions
          </h1>
          <p className="mt-4 text-white/75 text-lg max-w-2xl">
            Your step-by-step guide to joining Jayaprithivi Multiple Campus. We&apos;re excited to welcome you!
          </p>
          <Button
            href="#enquiry-form"
            className="mt-8 bg-[color:var(--accent)] text-[color:var(--primary)] hover:bg-[color:var(--accent)]/90 font-bold border-none"
          >
            Enquire Now ↓
          </Button>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16">
        {/* Application Steps */}
        <div className="mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--primary)]/10 text-[color:var(--primary)] dark:text-[color:var(--accent)] mb-3">
            Process
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-8">How to Apply</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm group hover:border-[color:var(--accent)] hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="text-3xl">{s.icon}</div>
                  <div className="font-bold text-[color:var(--accent)] text-xs">{s.step}</div>
                </div>
                <div className="font-bold text-[color:var(--primary)] dark:text-white mb-1">{s.title}</div>
                <div className="text-sm text-black/65 dark:text-white/65 leading-6">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--primary)]/10 text-[color:var(--primary)] dark:text-[color:var(--accent)] mb-3">
              Documents
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Required Documents</h2>
            <div className="space-y-3">
              {requiredDocs.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-4"
                >
                  <span className="text-[color:var(--accent)] font-bold text-lg mt-0.5">✓</span>
                  <span className="text-sm text-black/75 dark:text-white/75">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Fee info */}
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm">
              <div className="text-xs font-semibold text-[color:var(--accent)] uppercase tracking-widest mb-3">Fees</div>
              <p className="text-sm text-black/65 dark:text-white/65 leading-6">
                Tuition fees vary by program. Please visit the admissions office or contact us for the latest fee structure for the 2026 batch.
              </p>
            </div>

            {/* Contact Info */}
            <div className="rounded-2xl bg-[color:var(--primary)] text-white p-8">
              <div className="text-xs font-semibold text-[color:var(--accent)] uppercase tracking-widest mb-4">Contact Admissions</div>
              <div className="space-y-3 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[color:var(--accent)] font-semibold">Phone:</span>
                  <span>{site.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[color:var(--accent)] font-semibold">Email:</span>
                  <a href={`mailto:${site.contact.email}`} className="hover:text-white underline underline-offset-4">
                    {site.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div id="enquiry-form" className="scroll-mt-24">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--primary)]/10 text-[color:var(--primary)] dark:text-[color:var(--accent)] mb-3">
            Have Questions?
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-8">Admission Enquiry</h2>
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}
