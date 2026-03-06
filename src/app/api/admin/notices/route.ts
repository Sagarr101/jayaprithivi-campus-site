import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { noticeSchema, noticeUpdateSchema } from "@/lib/validation";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const data = await prisma.notice.findMany({
      orderBy: { createdAt: "desc" },
    });
    return successResponse({ notices: data });
  } catch (error) {
    logger.error("Failed to fetch notices", error);
    return errorResponse("Failed to fetch notices", 500);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = noticeSchema.safeParse(body);

    if (!validation.success) {
      logger.warn("Notice creation validation failed", validation.error.flatten());
      return errorResponse(
        `Validation failed: ${validation.error.issues[0]?.message}`,
        400
      );
    }

    const created = await prisma.notice.create({
      data: validation.data,
    });

    logger.info("Notice created", { noticeId: created.id });
    return successResponse({ ok: true, notice: created }, 201);
  } catch (error) {
    logger.error("Failed to create notice", error);
    return errorResponse("Failed to create notice", 500);
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const validation = noticeUpdateSchema.safeParse(body);

    if (!validation.success) {
      logger.warn("Notice update validation failed", validation.error.flatten());
      return errorResponse(
        `Validation failed: ${validation.error.issues[0]?.message}`,
        400
      );
    }

    const { id, ...data } = validation.data;
    const updated = await prisma.notice.update({
      where: { id },
      data,
    });

    logger.info("Notice updated", { noticeId: id });
    return successResponse({ ok: true, notice: updated });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return errorResponse("Notice not found", 404);
    }
    logger.error("Failed to update notice", error);
    return errorResponse("Failed to update notice", 500);
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id || isNaN(id)) {
      return errorResponse("Invalid notice ID", 400);
    }

    await prisma.notice.delete({ where: { id } });
    logger.info("Notice deleted", { noticeId: id });
    return successResponse({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return errorResponse("Notice not found", 404);
    }
    logger.error("Failed to delete notice", error);
    return errorResponse("Failed to delete notice", 500);
  }
}

