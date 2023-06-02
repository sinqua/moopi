import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/database";

export async function POST(req: NextRequest, context: { params: any }) {
    const json = await req.json();

    const { data, error } = await supabase.from('users').select().eq('nickname', json.nickname);

    return NextResponse.json({
        status: 200,
        body: {"result" : data!.length > 0 ? true : false},
        headers: {
            "content-type": "text/plain",
        },
    });
}
