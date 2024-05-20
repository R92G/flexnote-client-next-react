"use server";
import { db } from "@/lib/db";

export const getNotificationById = async (notificationId: string) => {
  const notification = await db.notification.findUnique({
    where: {
      id: notificationId,
    },
  });

  return notification;
};
