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

export default function AdminGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState({ title: '', description: '', category: 'general' });
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = () => {
    fetch('/api/admin/gallery')
      .then(r => r.json())
      .then(setGallery);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('image', image);

    await fetch('/api/admin/gallery', {
      method: 'POST',
      body: formData,
    });

    setForm({ title: '', description: '', category: 'general' });
    setImage(null);
    fetchGallery();
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
    fetchGallery();
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
          <a href="/admin/staff" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Staff</a>
          <a href="/admin/gallery" className="block px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700">Gallery</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Gallery</h1>

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
              <option value="campus">Campus</option>
              <option value="events">Events</option>
              <option value="academics">Academics</option>
              <option value="sports">Sports</option>
            </select>
          </div>
          <textarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="border rounded p-2 w-full mb-4"
            rows={3}
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files?.[0] || null)}
            className="border rounded p-2 mb-4"
            required
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Add Image
          </button>
        </form>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded mb-2" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-xs text-gray-500">{item.category}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}