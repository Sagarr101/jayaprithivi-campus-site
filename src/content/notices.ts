export type Notice = {
  id: string;
  title: string;
  dateISO: string;
  category?: "Admissions" | "Exams" | "Scholarship" | "General";
  summary?: string;
  fileUrl?: string;
};

export const notices: Notice[] = [
  {
    id: "admission-open",
    title: "Admissions Open (New Intake)",
    dateISO: "2026-03-20",
    category: "Admissions",
    summary:
      "Admission form distribution and submission dates are now available.",
  },
  {
    id: "exam-form",
    title: "Exam Form Fill-up Notice",
    dateISO: "2026-03-28",
    category: "Exams",
    summary: "Students are requested to complete the exam form within deadline.",
  },
  {
    id: "scholarship",
    title: "Scholarship Information",
    dateISO: "2026-04-02",
    category: "Scholarship",
    summary: "Details about merit-based and need-based scholarships.",
  },
];

