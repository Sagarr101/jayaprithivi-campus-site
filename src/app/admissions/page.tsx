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
      <div className="bg-indigo-900 text-white py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-600 text-white mb-4">
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
            className="mt-8 bg-violet-600 text-white hover:bg-violet-700 font-bold border-none"
          >
            Enquire Now ↓
          </Button>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 bg-gray-50">
        {/* Application Steps */}
        <div className="mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/10 text-indigo-900 mb-3">
            Process
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">How to Apply</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={i}
                className="card flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white rounded-xl p-8"
              >
                <div className="text-2xl font-bold text-violet-600 mb-2">{s.step}</div>
                <div className="card-title mb-1">{s.title}</div>
                <div className="card-desc card-secondary">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Admissions Countdown */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Admissions Open Until July 1, 2026</h2>
          <div className="inline-flex items-center gap-4 bg-white shadow-lg rounded-xl p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900" id="days">0</div>
              <div className="text-sm text-gray-500">Days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900" id="hours">0</div>
              <div className="text-sm text-gray-500">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900" id="minutes">0</div>
              <div className="text-sm text-gray-500">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900" id="seconds">0</div>
              <div className="text-sm text-gray-500">Seconds</div>
            </div>
          </div>
        </div>

        {/* Required Documents */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-900/10 text-indigo-900 mb-3">
              Documents
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-6">Required Documents</h2>
            <div className="space-y-3">
              {requiredDocs.map((doc, i) => (
                <div
                  key={i}
                  className="card flex items-center gap-3 bg-white shadow-lg rounded-xl p-4"
                >
                  <span className="text-violet-600 font-bold text-lg mt-0.5">✓</span>
                  <span className="text-base font-bold text-gray-900">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Fee info */}
            <div className="bg-white shadow-lg rounded-xl p-6 shadow-sm">
              <div className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-3">Fees</div>
              <p className="text-sm text-gray-700 leading-6">
                Tuition fees vary by program. Please visit the admissions office or contact us for the latest fee structure for the 2026 batch.
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-indigo-900 text-white p-8">
              <div className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-4">Contact Admissions</div>
              <div className="space-y-3 text-white text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-violet-600 font-semibold">Phone:</span>
                  <span>{site.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-violet-600 font-semibold">Email:</span>
                  <a href={`mailto:${site.contact.email}`} className="hover:text-violet-600 underline underline-offset-4">
                    {site.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div id="enquiry-form" className="scroll-mt-24">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/10 text-indigo-900 mb-3">
            Have Questions?
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Admission Enquiry</h2>
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}
