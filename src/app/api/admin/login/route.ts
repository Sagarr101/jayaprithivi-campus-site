import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validation";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { logger } from "@/lib/logger";
import { rateLimit, getRateLimitStatus } from "@/lib/rateLimit";

const LOGIN_RATE_LIMIT = 5; // attempts
const LOGIN_WINDOW = 15 * 60 * 1000; // 15 minutes

export async function POST(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const key = `login:${ip}`;

    // Check rate limit
    if (!rateLimit(key, LOGIN_RATE_LIMIT, LOGIN_WINDOW)) {
        const status = getRateLimitStatus(key, LOGIN_RATE_LIMIT, LOGIN_WINDOW);
        logger.warn("Login rate limit exceeded", { ip, remainingAttempts: status.remaining });
        return errorResponse(
            `Too many login attempts. Please try again in ${Math.ceil((status.resetTime - Date.now()) / 1000)} seconds.`,
            429
        );
    }

    try {
        const body = await req.json();
        const validation = loginSchema.safeParse(body);

        if (!validation.success) {
            logger.warn("Login validation failed", { errors: validation.error.flatten() });
            return errorResponse(
                `Validation failed: ${validation.error.issues[0]?.message}`,
                400
            );
        }

        const { password } = validation.data;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword) {
            logger.error("ADMIN_PASSWORD environment variable not set");
            return errorResponse("Server configuration error", 500);
        }

        if (password !== adminPassword) {
            logger.warn("Failed login attempt", { ip });
            return errorResponse("Invalid password", 401);
        }

        const res = successResponse({ ok: true }, 200);
        res.cookies.set("admin_session", "1", {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        logger.info("Successful login", { ip });
        return res;
    } catch (error) {
        logger.error("Login endpoint error", error);
        return errorResponse("Internal server error", 500);
    }
}
