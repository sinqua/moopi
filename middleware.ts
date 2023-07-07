import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth";


export async function middleware(req: NextRequest) {

}

export const config ={
    matcher: '/'
}