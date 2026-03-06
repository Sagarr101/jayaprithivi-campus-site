"use client";

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
    </div>
  );
}

interface Query {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface Admission {
  id: number;
  fullName: string;
  course: string;
  phone: string;
  createdAt: string;
}

interface ChartData {
  label: string;
  count: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    queries: 0,
    admissions: 0,
    staff: 0,
    notices: 0,
  });
  const [recentQueries, setRecentQueries] = useState<Query[]>([]);
  const [recentAdmissions, setRecentAdmissions] = useState<Admission[]>([]);
  const [admissionsChart, setAdmissionsChart] = useState<ChartData[]>([]);
  const [queriesChart, setQueriesChart] = useState<ChartData[]>([]);

  useEffect(() => {
    // Fetch stats
    Promise.all([
      fetch('/api/query').then(r => r.json()),
      fetch('/api/admissions').then(r => r.json()),
      fetch('/api/staff').then(r => r.json()),
      fetch('/api/notices').then(r => r.json()),
    ]).then(([queries, admissions, staff, notices]) => {
      setStats({
        queries: queries.length,
        admissions: admissions.length,
        staff: staff.length,
        notices: notices.length,
      });
      setRecentQueries(queries.slice(0, 5));
      setRecentAdmissions(admissions.slice(0, 5));
      // Mock chart data - in real app, aggregate from data
      setAdmissionsChart([
        { label: 'Jan', count: 10 },
        { label: 'Feb', count: 15 },
        { label: 'Mar', count: 20 },
      ]);
      setQueriesChart([
        { label: 'Week 1', count: 5 },
        { label: 'Week 2', count: 8 },
        { label: 'Week 3', count: 12 },
      ]);
    });
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <a href="/admin/dashboard" className="block px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700">Dashboard</a>
          <a href="/admin/queries" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Queries</a>
          <a href="/admin/admissions" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Admissions</a>
          <a href="/admin/notices" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Notices</a>
          <a href="/admin/staff" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Staff</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Queries" value={stats.queries} icon="💬" />
          <StatCard title="Total Admissions" value={stats.admissions} icon="📝" />
          <StatCard title="Total Staff" value={stats.staff} icon="👥" />
          <StatCard title="Total Notices" value={stats.notices} icon="📢" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Admissions per Month</h3>
            <LineChart width={400} height={200} data={admissionsChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4F46E5" />
            </LineChart>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Queries per Week</h3>
            <BarChart width={400} height={200} data={queriesChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#06B6D4" />
            </BarChart>
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Queries</h3>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentQueries.map(q => (
                  <tr key={q.id}>
                    <td>{q.name}</td>
                    <td>{q.email}</td>
                    <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Admissions</h3>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Course</th>
                  <th className="text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentAdmissions.map(a => (
                  <tr key={a.id}>
                    <td>{a.fullName}</td>
                    <td>{a.course}</td>
                    <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}