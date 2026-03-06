"use client";

import { useEffect, useState } from 'react';

interface Query {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminQueries() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/query')
      .then(r => r.json())
      .then(setQueries);
  }, []);

  const handleMarkResolved = async (id: number) => {
    await fetch(`/api/query/${id}`, { method: 'PATCH' });
    setQueries(qs => qs.map(q => q.id === id ? { ...q, status: q.status === 'pending' ? 'resolved' : 'pending' } : q));
  };

  const filteredQueries = filter === 'all' ? queries : queries.filter(q => q.status === filter);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <a href="/admin/dashboard" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Dashboard</a>
          <a href="/admin/queries" className="block px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700">Queries</a>
          <a href="/admin/admissions" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Admissions</a>
          <a href="/admin/notices" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Notices</a>
          <a href="/admin/staff" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Staff</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Queries</h1>

        <div className="mb-4">
          <select value={filter} onChange={e => setFilter(e.target.value)} className="border rounded p-2">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredQueries.map(q => (
                <tr key={q.id}>
                  <td className="px-6 py-4">{q.name}</td>
                  <td className="px-6 py-4">{q.email}</td>
                  <td className="px-6 py-4">{q.message}</td>
                  <td className="px-6 py-4">{new Date(q.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${q.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleMarkResolved(q.id)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      {q.status === 'pending' ? 'Mark Resolved' : 'Mark Pending'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}