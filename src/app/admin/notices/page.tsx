"use client";

import { useEffect, useState } from 'react';

interface Notice {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white placeholder:text-gray-400 transition-all";

const categoryColors: Record<string, string> = {
  general:   'bg-gray-100 text-gray-700',
  academic:  'bg-blue-100 text-blue-700',
  exam:      'bg-orange-100 text-orange-700',
  event:     'bg-purple-100 text-purple-700',
  admission: 'bg-green-100 text-green-700',
};

const emptyForm = { title: '', content: '', category: 'general' };

export default function AdminNotices() {
  const [notices, setNotices]   = useState<Notice[]>([]);
  const [form, setForm]         = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  useEffect(() => { fetchNotices(); }, []);

  const fetchNotices = () =>
    fetch('/api/notices').then(r => r.json()).then(setNotices);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url    = editingId ? `/api/notices/${editingId}` : '/api/notices';
      const method = editingId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
        return;
      }

      setForm(emptyForm);
      setEditingId(null);
      fetchNotices();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (n: Notice) => {
    setForm({ title: n.title, content: n.content, category: n.category });
    setEditingId(n.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this notice?')) return;
    await fetch(`/api/notices/${id}`, { method: 'DELETE' });
    fetchNotices();
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-10 px-4">

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Notices Management</h1>
          <p className="text-gray-500 mt-1">Publish and manage campus notices and announcements.</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {editingId ? 'Edit Notice' : 'Add New Notice'}
          </h2>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  placeholder="Notice title..."
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className={inputCls}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className={inputCls}
                >
                  <option value="general">General</option>
                  <option value="academic">Academic</option>
                  <option value="exam">Exam</option>
                  <option value="event">Event</option>
                  <option value="admission">Admission</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Content *
                </label>
                <textarea
                  placeholder="Full notice content..."
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  className={inputCls}
                  rows={5}
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-60"
              >
                {loading ? 'Saving...' : editingId ? '✓ Update Notice' : '+ Publish Notice'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Notice list */}
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
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${categoryColors[n.category] ?? categoryColors.general}`}>
                      {n.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(n.createdAt).toLocaleDateString('en-NP', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{n.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{n.content}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleEdit(n)} className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(n.id)} className="px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
