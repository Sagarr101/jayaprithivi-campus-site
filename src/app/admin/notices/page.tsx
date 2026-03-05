"use client";

import * as React from "react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

type Notice = {
  id: number;
  title: string;
  dateISO: string;
  category: string | null;
  summary: string | null;
  fileUrl: string | null;
};

export default function AdminNoticesPage() {
  const [notices, setNotices] = React.useState<Notice[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [form, setForm] = React.useState({
    title: "",
    dateISO: "",
    category: "",
    summary: "",
    fileUrl: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState("");

  async function fetchNotices() {
    const res = await fetch("/api/admin/notices");
    const data = await res.json();
    setNotices(data.data?.notices || []);
    setLoading(false);
  }

  React.useEffect(() => {
    fetchNotices();
  }, []);

  function startEdit(notice: Notice) {
    setEditingId(notice.id);
    setForm({
      title: notice.title,
      dateISO: notice.dateISO,
      category: notice.category ?? "",
      summary: notice.summary ?? "",
      fileUrl: notice.fileUrl ?? "",
    });
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ title: "", dateISO: "", category: "", summary: "", fileUrl: "" });
    setMessage("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { id: editingId, ...form } : form;

    const res = await fetch("/api/admin/notices", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        category: body.category || undefined,
        summary: body.summary || undefined,
        fileUrl: body.fileUrl || undefined,
      }),
    });
    const data = await res.json();
    if (data.ok) {
      setMessage(editingId ? "Notice updated successfully!" : "Notice added successfully!");
      setForm({ title: "", dateISO: "", category: "", summary: "", fileUrl: "" });
      setEditingId(null);
      await fetchNotices();
    } else {
      setMessage(data.error ?? "Something went wrong.");
    }
    setSubmitting(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this notice?")) return;
    await fetch(`/api/admin/notices?id=${id}`, { method: "DELETE" });
    await fetchNotices();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Notices</h1>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Notice" : "Create Notice"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                required
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Notice title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date *</label>
              <input
                required
                type="date"
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                value={form.dateISO}
                onChange={(e) => setForm((f) => ({ ...f, dateISO: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="e.g., Exam, Holiday, Admission"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">File URL</label>
              <input
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                value={form.fileUrl}
                onChange={(e) => setForm((f) => ({ ...f, fileUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Summary</label>
              <textarea
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)] min-h-[80px]"
                value={form.summary}
                onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                placeholder="Brief description..."
              />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2 flex-wrap">
              <Button type="submit" disabled={submitting}>
                {submitting ? (editingId ? "Updating..." : "Saving...") : editingId ? "Update Notice" : "Save Notice"}
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

      <Card>
        <CardHeader>
          <CardTitle>Existing Notices ({notices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-black/60 dark:text-white/60">Loading...</div>
          ) : notices.length === 0 ? (
            <div className="text-sm text-black/60 dark:text-white/60">No notices yet.</div>
          ) : (
            <div className="grid gap-3">
              {notices.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{n.title}</div>
                    <div className="text-xs text-black/60 dark:text-white/60 mt-0.5">
                      {n.dateISO}{n.category ? ` · ${n.category}` : ""}
                    </div>
                    {n.summary && (
                      <div className="text-xs text-black/50 dark:text-white/50 mt-1">{n.summary}</div>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(n)}
                      className="text-xs text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(n.id)}
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