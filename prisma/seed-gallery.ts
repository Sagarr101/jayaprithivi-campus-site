import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const photos = [
    { title: "Campus Statue Ceremony", category: "Events", imageUrl: "/gallery/WhatsApp Image 2026-03-10 at 12.54.25 AM.jpeg", description: "Statue worship ceremony at campus" },
    { title: "Admission Open 2026", category: "Admissions", imageUrl: "/gallery/WhatsApp Image 2026-03-10 at 12.54.26 AM.jpeg", description: "Students gathered for admission program" },
    { title: "Admission Open Group", category: "Admissions", imageUrl: "/gallery/WhatsApp Image 2026-03-10 at 12.54.26 AM (1).jpeg", description: "Group photo at admission event" },
    { title: "Heritage Building Visit", category: "Campus", imageUrl: "/gallery/WhatsApp Image 2026-03-10 at 12.54.26 AM (2).jpeg", description: "Staff visit to heritage building" },
    { title: "Campus Front View", category: "Campus", imageUrl: "/gallery/WhatsApp Image 2026-03-10 at 12.54.27 AM.jpeg", description: "Jayaprithvi Multiple Campus, Bhopur Bajhang" },
    { title: "First National Conference", category: "Events", imageUrl: "/gallery/WhatsApp Image 2026-03-10 at 12.54.27 AM (1).jpeg", description: "First National Conference May 30-31, 2025" },
    { title: "Volleyball Tournament", category: "Sports", imageUrl: "/gallery/WhatsApp Image 2026-03-10 at 12.54.28 AM.jpeg", description: "Inter-campus volleyball match" },
    { title: "Prospectus Launch", category: "Events", imageUrl: "/gallery/WhatsApp Image 2026-03-10 at 12.54.28 AM (1).jpeg", description: "Campus Prospectus Releasing Program" },
    { title: "University Foundation Day", category: "Events", imageUrl: "/gallery/WhatsApp Image 2026-03-10 at 12.54.28 AM (2).jpeg", description: "15th Foundation Day celebration" },
    { title: "Staff Meeting", category: "Staff", imageUrl: "/gallery/WhatsApp Image 2026-03-10 at 12.54.29 AM.jpeg", description: "Staff and faculty group photo" },
  ];

  for (const photo of photos) {
    await prisma.gallery.create({ data: photo });
  }

  console.log("✅ Gallery seeded successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());