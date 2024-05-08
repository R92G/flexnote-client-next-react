import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = body.userId;

  const result = await db.website.findMany({
    where: {
      userId,
    },
  });

  return NextResponse.json(result);
}
