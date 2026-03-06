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

export default function AdminStaff() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [form, setForm] = useState({ name: '', position: '', department: '', email: '', photoUrl: '', bio: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = () => {
    fetch('/api/staff')
      .then(r => r.json())
      .then(setStaff);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/staff/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setEditingId(null);
    } else {
      await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: '', position: '', department: '', email: '', photoUrl: '', bio: '' });
    fetchStaff();
  };

  const handleEdit = (s: Staff) => {
    setForm({ name: s.name, position: s.position, department: s.department, email: s.email || '', photoUrl: s.photoUrl || '', bio: s.bio || '' });
    setEditingId(s.id);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/staff/${id}`, { method: 'DELETE' });
    fetchStaff();
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
          <a href="/admin/notices" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Notices</a>
          <a href="/admin/staff" className="block px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700">Staff</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Staff</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Position"
              value={form.position}
              onChange={e => setForm({ ...form, position: e.target.value })}
              className="border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Department"
              value={form.department}
              onChange={e => setForm({ ...form, department: e.target.value })}
              className="border rounded p-2"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="border rounded p-2"
            />
            <input
              type="url"
              placeholder="Photo URL"
              value={form.photoUrl}
              onChange={e => setForm({ ...form, photoUrl: e.target.value })}
              className="border rounded p-2"
            />
          </div>
          <textarea
            placeholder="Bio"
            value={form.bio}
            onChange={e => setForm({ ...form, bio: e.target.value })}
            className="border rounded p-2 w-full mb-4"
            rows={3}
          />
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            {editingId ? 'Update Staff' : 'Add Staff'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => { setEditingId(null); setForm({ name: '', position: '', department: '', email: '', photoUrl: '', bio: '' }); }}
              className="ml-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
        </form>

        {/* List */}
        <div className="space-y-4">
          {staff.map(s => (
            <div key={s.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold">{s.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{s.position} - {s.department}</p>
              {s.email && <p className="text-sm">Email: {s.email}</p>}
              {s.bio && <p className="mb-4">{s.bio}</p>}
              <div className="space-x-2">
                <button onClick={() => handleEdit(s)} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
                <button onClick={() => handleDelete(s.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}