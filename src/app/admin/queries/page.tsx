"use client";

import { useEffect, useState } from 'react';

interface Query {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  createdAt: string;
}

export default function AdminQueries() {
  const [queries, setQueries] = useState<Query[]>([]);

  useEffect(() => { fetchQueries(); }, []);

  const fetchQueries = () => fetch('/api/query').then(r => r.json()).then(setQueries);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this query?')) return;
    await fetch(`/api/query/${id}`, { method: 'DELETE' });
    fetchQueries();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Queries</h1>
          <p className="text-gray-500 mt-1">Messages sent via the contact form.</p>
        </div>
        <div className="space-y-4">
          {queries.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
              <div className="text-4xl mb-3">💬</div>
              <p className="text-gray-500 font-medium">No queries yet.</p>
            </div>
          )}
          {queries.map(q => (
            <div key={q.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-lg flex-shrink-0">
                      {q.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{q.name}</h3>
                      <div className="flex gap-3 text-xs text-gray-400">
                        {q.email && <span>✉ {q.email}</span>}
                        {q.phone && <span>📞 {q.phone}</span>}
                        <span>🕒 {new Date(q.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-gray-700 text-sm mt-2">{q.message}</div>
                </div>
                <button onClick={() => handleDelete(q.id)} className="px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors flex-shrink-0">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}