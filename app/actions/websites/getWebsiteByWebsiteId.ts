"use server";

import { db } from "@/lib/db";

export const getWebsiteByWebsiteId = async (websiteId: string) => {
  const website = await db.website.findUnique({
    where: {
      id: websiteId,
    },
  });

  return website;
};
