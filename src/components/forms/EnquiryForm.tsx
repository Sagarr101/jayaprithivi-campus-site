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
    "min-h-28 rounded-xl border border-black/10 bg-white/70 p-4 text-sm outline-none transition-colors placeholder:text-black/40 focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5 dark:placeholder:text-white/40";

const selectCls =
    "h-11 rounded-xl border border-black/10 bg-white/70 px-4 text-sm outline-none transition-colors focus:border-transparent focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5";

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
                email: email.trim() || undefined,
                phone: phone.trim() || undefined,
                message: enquiryMessage,
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
        setProgram("");
        setMessage("");
    }

    return (
        <Card className="border-t-4 border-t-[color:var(--accent)] shadow-lg">
            <CardHeader>
                <CardTitle className="text-lg">Admission Enquiry Form</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Full Name *">
                            <input
                                className={inputCls}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                                placeholder="Your full name"
                            />
                        </Field>
                        <Field label="Email">
                            <input
                                className={inputCls}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                placeholder="you@example.com"
                            />
                        </Field>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Phone">
                            <input
                                className={inputCls}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                autoComplete="tel"
                                placeholder="+977-98XXXXXXXX"
                            />
                        </Field>
                        <Field label="Interested Program">
                            <select
                                className={selectCls}
                                value={program}
                                onChange={(e) => setProgram(e.target.value)}
                            >
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
                        <textarea
                            className={textareaCls}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us about your query, e.g., eligibility, fee structure, documents needed..."
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
                            ✅ Enquiry submitted successfully! We&apos;ll get back to you soon.
                        </div>
                    ) : null}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={status === "sending"}
                            className="bg-[color:var(--accent)] text-[color:var(--primary)] hover:bg-[color:var(--accent)]/90 font-bold border-none"
                        >
                            {status === "sending" ? "Submitting..." : "Submit Enquiry"}
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
