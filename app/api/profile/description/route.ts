import { NextRequest, NextResponse } from "next/server";
import { supabaseAuth, supabase } from "@/lib/database";

export async function POST(req: NextRequest, context: { params: any }) {
    const json = await req.json();

    const { data, error } = await supabase
                                .from('profiles')
                                .update({'description': json.description})
                                .eq('user_id', json.user_id )
                                .select();

    return NextResponse.json({
        status: 200,
        body: {"profile" : data![0]},
        headers: {
            "content-type": "text/plain",
        },
    });
}
