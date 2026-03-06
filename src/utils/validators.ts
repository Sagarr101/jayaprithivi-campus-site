import { z } from 'zod';

export const querySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
});

export const admissionSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  dob: z.string().min(1),
  address: z.string().min(1),
  course: z.string().min(1),
  prevSchool: z.string().min(1),
  marks: z.string().min(1),
});

export const noticeSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.string().default('general'),
});

export const staffSchema = z.object({
  name: z.string().min(1),
  position: z.string().min(1),
  department: z.string().min(1),
  email: z.string().email().optional(),
  photoUrl: z.string().url().optional(),
  bio: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const gallerySchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.string().default('general'),
});