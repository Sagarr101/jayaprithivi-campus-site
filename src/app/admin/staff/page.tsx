"use client";

import * as React from "react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

type Staff = {
  id: number;
  name: string;
  role: string;
  department: string | null;
  qualification: string | null;
  email: string | null;
  phone: string | null;
};

export default function AdminStaffPage() {
  const [staff, setStaff] = React.useState<Staff[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [form, setForm] = React.useState({
    name: "",
    role: "",
    department: "",
    qualification: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState("");

  async function fetchStaff() {
    const res = await fetch("/api/admin/staff");
    const data = await res.json();
    setStaff(data.data?.staff || []);
    setLoading(false);
  }

  React.useEffect(() => {
    fetchStaff();
  }, []);

  function startEdit(s: Staff) {
    setEditingId(s.id);
    setForm({
      name: s.name,
      role: s.role,
      department: s.department ?? "",
      qualification: s.qualification ?? "",
      email: s.email ?? "",
      phone: s.phone ?? "",
    });
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ name: "", role: "", department: "", qualification: "", email: "", phone: "" });
    setMessage("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { id: editingId, ...form } : form;

    const res = await fetch("/api/admin/staff", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        department: body.department || undefined,
        qualification: body.qualification || undefined,
        email: body.email || undefined,
        phone: body.phone || undefined,
      }),
    });
    const data = await res.json();
    if (data.ok) {
      setMessage(editingId ? "Staff updated successfully!" : "Staff added successfully!");
      setForm({ name: "", role: "", department: "", qualification: "", email: "", phone: "" });
      setEditingId(null);
      await fetchStaff();
    } else {
      setMessage(data.error ?? "Something went wrong.");
    }
    setSubmitting(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this staff member?")) return;
    await fetch(`/api/admin/staff?id=${id}`, { method: "DELETE" });
    await fetchStaff();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Staff</h1>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Staff Member" : "Add Staff Member"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                required
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role *</label>
              <input
                required
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                placeholder="Campus Chief, Lecturer, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <input
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                value={form.department}
                onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                placeholder="e.g., Education, Management"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Qualification</label>
              <input
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                value={form.qualification}
                onChange={(e) => setForm((f) => ({ ...f, qualification: e.target.value }))}
                placeholder="e.g., M.Ed., PhD"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+977-..."
              />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2 flex-wrap">
              <Button type="submit" disabled={submitting}>
                {submitting ? (editingId ? "Updating..." : "Saving...") : editingId ? "Update Staff" : "Save Staff"}
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
          <CardTitle>Existing Staff ({staff.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-black/60 dark:text-white/60">Loading...</div>
          ) : staff.length === 0 ? (
            <div className="text-sm text-black/60 dark:text-white/60">No staff added yet.</div>
          ) : (
            <div className="grid gap-3">
              {staff.map((s) => (
                <div
                  key={s.id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{s.name}</div>
                    <div className="text-xs text-black/60 dark:text-white/60 mt-0.5">
                      {s.role}{s.department ? ` · ${s.department}` : ""}
                    </div>
                    {s.qualification && (
                      <div className="text-xs text-black/50 dark:text-white/50 mt-1">{s.qualification}</div>
                    )}
                    {(s.email || s.phone) && (
                      <div className="text-xs text-black/50 dark:text-white/50 mt-1">
                        {s.email}{s.email && s.phone ? " · " : ""}{s.phone}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(s)}
                      className="text-xs text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
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