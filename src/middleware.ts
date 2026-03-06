import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Allow the login page and login API through always
    if (
        pathname.startsWith("/admin/login") ||
        pathname.startsWith("/api/admin/login") ||
        pathname.startsWith("/api/admin/logout")
    ) {
        return NextResponse.next();
    }

    // Protect all /admin routes
    if (pathname.startsWith("/admin")) {
        const session = req.cookies.get("admin_session");
        if (session?.value !== "true") {
            const loginUrl = req.nextUrl.clone();
            loginUrl.pathname = "/admin/login";
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
