"use client";

import type { Metadata } from "next";
import * as React from "react";

import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = React.useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [lightbox, setLightbox] = React.useState<null | { src: string; title: string; description?: string }>(null);

  React.useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then(setGalleryItems)
      .catch(() => {
        // Fallback to empty if API fails
        setGalleryItems([]);
      });
  }, []);

  const categories = ["All", ...Array.from(new Set(galleryItems.map((g) => g.category)))];

  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <div>
      {/* Page Hero */}
      <div className="bg-indigo-900 text-white py-20 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-violet-600 text-white mb-4">
            Campus Life
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Gallery
          </h1>
          <p className="mt-4 text-white text-lg font-bold max-w-2xl mx-auto">
            A visual showcase of campus life, events, facilities, and memorable moments at {site.fullName}.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-20 bg-gray-50">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn px-5 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                ? "bg-violet-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setLightbox({ src: item.imageUrl, title: item.title, description: item.description })}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-600 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                <div className="text-lg font-bold mb-1">{item.title}</div>
                <div className="text-xs font-bold text-violet-400">{item.category}</div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/20 backdrop-blur rounded-full px-2 py-1 text-white text-xs font-bold">
                  View ↗
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.src}
              alt={lightbox.title}
              className="w-full rounded-xl shadow-2xl max-h-[80vh] object-contain"
            />
            <div className="mt-4 flex items-center justify-between">
              <div className="text-white">
                <div className="text-lg font-bold">{lightbox.title}</div>
                {lightbox.description && <div className="text-sm text-white/80 mt-1 font-bold">{lightbox.description}</div>}
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="btn bg-violet-600 text-white hover:bg-violet-700 rounded-lg px-4 py-2 font-bold transition-all"
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
