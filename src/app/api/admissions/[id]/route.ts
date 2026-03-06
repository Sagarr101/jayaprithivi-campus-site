import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { status } = body;
    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const admission = await prisma.admission.findUnique({
      where: { id: parseInt(id) },
    });
    if (!admission) {
      return NextResponse.json({ error: 'Admission not found' }, { status: 404 });
    }

    await prisma.admission.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    return NextResponse.json({ status });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}