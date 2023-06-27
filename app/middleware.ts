import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    console.log(request.nextUrl.pathname)
    if (request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.rewrite(new URL('/login-2', request.url))
    }
}

export const config = {
    matcher: '/login',
}