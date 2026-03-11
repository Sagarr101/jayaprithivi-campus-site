"use client";

import { useEffect, useState } from 'react';

interface Admission {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  program?: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);

  useEffect(() => { fetchAdmissions(); }, []);

  const fetchAdmissions = () => fetch('/api/admissions').then(r => r.json()).then(setAdmissions);

  const handleStatus = async (id: number, status: string) => {
    await fetch(`/api/admissions/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    fetchAdmissions();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this admission?')) return;
    await fetch(`/api/admissions/${id}`, { method: 'DELETE' });
    fetchAdmissions();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Admissions</h1>
          <p className="text-gray-500 mt-1">Review and manage student admission applications.</p>
        </div>
        <div className="space-y-4">
          {admissions.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
              <div className="text-4xl mb-3">🎓</div>
              <p className="text-gray-500 font-medium">No admissions yet.</p>
            </div>
          )}
          {admissions.map(a => (
            <div key={a.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{a.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${statusColors[a.status] || 'bg-gray-100 text-gray-700'}`}>{a.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    {a.email && <span>✉ {a.email}</span>}
                    {a.phone && <span>📞 {a.phone}</span>}
                    {a.program && <span>📚 {a.program}</span>}
                    <span>🕒 {new Date(a.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0 items-center">
                  <select value={a.status} onChange={e => handleStatus(a.id, e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button onClick={() => handleDelete(a.id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 