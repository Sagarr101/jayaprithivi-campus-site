import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | {
        name?: string;
        email?: string;
        phone?: string;
        message?: string;
      }
    | null;

  if (!body?.name || !body?.message) {
    return NextResponse.json(
      { ok: false, error: "Name and message are required." },
      { status: 400 },
    );
  }

  // For now we just accept the message.
  // When you deploy, you can forward this to email (SMTP/Resend) or a database.
  console.log("Contact form submission:", {
    name: body.name,
    email: body.email,
    phone: body.phone,
    message: body.message,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}

