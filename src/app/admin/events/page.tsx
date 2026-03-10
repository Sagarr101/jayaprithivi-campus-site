"use client";

import { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  time?: string;
  location?: string;
  type?: string;
  description?: string;
}

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white placeholder:text-gray-400 transition-all";

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState({ title: '', date: '', time: '', location: '', type: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = () => fetch('/api/events').then(r => r.json()).then(setEvents);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/events/${editingId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setEditingId(null);
    } else {
      await fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setForm({ title: '', date: '', time: '', location: '', type: '', description: '' });
    fetchEvents();
  };

  const handleEdit = (ev: Event) => {
    setForm({ title: ev.title, date: ev.date, time: ev.time || '', location: ev.location || '', type: ev.type || '', description: ev.description || '' });
    setEditingId(ev.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this event?')) return;
    await fetch(`/api/events/${id}`, { method: 'DELETE' });
    fetchEvents();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Events Management</h1>
          <p className="text-gray-500 mt-1">Create and manage campus events and activities.</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">{editingId ? 'Edit Event' : 'Create New Event'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Title *</label>
                <input type="text" placeholder="Event title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Date *</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputCls} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Time</label>
                <input type="text" placeholder="e.g. 10:00 AM" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Location</label>
                <input type="text" placeholder="e.g. Main Hall" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Type</label>
                <input type="text" placeholder="e.g. Seminar, Cultural, Sports" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Description</label>
                <textarea placeholder="Event description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputCls} rows={3} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                {editingId ? '✓ Update Event' : '+ Save Event'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', date: '', time: '', location: '', type: '', description: '' }); }} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="space-y-4">
          {events.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
              <div className="text-4xl mb-3">📅</div>
              <p className="text-gray-500 font-medium">No events yet. Create one above!</p>
            </div>
          )}
          {events.map(ev => (
            <div key={ev.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {ev.type && <span className="inline-block px-2.5 py-0.5 bg-purple-50 text-purple-600 text-xs font-bold rounded-full">{ev.type}</span>}
                    <span className="text-xs text-gray-400">📅 {ev.date} {ev.time && `· ⏰ ${ev.time}`}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{ev.title}</h3>
                  {ev.location && <p className="text-sm text-gray-500 mt-1">📍 {ev.location}</p>}
                  {ev.description && <p className="text-sm text-gray-600 mt-2">{ev.description}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleEdit(ev)} className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">Edit</button>
                  <button onClick={() => handleDelete(ev.id)} className="px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}