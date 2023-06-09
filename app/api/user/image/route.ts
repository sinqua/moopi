import { NextRequest, NextResponse } from "next/server";
import { supabase, supabasePublic } from "@/lib/database";

export async function POST(req: NextRequest, context: { params: any }) {
    const json = await req.json();

    const { data: profileData, error: error1 } = await supabasePublic
                                .from('profiles')
                                .select(`image`)
                                .eq('user_id', json.user_id);

    const { data: authData, error: error2 } = await supabase
                                .from('users')
                                .select(`image`)
                                .eq('id', json.user_id);

    return NextResponse.json({
        status: 200,
        body: {"profile" : profileData![0], "auth" : authData![0]},
        headers: {
            "content-type": "text/plain",
        },
    });
}
