import { NextRequest, NextResponse } from "next/server";
import { supabase, supabasePublic } from "@/lib/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest, context: { params: any }) {
    const json = await req.json();

    const { data, error } = await supabase
                                .from('users')
                                .update({'nickname': json.nickname})
                                .eq('id', json.id )
                                .select();

    return NextResponse.json({
        status: 200,
        body: {"user" : data![0]},
        headers: {
            "content-type": "text/plain",
        },
    });
}
