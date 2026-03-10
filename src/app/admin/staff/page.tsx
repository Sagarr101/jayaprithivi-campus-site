"use client";

import { useEffect, useState } from 'react';

interface Staff {
  id: number;
  name: string;
  position: string;
  department: string;
  email?: string;
  photoUrl?: string;
  bio?: string;
}

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white placeholder:text-gray-400 transition-all";

export default function AdminStaff() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [form, setForm] = useState({ name: '', position: '', department: '', email: '', photoUrl: '', bio: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => { fetchStaff(); }, []);

  const fetchStaff = () => fetch('/api/staff').then(r => r.json()).then(setStaff);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/staff/${editingId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setEditingId(null);
    } else {
      await fetch('/api/staff', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setForm({ name: '', position: '', department: '', email: '', photoUrl: '', bio: '' });
    fetchStaff();
  };

  const handleEdit = (s: Staff) => {
    setForm({ name: s.name, position: s.position, department: s.department, email: s.email || '', photoUrl: s.photoUrl || '', bio: s.bio || '' });
    setEditingId(s.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this staff member?')) return;
    await fetch(`/api/staff/${id}`, { method: 'DELETE' });
    fetchStaff();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Staff Management</h1>
          <p className="text-gray-500 mt-1">Add, edit or remove staff members.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">{editingId ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Full Name *</label>
                <input type="text" placeholder="e.g. Ram Bahadur Thapa" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Position *</label>
                <input type="text" placeholder="e.g. Lecturer" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} className={inputCls} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Department *</label>
                <input type="text" placeholder="e.g. Science" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className={inputCls} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</label>
                <input type="email" placeholder="e.g. staff@campus.edu.np" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Photo URL</label>
                <input type="url" placeholder="https://..." value={form.photoUrl} onChange={e => setForm({ ...form, photoUrl: e.target.value })} className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Bio</label>
                <textarea placeholder="Short bio..." value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className={inputCls} rows={3} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                {editingId ? '✓ Update Staff' : '+ Add Staff'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', position: '', department: '', email: '', photoUrl: '', bio: '' }); }} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {staff.length === 0 && (
            <div className="col-span-2 bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
              <div className="text-4xl mb-3">👥</div>
              <p className="text-gray-500 font-medium">No staff members yet. Add one above!</p>
            </div>
          )}
          {staff.map(s => (
            <div key={s.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xl font-bold flex-shrink-0 overflow-hidden">
                {s.photoUrl ? <img src={s.photoUrl} alt={s.name} className="w-14 h-14 object-cover" /> : s.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg">{s.name}</h3>
                <p className="text-indigo-600 font-semibold text-sm">{s.position}</p>
                <p className="text-gray-500 text-sm">{s.department}</p>
                {s.email && <p className="text-gray-400 text-xs mt-1">✉ {s.email}</p>}
                {s.bio && <p className="text-gray-600 text-sm mt-2">{s.bio}</p>}
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleEdit(s)} className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">Edit</button>
                  <button onClick={() => handleDelete(s.id)} className="px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}