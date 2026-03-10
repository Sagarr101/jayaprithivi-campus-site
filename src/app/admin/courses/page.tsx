"use client";

import { useEffect, useState } from 'react';

interface Course {
  id: number;
  name: string;
  category: string;
  duration: string;
  department?: string;
  description?: string;
}

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white placeholder:text-gray-400 transition-all";

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState({ name: '', category: 'Undergraduate', duration: '', department: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = () => fetch('/api/courses').then(r => r.json()).then(setCourses);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/courses/${editingId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setEditingId(null);
    } else {
      await fetch('/api/courses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setForm({ name: '', category: 'Undergraduate', duration: '', department: '', description: '' });
    fetchCourses();
  };

  const handleEdit = (c: Course) => {
    setForm({ name: c.name, category: c.category, duration: c.duration, department: c.department || '', description: c.description || '' });
    setEditingId(c.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this course?')) return;
    await fetch(`/api/courses/${id}`, { method: 'DELETE' });
    fetchCourses();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Courses Management</h1>
          <p className="text-gray-500 mt-1">Add and manage academic programs offered by the campus.</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">{editingId ? 'Edit Course' : 'Add New Course'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Course Name *</label>
                <input type="text" placeholder="e.g. BBA (Bachelor of Business Administration)" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Category *</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputCls}>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Certificate">Certificate</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Duration *</label>
                <input type="text" placeholder="e.g. 4 Years" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className={inputCls} required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Department</label>
                <input type="text" placeholder="e.g. Management" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Description</label>
                <textarea placeholder="Brief description of the program..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputCls} rows={3} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                {editingId ? '✓ Update Course' : '+ Add Course'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', category: 'Undergraduate', duration: '', department: '', description: '' }); }} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.length === 0 && (
            <div className="col-span-2 bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
              <div className="text-4xl mb-3">📚</div>
              <p className="text-gray-500 font-medium">No courses yet. Add one above!</p>
            </div>
          )}
          {courses.map(c => (
            <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <span className="inline-block px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full mb-2">{c.category}</span>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{c.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">⏱ {c.duration} {c.department && `· ${c.department}`}</p>
                  {c.description && <p className="text-sm text-gray-600 mt-2">{c.description}</p>}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleEdit(c)} className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">Edit</button>
                <button onClick={() => handleDelete(c.id)} className="px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}