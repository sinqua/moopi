import { NextRequest, NextResponse } from "next/server";
import { supabase, supabasePublic } from "@/lib/database";

export async function POST(req: NextRequest, context: { params: any }) {
    const json = await req.json();

    const { data, error } = await supabasePublic
                                .from('tags')
                                .delete()
                                .eq('profile_id', json.profile_id );

    return NextResponse.json({
        status: 200,
        headers: {
            "content-type": "text/plain",
        },
    });
}
