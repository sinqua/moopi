import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./auth/[...nextauth]/route";
import { supabaseAuth } from "@/lib/database";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    const { data, error } = await supabaseAuth.from("users").select();

    return NextResponse.json({
      message: "You are not logged in.",
      data: data,
      error: error,
    });
  }

  return NextResponse.json({ message: session });
}
