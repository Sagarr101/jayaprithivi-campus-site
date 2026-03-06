import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { noticeSchema } from '@/utils/validators';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validation = noticeSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    }

    const notice = await prisma.notice.findUnique({
      where: { id: parseInt(id) },
    });
    if (!notice) {
      return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
    }

    const updated = await prisma.notice.update({
      where: { id: parseInt(id) },
      data: validation.data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const notice = await prisma.notice.findUnique({
      where: { id: parseInt(id) },
    });
    if (!notice) {
      return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
    }

    await prisma.notice.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}