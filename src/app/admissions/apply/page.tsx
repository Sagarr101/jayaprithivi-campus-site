"use client";

import { useState } from 'react';

const courses = ['+2 Management', '+2 Humanities', '+2 Education', 'BA', 'BBS', 'BEd', 'MA Rural Development'];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    course: '',
    prevSchool: '',
    marks: '',
    document: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v) formData.append(k, v);
    });
    const res = await fetch('/api/admissions', { method: 'POST', body: formData });
    if (res.ok) {
      setSuccess(true);
    } else {
      alert('Error submitting application');
    }
    setSubmitting(false);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Application Submitted!</h1>
        <p>Thank you for applying. We will review your application and get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Apply for Admission</h1>

      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-indigo-600 h-2.5 rounded-full" style={{width: `${(step/3)*100}%`}}></div>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span>Personal Info</span>
          <span>Course Selection</span>
          <span>Document Upload</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} className="w-full p-3 border rounded" required />
            <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full p-3 border rounded" required />
            <input type="tel" placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full p-3 border rounded" required />
            <input type="date" placeholder="Date of Birth" value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} className="w-full p-3 border rounded" required />
            <textarea placeholder="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full p-3 border rounded" required />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <select value={form.course} onChange={e => setForm({...form, course: e.target.value})} className="w-full p-3 border rounded" required>
              <option value="">Select Course</option>
              {courses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="text" placeholder="Previous School" value={form.prevSchool} onChange={e => setForm({...form, prevSchool: e.target.value})} className="w-full p-3 border rounded" required />
            <input type="text" placeholder="Marks/Grades" value={form.marks} onChange={e => setForm({...form, marks: e.target.value})} className="w-full p-3 border rounded" required />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <input type="file" onChange={e => setForm({...form, document: e.target.files?.[0] || null})} className="w-full p-3 border rounded" required />
            <p className="text-sm text-gray-600">Upload your academic documents (PDF, max 5MB)</p>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && <button type="button" onClick={handlePrev} className="px-4 py-2 bg-gray-600 text-white rounded">Previous</button>}
          {step < 3 && <button type="button" onClick={handleNext} className="px-4 py-2 bg-indigo-600 text-white rounded">Next</button>}
          {step === 3 && <button type="submit" disabled={submitting} className="px-4 py-2 bg-green-600 text-white rounded">{submitting ? 'Submitting...' : 'Submit Application'}</button>}
        </div>
      </form>
    </div>
  );
}