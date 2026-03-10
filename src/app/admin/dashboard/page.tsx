"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ queries: 0, admissions: 0, staff: 0, notices: 0 });
  const [recentQueries, setRecentQueries] = useState<any[]>([]);
  const [recentAdmissions, setRecentAdmissions] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/query').then(r => r.json()).then(data => {
      setStats(s => ({ ...s, queries: data.length }));
      setRecentQueries(data.slice(0, 5));
    });
    fetch('/api/admissions').then(r => r.json()).then(data => {
      setStats(s => ({ ...s, admissions: data.length }));
      setRecentAdmissions(data.slice(0, 5));
    });
    fetch('/api/staff').then(r => r.json()).then(data => setStats(s => ({ ...s, staff: data.length })));
    fetch('/api/notices').then(r => r.json()).then(data => setStats(s => ({ ...s, notices: data.length })));
  }, []);

  const statCards = [
    { label: 'Total Queries', value: stats.queries, icon: '💬', color: 'bg-blue-50 text-blue-600', href: '/admin/queries' },
    { label: 'Total Admissions', value: stats.admissions, icon: '🎓', color: 'bg-green-50 text-green-600', href: '/admin/admissions' },
    { label: 'Total Staff', value: stats.staff, icon: '👥', color: 'bg-purple-50 text-purple-600', href: '/admin/staff' },
    { label: 'Total Notices', value: stats.notices, icon: '📢', color: 'bg-orange-50 text-orange-600', href: '/admin/notices' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link href={card.href} key={card.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center text-2xl mb-4`}>
              {card.icon}
            </div>
            <div className="text-3xl font-extrabold text-gray-900 mb-1">{card.value}</div>
            <div className="text-sm text-gray-500 font-medium">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Queries */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Queries</h2>
            <Link href="/admin/queries" className="text-sm text-indigo-600 font-semibold hover:underline">View all</Link>
          </div>
          {recentQueries.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="text-3xl mb-2">💬</div>
              <p>No queries yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentQueries.map((q: any) => (
                <div key={q.id} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm flex-shrink-0">
                    {q.name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{q.name}</p>
                    <p className="text-gray-500 text-xs truncate">{q.message}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{new Date(q.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Admissions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Admissions</h2>
            <Link href="/admin/admissions" className="text-sm text-indigo-600 font-semibold hover:underline">View all</Link>
          </div>
          {recentAdmissions.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="text-3xl mb-2">🎓</div>
              <p>No admissions yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentAdmissions.map((a: any) => (
                <div key={a.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center text-sm flex-shrink-0">
                    {a.name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{a.name}</p>
                    <p className="text-gray-500 text-xs">{a.program || 'No program'}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    a.status === 'approved' ? 'bg-green-100 text-green-700' :
                    a.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{a.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '/admin/notices', label: 'Add Notice', icon: '📢' },
            { href: '/admin/staff', label: 'Add Staff', icon: '👥' },
            { href: '/admin/events', label: 'Add Event', icon: '📅' },
            { href: '/admin/gallery', label: 'Upload Photo', icon: '🖼️' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-semibold text-sm text-gray-700">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}