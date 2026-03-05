"use client";

import type { Metadata } from "next";
import * as React from "react";

import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1024&auto=format&fit=crop",
    title: "Campus View",
    category: "Campus",
  },
  {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1024&auto=format&fit=crop",
    title: "Graduation Day",
    category: "Events",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1024&auto=format&fit=crop",
    title: "Classrooms",
    category: "Academics",
  },
  {
    src: "https://images.unsplash.com/photo-1532094349884-543559b979dc?q=80&w=1024&auto=format&fit=crop",
    title: "Laboratory",
    category: "Labs",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1024&auto=format&fit=crop",
    title: "Computer Lab",
    category: "Labs",
  },
  {
    src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1024&auto=format&fit=crop",
    title: "Cultural Program",
    category: "Events",
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1024&auto=format&fit=crop",
    title: "Seminar",
    category: "Academics",
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1024&auto=format&fit=crop",
    title: "Sports Ground",
    category: "Sports",
  },
  {
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1024&auto=format&fit=crop",
    title: "Library",
    category: "Campus",
  },
];

const categories = ["All", ...Array.from(new Set(galleryItems.map((g) => g.category)))];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [lightbox, setLightbox] = React.useState<null | { src: string; title: string }>(null);

  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <div>
      {/* Page Hero */}
      <div className="bg-[color:var(--primary)] text-white py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[color:var(--accent)]/20 text-[color:var(--accent)] mb-4">
            Campus Life
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Gallery
          </h1>
          <p className="mt-4 text-white/75 text-lg max-w-2xl">
            A visual showcase of campus life, events, facilities, and memorable moments at {site.fullName}.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                  ? "bg-[color:var(--primary)] text-white shadow"
                  : "bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/20"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <button
              key={i}
              onClick={() => setLightbox({ src: item.src, title: item.title })}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                <div className="text-sm font-semibold">{item.title}</div>
                <div className="text-xs text-[color:var(--accent)]">{item.category}</div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/20 backdrop-blur rounded-full px-2 py-1 text-white text-xs">
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
              className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain"
            />
            <div className="mt-4 flex items-center justify-between">
              <div className="text-white font-semibold">{lightbox.title}</div>
              <button
                onClick={() => setLightbox(null)}
                className="text-white/70 hover:text-white text-sm underline"
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
