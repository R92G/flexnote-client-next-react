"use server";
import { createResendContact } from "@/lib/mail";

export const resendContactCreate = async (email: string) => {
  await createResendContact(email);
  return { success: "Demo Requested!" };
};
