import { NextRequest, NextResponse } from "next/server";
import { supabaseAuth, supabase } from "@/lib/database";

export async function POST(req: NextRequest, context: { params: any }) {
    const json = await req.json();

    const { data, error } = await supabase
                                .from('tags')
                                .insert(json.tags.map((tag: any) => {return {tag: tag, profile_id: json.profile_id}}));

    return NextResponse.json({
        status: 200,
        headers: {
            "content-type": "text/plain",
        },
    });
}
