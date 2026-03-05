import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { courseSchema, courseUpdateSchema } from "@/lib/validation";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { logger } from "@/lib/logger";

export async function GET() {
    try {
        const data = await prisma.course.findMany({ orderBy: { category: "asc" } });
        return successResponse({ courses: data });
    } catch (error) {
        logger.error("Failed to fetch courses", error);
        return errorResponse("Failed to fetch courses", 500);
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validation = courseSchema.safeParse(body);

        if (!validation.success) {
            logger.warn("Course creation validation failed", validation.error.flatten());
            return errorResponse(
                `Validation failed: ${validation.error.issues[0]?.message}`,
                400
            );
        }

        const created = await prisma.course.create({
            data: validation.data,
        });

        logger.info("Course created", { courseId: created.id });
        return successResponse({ ok: true, course: created }, 201);
    } catch (error) {
        logger.error("Failed to create course", error);
        return errorResponse("Failed to create course", 500);
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const validation = courseUpdateSchema.safeParse(body);

        if (!validation.success) {
            logger.warn("Course update validation failed", validation.error.flatten());
            return errorResponse(
                `Validation failed: ${validation.error.issues[0]?.message}`,
                400
            );
        }

        const { id, ...data } = validation.data;
        const updated = await prisma.course.update({
            where: { id },
            data,
        });

        logger.info("Course updated", { courseId: id });
        return successResponse({ ok: true, course: updated });
    } catch (error) {
        if (error instanceof Error && error.message.includes("not found")) {
            return errorResponse("Course not found", 404);
        }
        logger.error("Failed to update course", error);
        return errorResponse("Failed to update course", 500);
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = Number(searchParams.get("id"));

        if (!id || isNaN(id)) {
            return errorResponse("Invalid course ID", 400);
        }

        await prisma.course.delete({ where: { id } });
        logger.info("Course deleted", { courseId: id });
        return successResponse({ ok: true });
    } catch (error) {
        if (error instanceof Error && error.message.includes("not found")) {
            return errorResponse("Course not found", 404);
        }
        logger.error("Failed to delete course", error);
        return errorResponse("Failed to delete course", 500);
    }
}
