import { NextRequest, NextResponse } from "next/server";
const db = require("../../../../utils/db");

export async function GET(req: NextRequest, context: { params: any }) {
    // Add middleware here
    // response with "Hello World!" for all requests

    
    // db.query("SELECT * FROM user", function (err: any, result: any) {
    //     if (err) console.log(err);
    //     console.log(result);
    // })

    // console.log(context.params);

    return NextResponse.json({
        status: 200,
        body: "Hello User!",
        headers: {
            "content-type": "text/plain",
        },
    });
}
