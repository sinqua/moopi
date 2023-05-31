import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./auth/[...nextauth]/route";

export async function GET(req: NextRequest, res: NextResponse) {
    // Add middleware here
    // response with "Hello World!" for all requests

    const session = await getServerSession(authOptions)

    console.log(session);
    
    if (!session) {
      return NextResponse.json({ message: 'You are not logged in.' })
    }
  
    return NextResponse.json({ message: session })


    // return NextResponse.json({
    //     status: 200,
    //     body: "Hello World!",
    //     headers: {
    //         "content-type": "text/plain",
    //     },
    // });
}
