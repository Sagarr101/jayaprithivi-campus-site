"use client";

import { useState } from 'react';

const programs = [
  { level: 'Plus Two', name: '+2 Management', affiliation: 'NEB', subjects: ['English', 'Nepali', 'Social Studies', 'Accountancy', 'Business Studies', 'Economics'], link: 'https://neb.gov.np/curriculum-and-textbooks/' },
  { level: 'Plus Two', name: '+2 Humanities', affiliation: 'NEB', subjects: ['English', 'Nepali', 'Social Studies', 'History', 'Geography', 'Psychology'], link: 'https://neb.gov.np/curriculum-and-textbooks/' },
  { level: 'Plus Two', name: '+2 Education', affiliation: 'NEB', subjects: ['English', 'Nepali', 'Social Studies', 'Educational Psychology', 'Teaching Methods', 'Curriculum Development'], link: 'https://neb.gov.np/curriculum-and-textbooks/' },
  { level: 'Bachelor', name: 'BA', affiliation: 'TU', subjects: ['English', 'Nepali', 'History', 'Sociology', 'Political Science', 'Economics'], link: 'https://tribhuvan-university.edu.np/syllabus' },
  { level: 'Bachelor', name: 'BBS', affiliation: 'TU', subjects: ['Business English', 'Business Mathematics', 'Principles of Management', 'Microeconomics', 'Financial Accounting', 'Business Communication'], link: 'https://tribhuvan-university.edu.np/syllabus' },
  { level: 'Bachelor', name: 'BEd', affiliation: 'TU', subjects: ['English Language Teaching', 'Educational Psychology', 'Curriculum and Instruction', 'Classroom Management', 'Assessment and Evaluation', 'Educational Technology'], link: 'https://tribhuvan-university.edu.np/syllabus' },
  { level: 'Master', name: 'MA Rural Development', affiliation: 'TU', subjects: ['Rural Sociology', 'Development Economics', 'Project Management', 'Research Methods', 'Sustainable Development', 'Policy Analysis'], link: 'https://tribhuvan-university.edu.np/syllabus' },
];

export default function SyllabusPage() {
  const [level, setLevel] = useState('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);

  const filteredPrograms = programs.filter(p => {
    const matchesLevel = level === 'All' || p.level === level;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.subjects.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Syllabus</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search programs or subjects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />
        <div className="flex space-x-2">
          {['All', 'Plus Two', 'Bachelor', 'Master'].map(l => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-4 py-2 rounded ${level === l ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredPrograms.map((p, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <span className={`px-2 py-1 rounded text-xs ${p.affiliation === 'NEB' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {p.affiliation}
                </span>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="px-3 py-1 bg-gray-600 text-white rounded"
                >
                  {expanded === i ? 'Hide Subjects' : 'Show Subjects'}
                </button>
                <a href={p.link} target="_blank" className="px-3 py-1 bg-indigo-600 text-white rounded">View Official Syllabus</a>
              </div>
            </div>
            {expanded === i && (
              <ul className="list-disc list-inside">
                {p.subjects.map(s => <li key={s}>{s}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}