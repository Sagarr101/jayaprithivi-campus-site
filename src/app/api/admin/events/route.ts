import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.event.findMany({
    orderBy: { dateISO: "asc" },
  });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | {
        title?: string;
        dateISO?: string;
        time?: string;
        location?: string;
        type?: string;
        description?: string;
      }
    | null;

  if (!body?.title || !body?.dateISO) {
    return NextResponse.json(
      { ok: false, error: "Title and dateISO are required." },
      { status: 400 },
    );
  }

  const created = await prisma.event.create({
    data: {
      title: body.title,
      dateISO: body.dateISO,
      time: body.time,
      location: body.location,
      type: body.type,
      description: body.description,
    },
  });

  return NextResponse.json({ ok: true, event: created });
}

