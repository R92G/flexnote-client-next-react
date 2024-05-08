"use server";
import { sendScriptTag } from "@/lib/mail";

export const emailScriptTag = async (email: string, websiteId: string) => {
  await sendScriptTag(email, websiteId);
  return { success: "Script tag sent!" };
};
