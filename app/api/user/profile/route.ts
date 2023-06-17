import { NextRequest, NextResponse } from "next/server";
import { supabaseAuth, supabase } from "@/lib/database";

export async function POST(req: NextRequest, context: { params: any }) {
    const json = await req.json();

    const { data, error } = await supabase
                                .from('profiles')
                                .select(`id, description, image, tags (tag)`)
                                .eq('user_id', json.user_id);
        
    return NextResponse.json({
        status: 200,
        body: {"user" : data![0]},
        headers: {
            "content-type": "text/plain",
        },
    });
}
