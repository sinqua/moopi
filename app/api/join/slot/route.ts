import { NextRequest, NextResponse } from "next/server";
import { supabaseAuth, supabase } from "@/lib/database";

export async function POST(req: NextRequest, context: { params: any }) {
    const json = await req.json();

    const { data, error } = await supabase
                                .from('slots')
                                .insert([{user_id: json.user_id}])
                                .select();
    
    return NextResponse.json({
        status: 200,
        headers: {
            "content-type": "text/plain",
        },
    });
}
