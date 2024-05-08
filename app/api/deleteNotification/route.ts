// delete notification

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const notificationId = body.notificationId;

  //delete notification by id
  const result = await db.notification.delete({
    where: {
      id: notificationId,
    },
  });

  return NextResponse.json(result);
}
