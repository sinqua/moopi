import { NextRequest, NextResponse } from "next/server";
import { supabaseAuth, supabase } from "@/lib/database";

export async function POST(req: NextRequest, context: { params: any }) {
    const json = await req.json();

    console.log("api/detail/description");

    const { data, error } = await supabase
                                .from('user_details')
                                .update({'description': json.description})
                                .eq('user_id', json.user_id )
                                .select();

    console.log("description", json.description);

    console.log("user_id", json.user_id);

    console.log("data", data);

    return NextResponse.json({
        status: 200,
        body: {"data" : data![0]},
        headers: {
            "content-type": "text/plain",
        },
    });
}
