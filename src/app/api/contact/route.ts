import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { querySchema } from "@/utils/validators";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = querySchema.safeParse(body);

    if (!validation.success) {
      logger.warn("Contact form validation failed", validation.error.flatten());
      return errorResponse(
        `Validation failed: ${validation.error.issues[0]?.message}`,
        400
      );
    }

    const created = await prisma.query.create({
      data: validation.data,
    });

    logger.info("Contact message received", { messageId: created.id, sender: validation.data.name });
    return successResponse({ ok: true, messageId: created.id }, 201);
  } catch (error) {
    logger.error("Failed to create contact message", error);
    return errorResponse("Failed to save message", 500);
  }
}