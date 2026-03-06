import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { noticeSchema } from '@/utils/validators';
import { getAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(notices);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!getAdminSession()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validation = noticeSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    }

    const notice = await prisma.notice.create({
      data: validation.data,
    });
    return NextResponse.json(notice, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}