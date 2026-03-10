"use client";

import * as React from "react";

type Status = "idle" | "sending" | "sent" | "error";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "h-11 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";

const textareaCls =
  "min-h-32 rounded-xl border border-gray-300 bg-white p-4 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
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
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim() || "",
        phone: phone.trim() || "",
        message: message.trim(),
      }),
    }).catch(() => null);

    if (!res?.ok) {
      const data = (await res?.json().catch(() => null)) as { error?: string } | null;
      setStatus("error");
      setError(data?.error ?? "Something went wrong. Please try again.");
      return;
    }

    setStatus("sent");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  }

  return (
    <div className="bg-white rounded-2xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Send a message</h3>
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name *">
            <input
              className={inputCls}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Your name"
            />
          </Field>
          <Field label="Email (optional)">
            <input
              className={inputCls}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
            />
          </Field>
        </div>

        <Field label="Phone (optional)">
          <input
            className={inputCls}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            placeholder="+977-98XXXXXXXX"
          />
        </Field>

        <Field label="Message *">
          <textarea
            className={textareaCls}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
          />
        </Field>

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {status === "sent" && (
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            ✅ Message sent! We&apos;ll get back to you soon.
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-6 py-3 bg-indigo-900 text-white font-semibold rounded-xl hover:bg-indigo-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
          <div className="text-xs text-gray-500">* Required fields</div>
        </div>
      </form>
    </div>
  );
}
