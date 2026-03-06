"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/content/site";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
                router.refresh();
            } else {
                const data = (await res.json()) as { error?: string };
                setError(data.error ?? "Invalid credentials. Please try again.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #0a1628 0%, #1a2a4a 50%, #0d1f3c 100%)",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                padding: "1rem",
            }}
        >
            {/* Background decorative elements */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "-20%",
                        right: "-10%",
                        width: "600px",
                        height: "600px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "-20%",
                        left: "-10%",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
                    }}
                />
            </div>

            {/* Login Card */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    maxWidth: "420px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "20px",
                    padding: "2.5rem 2rem",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.15) inset",
                }}
            >
                {/* Logo / Icon */}
                <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/logo.png"
                        alt={`${site.name} Logo`}
                        style={{
                            width: "72px",
                            height: "72px",
                            borderRadius: "18px",
                            objectFit: "contain",
                            marginBottom: "1.25rem",
                            background: "rgba(255,255,255,0.08)",
                            padding: "6px",
                        }}
                    />

                    <h1
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: "0 0 0.35rem",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Admin Portal
                    </h1>
                    <p
                        style={{
                            fontSize: "0.875rem",
                            color: "rgba(255,255,255,0.5)",
                            margin: 0,
                        }}
                    >
                        {site.fullName}
                    </p>
                </div>

                {/* Divider */}
                <div
                    style={{
                        height: "1px",
                        background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
                        marginBottom: "1.75rem",
                    }}
                />

                {/* Form */}
                <form onSubmit={(e) => void handleSubmit(e)}>
                    <div style={{ marginBottom: "1.25rem" }}>
                        <label
                            htmlFor="admin-email"
                            style={{
                                display: "block",
                                fontSize: "0.8125rem",
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.65)",
                                marginBottom: "0.5rem",
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                            }}
                        >
                            Email
                        </label>
                        <input
                            id="admin-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter admin email"
                            required
                            autoFocus
                            style={{
                                width: "100%",
                                padding: "0.75rem 1rem",
                                background: "rgba(255,255,255,0.07)",
                                border: error
                                    ? "1px solid rgba(239,68,68,0.7)"
                                    : "1px solid rgba(255,255,255,0.12)",
                                borderRadius: "10px",
                                color: "#ffffff",
                                fontSize: "0.9375rem",
                                outline: "none",
                                transition: "border-color 0.2s, box-shadow 0.2s",
                                boxSizing: "border-box",
                            }}
                            onFocus={(e) => {
                                if (!error) {
                                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.6)";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.1)";
                                }
                            }}
                            onBlur={(e) => {
                                if (!error) {
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                                    e.currentTarget.style.boxShadow = "none";
                                }
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "1.25rem" }}>
                        <label
                            htmlFor="admin-password"
                            style={{
                                display: "block",
                                fontSize: "0.8125rem",
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.65)",
                                marginBottom: "0.5rem",
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                            }}
                        >
                            Password
                        </label>
                        <input
                            id="admin-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            required
                            style={{
                                width: "100%",
                                padding: "0.75rem 1rem",
                                background: "rgba(255,255,255,0.07)",
                                border: error
                                    ? "1px solid rgba(239,68,68,0.7)"
                                    : "1px solid rgba(255,255,255,0.12)",
                                borderRadius: "10px",
                                color: "#ffffff",
                                fontSize: "0.9375rem",
                                outline: "none",
                                transition: "border-color 0.2s, box-shadow 0.2s",
                                boxSizing: "border-box",
                            }}
                            onFocus={(e) => {
                                if (!error) {
                                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.6)";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.1)";
                                }
                            }}
                            onBlur={(e) => {
                                if (!error) {
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                                    e.currentTarget.style.boxShadow = "none";
                                }
                            }}
                        />
                    </div>

                    {/* Error message */}
                    {error && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.625rem 0.875rem",
                                background: "rgba(239,68,68,0.1)",
                                border: "1px solid rgba(239,68,68,0.3)",
                                borderRadius: "8px",
                                marginBottom: "1.25rem",
                            }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="rgba(239,68,68,0.9)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ flexShrink: 0 }}
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <span style={{ fontSize: "0.8125rem", color: "rgba(239,68,68,0.9)" }}>{error}</span>
                        </div>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "0.8125rem",
                            background: loading
                                ? "rgba(212,175,55,0.5)"
                                : "linear-gradient(135deg, #d4af37 0%, #f0c040 100%)",
                            border: "none",
                            borderRadius: "10px",
                            color: "#0a1628",
                            fontSize: "0.9375rem",
                            fontWeight: 700,
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "opacity 0.2s, transform 0.15s",
                            letterSpacing: "0.02em",
                            boxShadow: loading ? "none" : "0 4px 16px rgba(212,175,55,0.35)",
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.currentTarget.style.opacity = "0.9";
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = "1";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        {loading ? "Signing in…" : "Sign In →"}
                    </button>
                </form>

                {/* Footer note */}
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.3)",
                        marginTop: "1.5rem",
                        marginBottom: 0,
                    }}
                >
                    🔒 Restricted area — authorised personnel only
                </p>
            </div>
        </div>
    );
}
