import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(notices);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const notice = await prisma.notice.create({
      data: {
        title: body.title,
        content: body.content || '',
        category: body.category || 'general',
      },
    });

    return NextResponse.json(notice, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
