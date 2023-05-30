import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // Add middleware here
    // response with "Hello World!" for all requests



    return NextResponse.json({
        status: 200,
        body: "Hello World!",
        headers: {
            "content-type": "text/plain",
        },
    });
}
