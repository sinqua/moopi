import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest, context: { params: any }) {
    const json = await req.json();

    const { error } = await supabase
                                .from('users')
                                .update({'nickname': json.nickname})
                                .eq('id', json.id );

    return NextResponse.json({
        status: 200,
        headers: {
            "content-type": "text/plain",
        },
    });
}
