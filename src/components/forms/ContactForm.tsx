"use client";

import * as React from "react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent" | "error";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "h-11 rounded-xl border border-black/10 bg-white/70 px-4 text-sm outline-none transition-colors placeholder:text-black/40 focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5 dark:placeholder:text-white/40";

const textareaCls =
  "min-h-32 rounded-xl border border-black/10 bg-white/70 p-4 text-sm outline-none transition-colors placeholder:text-black/40 focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5 dark:placeholder:text-white/40";

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
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        message: message.trim(),
      }),
    }).catch(() => null);

    if (!res?.ok) {
      const data = (await res?.json().catch(() => null)) as
        | { error?: string }
        | null;
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
    <Card>
      <CardHeader>
        <CardTitle>Send a message</CardTitle>
      </CardHeader>
      <CardContent>
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

          {error ? (
            <div
              className={cn(
                "rounded-xl border px-4 py-3 text-sm",
                "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-200",
              )}
            >
              {error}
            </div>
          ) : null}

          {status === "sent" ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-200">
              Message sent. We’ll get back to you soon.
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="submit"
              size="lg"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </Button>
            <div className="text-xs text-black/60 dark:text-white/60">
              * Required fields
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

