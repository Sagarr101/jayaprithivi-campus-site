import { z } from "zod";

// Login validation
export const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

// Course validation
export const courseSchema = z.object({
  name: z.string().min(1, "Course name is required").max(255),
  category: z.enum(["Undergraduate", "Postgraduate"]),
  duration: z.string().min(1, "Duration is required").max(100),
  description: z.string().max(1000).optional().nullable(),
  department: z.string().max(100).optional().nullable(),
});

export const courseUpdateSchema = courseSchema.extend({
  id: z.number().int().positive("Invalid course ID"),
});

// Notice validation
export const noticeSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "Content is required"),
  category: z.string().max(100).optional(),
});

export const noticeUpdateSchema = noticeSchema.extend({
  id: z.number().int().positive("Invalid notice ID"),
});

// Event validation
export const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  dateISO: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  time: z.string().max(50).optional().nullable(),
  location: z.string().max(255).optional().nullable(),
  type: z.string().max(100).optional().nullable(),
  description: z.string().max(1000).optional().nullable(),
});

export const eventUpdateSchema = eventSchema.extend({
  id: z.number().int().positive("Invalid event ID"),
});

// Staff validation
export const staffSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  position: z.string().min(1, "Position is required").max(255),
  department: z.string().min(1, "Department is required").max(100),
  email: z.string().email("Invalid email").optional(),
  photoUrl: z.string().url("Invalid URL").optional(),
  bio: z.string().max(1000).optional(),
});

export const staffUpdateSchema = staffSchema.extend({
  id: z.number().int().positive("Invalid staff ID"),
});

// Message validation
export const messageSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  email: z.string().email("Invalid email").optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  message: z.string().min(1, "Message is required").max(5000),
});

// Type exports for use in route handlers
export type LoginInput = z.infer<typeof loginSchema>;
export type CourseInput = z.infer<typeof courseSchema>;
export type CourseUpdateInput = z.infer<typeof courseUpdateSchema>;
export type NoticeInput = z.infer<typeof noticeSchema>;
export type NoticeUpdateInput = z.infer<typeof noticeUpdateSchema>;
export type EventInput = z.infer<typeof eventSchema>;
export type EventUpdateInput = z.infer<typeof eventUpdateSchema>;
export type StaffInput = z.infer<typeof staffSchema>;
export type StaffUpdateInput = z.infer<typeof staffUpdateSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
