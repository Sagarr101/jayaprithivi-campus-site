import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const query = await prisma.query.findUnique({
      where: { id: parseInt(id) },
    });
    if (!query) {
      return NextResponse.json({ error: 'Query not found' }, { status: 404 });
    }

    const newStatus = query.status === 'pending' ? 'resolved' : 'pending';
    await prisma.query.update({
      where: { id: parseInt(id) },
      data: { status: newStatus },
    });
    return NextResponse.json({ status: newStatus });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}