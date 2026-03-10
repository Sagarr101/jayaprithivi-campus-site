"use client";

import { useEffect, useState } from 'react';

interface Notice {
  id: number;
  title: string;
  summary?: string;
  content?: string;
  category?: string;
  dateISO: string;
}

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white placeholder:text-gray-400 transition-all";

const categoryColors: Record<string, string> = {
  general: 'bg-gray-100 text-gray-700',
  academic: 'bg-blue-100 text-blue-700',
  exam: 'bg-orange-100 text-orange-700',
  event: 'bg-purple-100 text-purple-700',
  admission: 'bg-green-100 text-green-700',
};

export default function AdminNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [form, setForm] = useState({ title: '', summary: '', content: '', category: 'general', dateISO: new Date().toISOString().split('T')[0] });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => { fetchNotices(); }, []);

  const fetchNotices = () => fetch('/api/notices').then(r => r.json()).then(setNotices);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/notices/${editingId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setEditingId(null);
    } else {
      await fetch('/api/notices', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setForm({ title: '', summary: '', content: '', category: 'general', dateISO: new Date().toISOString().split('T')[0] });
    fetchNotices();
  };

  const handleEdit = (n: Notice) => {
    setForm({ title: n.title, summary: n.summary || '', content: n.content || '', category: n.category || 'general', dateISO: n.dateISO });
    setEditingId(n.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this notice?')) return;
    await fetch(`/api/notices/${id}`, { method: 'DELETE' });
    fetchNotices();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Notices Management</h1>
          <p className="text-gray-500 mt-1">Publish and manage campus notices and announcements.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">{editingId ? 'Edit Notice' : 'Add New Notice'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Title *</label>
                <input type="text" placeholder="Notice title..." value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputCls}>
                  <option value="general">General</option>
                  <option value="academic">Academic</option>
                  <option value="exam">Exam</option>
                  <option value="event">Event</option>
                  <option value="admission">Admission</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Date *</label>
                <input type="date" value={form.dateISO} onChange={e => setForm({ ...form, dateISO: e.target.value })} className={inputCls} required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Summary</label>
                <textarea placeholder="Short summary..." value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} className={inputCls} rows={2} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Full Content</label>
                <textarea placeholder="Full notice content..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className={inputCls} rows={4} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                {editingId ? '✓ Update Notice' : '+ Publish Notice'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', summary: '', content: '', category: 'general', dateISO: new Date().toISOString().split('T')[0] }); }} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="space-y-4">
          {notices.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
              <div className="text-4xl mb-3">📢</div>
              <p className="text-gray-500 font-medium">No notices yet. Publish one above!</p>
            </div>
          )}
          {notices.map(n => (
            <div key={n.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${categoryColors[n.category || 'general']}`}>{n.category}</span>
                    <span className="text-xs text-gray-400">{n.dateISO}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{n.title}</h3>
                  {n.summary && <p className="text-gray-600 text-sm mt-1">{n.summary}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleEdit(n)} className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">Edit</button>
                  <button onClick={() => handleDelete(n.id)} className="px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}