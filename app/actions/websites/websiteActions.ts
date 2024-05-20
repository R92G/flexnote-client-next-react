"use server";
import { db } from "@/lib/db";

export const createWebsite = async (
  name: string,
  url: string,
  userId: string
) => {
  const website = await db.website.create({
    data: {
      name,
      url,
      userId,
    },
  });

  console.log("Created Website:", website);
  return website;
};

export const updateWebsite = async (
  id: string,
  name: string,
  url: string,
  userId: string
) => {
  const website = await db.website.update({
    where: { id },
    data: {
      name,
      url,
      userId,
    },
  });

  console.log("Updated Website:", website);
  return website;
};

export const deleteWebsite = async (id: string) => {
  await db.website.delete({
    where: { id },
  });

  console.log("Deleted Website:", id);
};
