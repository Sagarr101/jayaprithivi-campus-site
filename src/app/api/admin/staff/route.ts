import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.staff.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | {
        name?: string;
        role?: string;
        department?: string;
        qualification?: string;
        email?: string;
        phone?: string;
      }
    | null;

  if (!body?.name || !body?.role) {
    return NextResponse.json(
      { ok: false, error: "Name and role are required." },
      { status: 400 },
    );
  }

  const created = await prisma.staff.create({
    data: {
      name: body.name,
      role: body.role,
      department: body.department,
      qualification: body.qualification,
      email: body.email,
      phone: body.phone,
    },
  });

  return NextResponse.json({ ok: true, staff: created });
}

