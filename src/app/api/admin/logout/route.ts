import { NextResponse } from "next/server";

export function GET() {
    const res = NextResponse.redirect(
        process.env.NEXT_PUBLIC_BASE_URL
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/admin/login`
            : "http://localhost:3000/admin/login",
    );
    res.cookies.set("admin_session", "", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
    });
    return res;
}
