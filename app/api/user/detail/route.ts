import { NextRequest, NextResponse } from "next/server";
import { supabaseAuth, supabase } from "@/lib/database";

export async function POST(req: NextRequest, context: { params: any }) {
    const json = await req.json();

    const { data, error } = await supabase
                                .from('user_details')
                                .select()
                                .eq('user_id', json.user_id);
 
    return NextResponse.json({
        status: 200,
        body: {"detail" : data![0]},
        headers: {
            "content-type": "text/plain",
        },
    });
}
