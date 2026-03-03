export type Event = {
  id: string;
  title: string;
  dateISO: string;
  time?: string;
  location?: string;
  description?: string;
  type?: "Academic" | "Sports" | "Cultural" | "Notice";
};

export const events: Event[] = [
  {
    id: "orientation",
    title: "New Student Orientation",
    dateISO: "2026-04-15",
    time: "11:00 AM",
    location: "Campus Hall",
    type: "Academic",
    description:
      "Welcome session covering programs, rules, library services, and student support.",
  },
  {
    id: "workshop-it",
    title: "Career & Skills Workshop",
    dateISO: "2026-05-05",
    time: "10:30 AM",
    location: "Seminar Room",
    type: "Academic",
    description:
      "A practical workshop on CV writing, interview preparation, and digital skills.",
  },
  {
    id: "sports-week",
    title: "Annual Sports Week",
    dateISO: "2026-06-10",
    location: "Campus Ground",
    type: "Sports",
    description: "Inter-class tournaments and friendly matches.",
  },
];

