export type StaffRole =
  | "Campus Chief"
  | "Assistant Campus Chief"
  | "Program Coordinator"
  | "Lecturer"
  | "Teaching Assistant"
  | "Administration"
  | "Account"
  | "Library"
  | "Support Staff";

export type StaffMember = {
  id: string;
  name: string;
  role: StaffRole;
  department?: string;
  qualification?: string;
  email?: string;
  phone?: string;
  photoSrc?: string;
};

export const staffMembers: StaffMember[] = [
  {
    id: "campus-chief",
    name: "Mr Dirgha Raj Pandit",
    role: "Campus Chief",
    qualification: "Campus Chief",
    email: "pdirgha14@gmail.com",
  },
  {
    id: "asst-chief",
    name: "Mr./Ms. [Full Name]",
    role: "Assistant Campus Chief",
    qualification: "MPhil / Master's",
  },
  {
    id: "coord-bbm",
    name: "Mr./Ms. [Full Name]",
    role: "Program Coordinator",
    department: "BBM",
    qualification: "Master's",
  },
  {
    id: "lecturer-1",
    name: "Mr./Ms. [Full Name]",
    role: "Lecturer",
    department: "Education",
    qualification: "Master's",
  },
  {
    id: "admin-1",
    name: "Mr./Ms. [Full Name]",
    role: "Administration",
  },
  {
    id: "account-1",
    name: "Mr./Ms. [Full Name]",
    role: "Account",
  },
  {
    id: "library-1",
    name: "Mr./Ms. [Full Name]",
    role: "Library",
  },
  {
    id: "support-1",
    name: "Mr./Ms. [Full Name]",
    role: "Support Staff",
  },
];

