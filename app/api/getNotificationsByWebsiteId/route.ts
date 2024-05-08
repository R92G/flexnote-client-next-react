import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const websiteId = body.websiteId;

  const result = await db.website.findUnique({
    where: {
      id: websiteId,
    },
    include: {
      notifications: true,
    },
  });

  return NextResponse.json(result);
}
