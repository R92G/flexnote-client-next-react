"use server";
import { db } from "@/lib/db";

export const getWebsitesByUserId = async (userId: string) => {
  const websites = await db.website.findMany({
    where: {
      userId,
    },
  });

  return websites;
};
