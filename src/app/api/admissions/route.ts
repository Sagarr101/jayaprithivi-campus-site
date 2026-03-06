import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { admissionSchema } from '@/utils/validators';
import { getAdminSession } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const dob = formData.get('dob') as string;
    const address = formData.get('address') as string;
    const course = formData.get('course') as string;
    const prevSchool = formData.get('prevSchool') as string;
    const marks = formData.get('marks') as string;
    const document = formData.get('document') as File;

    const validation = admissionSchema.safeParse({
      fullName,
      email,
      phone,
      dob,
      address,
      course,
      prevSchool,
      marks,
    });
    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    }

    let documentUrl: string | undefined;
    if (document) {
      documentUrl = await uploadToCloudinary(document);
    }

    const admission = await prisma.admission.create({
      data: {
        ...validation.data,
        documentUrl,
      },
    });
    return NextResponse.json({ id: admission.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (!getAdminSession()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const admissions = await prisma.admission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(admissions);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}