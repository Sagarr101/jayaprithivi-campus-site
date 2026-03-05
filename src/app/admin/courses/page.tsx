"use client";

import * as React from "react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

type Course = {
    id: number;
    name: string;
    category: string;
    duration: string;
    description: string | null;
    department: string | null;
};

export default function AdminCoursesPage() {
    const [courses, setCourses] = React.useState<Course[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [editingId, setEditingId] = React.useState<number | null>(null);
    const [form, setForm] = React.useState({
        name: "",
        category: "Undergraduate",
        duration: "",
        description: "",
        department: "",
    });
    const [submitting, setSubmitting] = React.useState(false);
    const [message, setMessage] = React.useState("");

    async function fetchCourses() {
        const res = await fetch("/api/admin/courses");
        const data = await res.json();
        setCourses(data.data?.courses || []);
        setLoading(false);
    }

    React.useEffect(() => {
        fetchCourses();
    }, []);

    function startEdit(course: Course) {
        setEditingId(course.id);
        setForm({
            name: course.name,
            category: course.category,
            duration: course.duration,
            description: course.description ?? "",
            department: course.department ?? "",
        });
        setMessage("");
    }

    function cancelEdit() {
        setEditingId(null);
        setForm({ name: "", category: "Undergraduate", duration: "", description: "", department: "" });
        setMessage("");
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        setMessage("");

        const method = editingId ? "PUT" : "POST";
        const body = editingId ? { id: editingId, ...form } : form;

        const res = await fetch("/api/admin/courses", {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        if (data.ok) {
            setMessage(editingId ? "Course updated successfully!" : "Course added successfully!");
            setForm({ name: "", category: "Undergraduate", duration: "", description: "", department: "" });
            setEditingId(null);
            await fetchCourses();
        } else {
            setMessage(data.error ?? "Something went wrong.");
        }
        setSubmitting(false);
    }

    async function handleDelete(id: number) {
        if (!confirm("Delete this course?")) return;
        await fetch(`/api/admin/courses?id=${id}`, { method: "DELETE" });
        await fetchCourses();
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Manage Courses</h1>

            {/* Add/Edit Course Form */}
            <Card>
                <CardHeader>
                    <CardTitle>{editingId ? "Edit Course" : "Add New Course"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium mb-1">Course Name *</label>
                            <input
                                required
                                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                                value={form.name}
                                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                placeholder="e.g., BBA (Bachelor of Business Administration)"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category *</label>
                            <select
                                required
                                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                                value={form.category}
                                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                            >
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Postgraduate">Postgraduate</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Duration *</label>
                            <input
                                required
                                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                                value={form.duration}
                                onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                                placeholder="e.g., 4 Years"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Department</label>
                            <input
                                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                                value={form.department}
                                onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                                placeholder="e.g., Management"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)] min-h-[80px]"
                                value={form.description}
                                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                                placeholder="Brief description of the program..."
                            />
                        </div>
                        <div className="sm:col-span-2 flex items-center gap-2 flex-wrap">
                            <Button type="submit" disabled={submitting}>
                                {submitting ? (editingId ? "Updating..." : "Adding...") : editingId ? "Update Course" : "Add Course"}
                            </Button>
                            {editingId && (
                                <Button type="button" onClick={cancelEdit} style={{ background: "transparent", color: "var(--text)" }}>
                                    Cancel
                                </Button>
                            )}
                            {message && (
                                <span className={`text-sm ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
                                    {message}
                                </span>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Courses List */}
            <Card>
                <CardHeader>
                    <CardTitle>All Courses ({courses.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-sm text-black/60 dark:text-white/60">Loading...</div>
                    ) : courses.length === 0 ? (
                        <div className="text-sm text-black/60 dark:text-white/60">No courses added yet.</div>
                    ) : (
                        <div className="grid gap-3">
                            {courses.map((c) => (
                                <div
                                    key={c.id}
                                    className="flex items-start justify-between gap-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4"
                                >
                                    <div className="flex-1">
                                        <div className="font-semibold text-sm">{c.name}</div>
                                        <div className="text-xs text-black/60 dark:text-white/60 mt-0.5">
                                            {c.category} · {c.duration}{c.department ? ` · ${c.department}` : ""}
                                        </div>
                                        {c.description && (
                                            <div className="text-xs text-black/50 dark:text-white/50 mt-1">{c.description}</div>
                                        )}
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            onClick={() => startEdit(c)}
                                            className="text-xs text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(c.id)}
                                            className="text-xs text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
