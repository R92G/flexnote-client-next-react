import { db } from "@/lib/db";

async function getNotificationIdsByUserId(userId: string): Promise<string[]> {
  const notifications = await db.notification.findMany({
    where: {
      userId: { equals: userId },
    },
    select: { id: true },
  });
  return notifications.map((notification) => notification.id);
}
