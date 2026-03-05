"use client";

import * as React from "react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

type Event = {
  id: number;
  title: string;
  dateISO: string;
  time: string | null;
  location: string | null;
  type: string | null;
  description: string | null;
};

export default function AdminEventsPage() {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [form, setForm] = React.useState({
    title: "",
    dateISO: "",
    time: "",
    location: "",
    type: "",
    description: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState("");

  async function fetchEvents() {
    const res = await fetch("/api/admin/events");
    const data = await res.json();
    setEvents(data);
    setLoading(false);
  }

  React.useEffect(() => {
    fetchEvents();
  }, []);

  function startEdit(event: Event) {
    setEditingId(event.id);
    setForm({
      title: event.title,
      dateISO: event.dateISO,
      time: event.time ?? "",
      location: event.location ?? "",
      type: event.type ?? "",
      description: event.description ?? "",
    });
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ title: "", dateISO: "", time: "", location: "", type: "", description: "" });
    setMessage("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { id: editingId, ...form } : form;

    const res = await fetch("/api/admin/events", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        time: body.time || undefined,
        location: body.location || undefined,
        type: body.type || undefined,
        description: body.description || undefined,
      }),
    });
    const data = await res.json();
    if (data.ok) {
      setMessage(editingId ? "Event updated successfully!" : "Event added successfully!");
      setForm({ title: "", dateISO: "", time: "", location: "", type: "", description: "" });
      setEditingId(null);
      await fetchEvents();
    } else {
      setMessage(data.error ?? "Something went wrong.");
    }
    setSubmitting(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
    await fetchEvents();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Events</h1>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Event" : "Create Event"}</CardTitle>
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
                placeholder="Event title"
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
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                value={form.time}
                onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                placeholder="e.g., 10:00 AM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="e.g., Main Hall"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <input
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                placeholder="e.g., Seminar, Cultural, Sports"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)] min-h-[80px]"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Event description..."
              />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2 flex-wrap">
              <Button type="submit" disabled={submitting}>
                {submitting ? (editingId ? "Updating..." : "Saving...") : editingId ? "Update Event" : "Save Event"}
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
          <CardTitle>Existing Events ({events.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-black/60 dark:text-white/60">Loading...</div>
          ) : events.length === 0 ? (
            <div className="text-sm text-black/60 dark:text-white/60">No events yet.</div>
          ) : (
            <div className="grid gap-3">
              {events.map((e) => (
                <div
                  key={e.id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{e.title}</div>
                    <div className="text-xs text-black/60 dark:text-white/60 mt-0.5">
                      {e.dateISO}{e.time ? ` · ${e.time}` : ""}{e.type ? ` · ${e.type}` : ""}
                    </div>
                    {e.location && (
                      <div className="text-xs text-black/50 dark:text-white/50 mt-1">📍 {e.location}</div>
                    )}
                    {e.description && (
                      <div className="text-xs text-black/50 dark:text-white/50 mt-1">{e.description}</div>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(e)}
                      className="text-xs text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(e.id)}
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