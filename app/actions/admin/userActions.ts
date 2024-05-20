"use server";
import { db } from "@/lib/db";

export const getAllUsers = async () => {
  const users = await db.user.findMany();

  return users;
};

export const deleteUser = async (userId: string) => {
  const user = await db.user.delete({
    where: {
      id: userId,
    },
  });

  return user;
};
