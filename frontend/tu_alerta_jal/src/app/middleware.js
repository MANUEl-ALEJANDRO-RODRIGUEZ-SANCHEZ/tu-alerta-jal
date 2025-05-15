import { NextResponse } from "next/server";

const PROTECTED_PATHS = ["/home"];

export function middleware(req) {
    const token = req.cookies.get("token")?.value;

    if (
        !token &&
        PROTECTED_PATHS.some((p) => req.nextUrl.pathname.startsWith(p))
    ) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/home/:path*"],
};
