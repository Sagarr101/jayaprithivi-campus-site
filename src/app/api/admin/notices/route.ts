import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.notice.findMany({
    orderBy: { dateISO: "desc" },
  });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | {
        title?: string;
        dateISO?: string;
        category?: string;
        summary?: string;
        fileUrl?: string;
      }
    | null;

  if (!body?.title || !body?.dateISO) {
    return NextResponse.json(
      { ok: false, error: "Title and dateISO are required." },
      { status: 400 },
    );
  }

  const created = await prisma.notice.create({
    data: {
      title: body.title,
      dateISO: body.dateISO,
      category: body.category,
      summary: body.summary,
      fileUrl: body.fileUrl,
    },
  });

  return NextResponse.json({ ok: true, notice: created });
}

