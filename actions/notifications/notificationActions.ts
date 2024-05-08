"use server";
import { db } from "@/lib/db";
import { z } from "zod";
import { NotificationSchema } from "@/schemas";
import exp from "constants";

type NotificationData = z.infer<typeof NotificationSchema>;

export const createNotification = async (
  notificationData: NotificationData
) => {
  // Perform Zod validation to ensure the data conforms to the schema
  const parsedData = NotificationSchema.parse(notificationData);

  // Ensure the 'id' is not included when creating a new notification
  const { id, ...dataWithoutId } = parsedData;

  const notification = await db.notification.create({
    data: dataWithoutId,
  });

  return notification;
};

export const updateNotification = async (
  notificationData: NotificationData
) => {
  // Perform Zod validation to ensure the data conforms to the schema
  const parsedData = NotificationSchema.parse(notificationData);

  // Ensure that the 'id' is provided for updating
  if (!parsedData.id) {
    throw new Error("An ID must be provided for updating a notification.");
  }

  console.log(parsedData);

  const notification = await db.notification.update({
    where: { id: parsedData.id },
    data: parsedData,
  });
  console.log(notification);
  return notification;
};

export const deleteNotification = async (id: string) => {
  const notification = await db.notification.delete({
    where: { id },
  });

  return notification;
};
