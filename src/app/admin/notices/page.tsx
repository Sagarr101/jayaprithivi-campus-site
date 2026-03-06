"use client";

import { useEffect, useState } from 'react';

interface Notice {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export default function AdminNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [form, setForm] = useState({ title: '', content: '', category: 'general' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = () => {
    fetch('/api/notices')
      .then(r => r.json())
      .then(setNotices);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/notices/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setEditingId(null);
    } else {
      await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ title: '', content: '', category: 'general' });
    fetchNotices();
  };

  const handleEdit = (notice: Notice) => {
    setForm({ title: notice.title, content: notice.content, category: notice.category });
    setEditingId(notice.id);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/notices/${id}`, { method: 'DELETE' });
    fetchNotices();
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <a href="/admin/dashboard" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Dashboard</a>
          <a href="/admin/queries" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Queries</a>
          <a href="/admin/admissions" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Admissions</a>
          <a href="/admin/notices" className="block px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700">Notices</a>
          <a href="/admin/staff" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Staff</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Notices</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="border rounded p-2"
              required
            />
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="border rounded p-2"
            >
              <option value="general">General</option>
              <option value="academic">Academic</option>
              <option value="event">Event</option>
            </select>
          </div>
          <textarea
            placeholder="Content"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            className="border rounded p-2 w-full mb-4"
            rows={4}
            required
          />
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            {editingId ? 'Update Notice' : 'Add Notice'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => { setEditingId(null); setForm({ title: '', content: '', category: 'general' }); }}
              className="ml-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
        </form>

        {/* List */}
        <div className="space-y-4">
          {notices.map(n => (
            <div key={n.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold">{n.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{n.category} - {new Date(n.createdAt).toLocaleDateString()}</p>
              <p className="mb-4">{n.content}</p>
              <div className="space-x-2">
                <button onClick={() => handleEdit(n)} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
                <button onClick={() => handleDelete(n.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}