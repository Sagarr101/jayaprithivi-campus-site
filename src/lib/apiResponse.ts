import { NextResponse } from "next/server";

export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export function successResponse<T>(data: T, status = 200) {
  const response: ApiResponse<T> = {
    ok: true,
    data,
    timestamp: new Date().toISOString(),
  };
  return NextResponse.json(response, { status });
}

export function errorResponse(error: string, status = 400) {
  const response: ApiResponse = {
    ok: false,
    error,
    timestamp: new Date().toISOString(),
  };
  return NextResponse.json(response, { status });
}

export function validationError(errors: Record<string, string[]>) {
  const formattedErrors = Object.entries(errors)
    .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
    .join("; ");

  return errorResponse(`Validation failed: ${formattedErrors}`, 400);
}

export function unauthorizedResponse() {
  return errorResponse("Unauthorized", 401);
}

export function forbiddenResponse() {
  return errorResponse("Forbidden", 403);
}

export function notFoundResponse() {
  return errorResponse("Not found", 404);
}

export function serverErrorResponse() {
  return errorResponse("Internal server error", 500);
}
