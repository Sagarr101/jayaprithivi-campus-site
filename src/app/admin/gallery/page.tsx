"use client";

import { useEffect, useState } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white placeholder:text-gray-400 transition-all";

export default function AdminGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState({ title: '', description: '', category: 'general' });
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => { fetchGallery(); }, []);

  const fetchGallery = () => fetch('/api/admin/gallery').then(r => r.json()).then(setGallery);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('image', image);
    await fetch('/api/admin/gallery', { method: 'POST', body: formData });
    setForm({ title: '', description: '', category: 'general' });
    setImage(null);
    fetchGallery();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return;
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
    fetchGallery();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Gallery Management</h1>
          <p className="text-gray-500 mt-1">Upload and manage campus photos.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Upload New Image</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Title *</label>
                <input type="text" placeholder="Image title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputCls}>
                  <option value="general">General</option>
                  <option value="campus">Campus</option>
                  <option value="events">Events</option>
                  <option value="academics">Academics</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Description</label>
                <textarea placeholder="Optional description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputCls} rows={2} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Image File *</label>
                <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 file:font-semibold hover:file:bg-indigo-100" required />
              </div>
            </div>
            <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
              Upload Image
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.length === 0 && (
            <div className="col-span-3 bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
              <div className="text-4xl mb-3">🖼️</div>
              <p className="text-gray-500 font-medium">No images yet. Upload one above!</p>
            </div>
          )}
          {gallery.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">{item.category}</span>
                {item.description && <p className="text-sm text-gray-500 mt-2">{item.description}</p>}
                <button onClick={() => handleDelete(item.id)} className="mt-3 px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}