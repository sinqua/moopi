import { NextRequest, NextResponse } from "next/server";
import { supabaseAuth, supabase } from "@/lib/database";

export async function POST(req: NextRequest, context: { params: any }) {
    const json = await req.json();

    const { data: profileData, error: error1 } = await supabase
                                .from('profiles')
                                .select(`image`)
                                .eq('user_id', json.user_id);

    const { data: authData, error: error2 } = await supabaseAuth
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
