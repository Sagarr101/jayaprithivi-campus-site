import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventSchema, eventUpdateSchema } from "@/lib/validation";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const data = await prisma.event.findMany({
      orderBy: { dateISO: "asc" },
    });
    return successResponse({ events: data });
  } catch (error) {
    logger.error("Failed to fetch events", error);
    return errorResponse("Failed to fetch events", 500);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = eventSchema.safeParse(body);

    if (!validation.success) {
      logger.warn("Event creation validation failed", validation.error.flatten());
      return errorResponse(
        `Validation failed: ${validation.error.issues[0]?.message}`,
        400
      );
    }

    const created = await prisma.event.create({
      data: validation.data,
    });

    logger.info("Event created", { eventId: created.id });
    return successResponse({ ok: true, event: created }, 201);
  } catch (error) {
    logger.error("Failed to create event", error);
    return errorResponse("Failed to create event", 500);
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const validation = eventUpdateSchema.safeParse(body);

    if (!validation.success) {
      logger.warn("Event update validation failed", validation.error.flatten());
      return errorResponse(
        `Validation failed: ${validation.error.issues[0]?.message}`,
        400
      );
    }

    const { id, ...data } = validation.data;
    const updated = await prisma.event.update({
      where: { id },
      data,
    });

    logger.info("Event updated", { eventId: id });
    return successResponse({ ok: true, event: updated });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return errorResponse("Event not found", 404);
    }
    logger.error("Failed to update event", error);
    return errorResponse("Failed to update event", 500);
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id || isNaN(id)) {
      return errorResponse("Invalid event ID", 400);
    }

    await prisma.event.delete({ where: { id } });
    logger.info("Event deleted", { eventId: id });
    return successResponse({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return errorResponse("Event not found", 404);
    }
    logger.error("Failed to delete event", error);
    return errorResponse("Failed to delete event", 500);
  }
}
