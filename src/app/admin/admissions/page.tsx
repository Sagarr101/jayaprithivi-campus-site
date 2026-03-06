"use client";

import { useEffect, useState } from 'react';

interface Admission {
  id: number;
  fullName: string;
  course: string;
  phone: string;
  status: string;
  createdAt: string;
  documentUrl?: string;
}

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);

  useEffect(() => {
    fetch('/api/admissions')
      .then(r => r.json())
      .then(setAdmissions);
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    await fetch(`/api/admissions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setAdmissions(as => as.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <a href="/admin/dashboard" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Dashboard</a>
          <a href="/admin/queries" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Queries</a>
          <a href="/admin/admissions" className="block px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700">Admissions</a>
          <a href="/admin/notices" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Notices</a>
          <a href="/admin/staff" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Staff</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Admissions</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {admissions.map(a => (
                <tr key={a.id}>
                  <td className="px-6 py-4">{a.fullName}</td>
                  <td className="px-6 py-4">{a.course}</td>
                  <td className="px-6 py-4">{a.phone}</td>
                  <td className="px-6 py-4">{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      a.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      a.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {a.documentUrl ? <a href={a.documentUrl} target="_blank" className="text-indigo-600 hover:underline">View</a> : 'N/A'}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleStatusChange(a.id, 'approved')}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(a.id, 'rejected')}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
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