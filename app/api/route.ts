import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./auth/[...nextauth]/route";
import supabase from "@/lib/database";

export async function GET(req: NextRequest, res: NextResponse) {
    // Add middleware here
    // response with "Hello World!" for all requests

    const session = await getServerSession(authOptions)

    console.log(session);
    
    if (!session) {
      const { data, error } = await supabase.from('users').select();

      return NextResponse.json({ 
        message: 'You are not logged in.',
        data: data,
        error: error ,
      })
    }
  
    return NextResponse.json({ message: session })
}
