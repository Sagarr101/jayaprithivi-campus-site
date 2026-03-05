import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { staffSchema, staffUpdateSchema } from "@/lib/validation";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const data = await prisma.staff.findMany({
      orderBy: { name: "asc" },
    });
    return successResponse({ staff: data });
  } catch (error) {
    logger.error("Failed to fetch staff", error);
    return errorResponse("Failed to fetch staff", 500);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = staffSchema.safeParse(body);

    if (!validation.success) {
      logger.warn("Staff creation validation failed", validation.error.flatten());
      return errorResponse(
        `Validation failed: ${validation.error.issues[0]?.message}`,
        400
      );
    }

    const created = await prisma.staff.create({
      data: validation.data,
    });

    logger.info("Staff created", { staffId: created.id });
    return successResponse({ ok: true, staff: created }, 201);
  } catch (error) {
    logger.error("Failed to create staff", error);
    return errorResponse("Failed to create staff", 500);
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const validation = staffUpdateSchema.safeParse(body);

    if (!validation.success) {
      logger.warn("Staff update validation failed", validation.error.flatten());
      return errorResponse(
        `Validation failed: ${validation.error.issues[0]?.message}`,
        400
      );
    }

    const { id, ...data } = validation.data;
    const updated = await prisma.staff.update({
      where: { id },
      data,
    });

    logger.info("Staff updated", { staffId: id });
    return successResponse({ ok: true, staff: updated });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return errorResponse("Staff not found", 404);
    }
    logger.error("Failed to update staff", error);
    return errorResponse("Failed to update staff", 500);
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id || isNaN(id)) {
      return errorResponse("Invalid staff ID", 400);
    }

    await prisma.staff.delete({ where: { id } });
    logger.info("Staff deleted", { staffId: id });
    return successResponse({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return errorResponse("Staff not found", 404);
    }
    logger.error("Failed to delete staff", error);
    return errorResponse("Failed to delete staff", 500);
  }
}
