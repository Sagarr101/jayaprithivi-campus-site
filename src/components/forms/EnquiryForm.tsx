"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent" | "error";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:bg-white";

const textareaCls =
  "min-h-28 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:bg-white resize-none";

const selectCls =
  "h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:bg-white";

export function EnquiryForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [program, setProgram] = React.useState("");
  const [message, setMessage] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !message.trim()) {
      setStatus("error");
      setError("Please enter your name and message.");
      return;
    }

    setStatus("sending");

    const enquiryMessage = program
      ? `[Admission Enquiry — ${program}]\n\n${message.trim()}`
      : `[Admission Enquiry]\n\n${message.trim()}`;

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim() || "",       // ✅ fixed: was undefined
        phone: phone.trim() || "",       // ✅ fixed: was undefined
        message: enquiryMessage,
      }),
    }).catch(() => null);

    if (!res?.ok) {
      const data = (await res?.json().catch(() => null)) as { error?: string } | null;
      setStatus("error");
      setError(data?.error ?? "Something went wrong. Please try again.");
      return;
    }

    setStatus("sent");
    setName(""); setEmail(""); setPhone(""); setProgram(""); setMessage("");
  }

  return (
    <div className="bg-white rounded-2xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
        Admission Enquiry Form
      </h3>
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full Name *">
            <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)}
              autoComplete="name" placeholder="Your full name" />
          </Field>
          <Field label="Email">
            <input className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)}
              autoComplete="email" placeholder="you@example.com" />
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Phone">
            <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel" placeholder="+977-98XXXXXXXX" />
          </Field>
          <Field label="Interested Program">
            <select className={selectCls} value={program} onChange={(e) => setProgram(e.target.value)}>
              <option value="">Select a program...</option>
              <option value="B.Ed.">B.Ed. (Bachelor of Education)</option>
              <option value="BBA">BBA (Bachelor of Business Administration)</option>
              <option value="B.Sc.">B.Sc. (Bachelor of Science)</option>
              <option value="BA">BA (Bachelor of Arts)</option>
              <option value="M.Ed.">M.Ed. (Master of Education)</option>
              <option value="MBA">MBA (Master of Business Administration)</option>
            </select>
          </Field>
        </div>

        <Field label="Your Message *">
          <textarea className={textareaCls} value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your query, e.g., eligibility, fee structure, documents needed..." />
        </Field>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {status === "sent" && (
          <div className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-700">
            ✅ Enquiry submitted successfully! We'll get back to you soon.
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-8 py-3 rounded-xl font-bold text-white text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: status === "sending" ? "#0d9488" : "linear-gradient(135deg, #0d9488, #f4615c)" }}
          >
            {status === "sending" ? "Submitting..." : "Submit Enquiry"}
          </button>
          <span className="text-xs text-gray-400">* Required fields</span>
        </div>
      </form>
    </div>
  );
}
