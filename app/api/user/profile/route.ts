import { NextRequest, NextResponse } from "next/server";
import { supabase, supabasePublic } from "@/lib/database";

export async function POST(req: NextRequest, context: { params: any }) {
    const json = await req.json();


    const { data, error } = await supabasePublic
                                .from('profiles')
                                .select(`id, description, image, tags (id, tag)`)
                                .eq('user_id', json.user_id);
    
    console.log("data", data)
    console.log("error", error)
    
    return NextResponse.json({
        status: 200,
        body: {"user" : data![0]},
        headers: {
            "content-type": "text/plain",
        },
    });
}
