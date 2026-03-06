import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { querySchema } from '@/utils/validators';
import { getAdminSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = querySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    }

    const query = await prisma.query.create({
      data: validation.data,
    });
    return NextResponse.json({ id: query.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (!getAdminSession()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const queries = await prisma.query.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(queries);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}