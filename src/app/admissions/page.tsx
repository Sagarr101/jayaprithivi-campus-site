import type { Metadata } from "next";
import Link from "next/link";

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
      <div className="text-white py-20 px-4" style={{ background: "linear-gradient(120deg, #0d9488 0%, #f97316 100%)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
            Admissions 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Admissions
          </h1>
          <p className="mt-4 text-white/90 text-lg max-w-2xl">
            Your step-by-step guide to joining Jayaprithivi Multiple Campus. We&apos;re excited to welcome you!
          </p>
          <a
            href="#enquiry-form"
            className="mt-8 inline-block px-8 py-3 rounded-full font-bold text-teal-700 bg-white hover:bg-gray-100 transition-colors shadow-lg"
          >
            Enquire Now ↓
          </a>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16">
        {/* Application Steps */}
        <div className="mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: "#f0fdfa", color: "#0d9488" }}>
            Process
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8" style={{ color: "#0f172a" }}>How to Apply</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <div key={i} className="bg-white shadow-lg rounded-2xl p-6 hover:-translate-y-1 transition-all border-t-4" style={{ borderTopColor: i % 2 === 0 ? "#0d9488" : "#f97316" }}>
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-xs font-bold mb-1" style={{ color: i % 2 === 0 ? "#0d9488" : "#f97316" }}>STEP {s.step}</div>
                <div className="font-bold text-base mb-2" style={{ color: "#0f172a" }}>{s.title}</div>
                <div className="text-sm text-gray-600 leading-6">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Admissions Countdown */}
        <div className="mb-16 text-center">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "#fff7ed", color: "#f97316" }}>
            Deadline
          </div>
          <h2 className="text-2xl font-extrabold mb-6" style={{ color: "#0f172a" }}>Admissions Open Until July 1, 2026</h2>
          <div className="inline-flex items-center gap-4 bg-white shadow-xl rounded-2xl p-8 border-b-4" style={{ borderBottomColor: "#f97316" }}>
            {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-4xl font-extrabold" style={{ color: "#0d9488" }}>00</div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents + Contact */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: "#f0fdfa", color: "#0d9488" }}>
              Documents
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-6" style={{ color: "#0f172a" }}>Required Documents</h2>
            <div className="space-y-3">
              {requiredDocs.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 bg-white shadow-sm rounded-xl p-4 border-l-4" style={{ borderLeftColor: "#0d9488" }}>
                  <span className="font-bold text-lg mt-0.5" style={{ color: "#0d9488" }}>✓</span>
                  <span className="text-sm text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Fee info */}
            <div className="bg-white shadow-lg rounded-2xl p-6 border-t-4" style={{ borderTopColor: "#f97316" }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#f97316" }}>Fees</div>
              <p className="text-sm text-gray-700 leading-6">
                Tuition fees vary by program. Please visit the admissions office or contact us for the latest fee structure for the 2026 batch.
              </p>
            </div>

            {/* Contact Info */}
            <div className="rounded-2xl p-8 text-white" style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#fcd34d" }}>Contact Admissions</div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span>📞</span>
                  <span>{site.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>✉️</span>
                  <a href={`mailto:${site.contact.email}`} className="underline underline-offset-4 hover:text-yellow-300">
                    {site.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span>📍</span>
                  <span>{site.contact.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

     {/* Enquiry Form */}
      <div id="enquiry-form" className="scroll-mt-24">
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
          style={{ background: "#e6fffa", color: "#0d9488" }}
        >
          Have Questions?
        </div>
        <h2
          className="text-3xl font-extrabold tracking-tight mb-8"
          style={{ color: "#0f172a" }}
        >
          Admission Enquiry
        </h2>
        <div
          className="bg-white rounded-2xl shadow-xl p-8 border-t-4"
          style={{ borderTopColor: "#f4615c" }}
        >
          <EnquiryForm />
        </div>
      </div>

      </section>  {/* ← This was missing! */}
    </div>
  );
}