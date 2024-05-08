"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const { email, password, code } = LoginSchema.parse(values);

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "Email does not exist!", success: "", twoFactor: false };
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email
      );
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );
      return {
        error: "",
        success: "Confirmation email sent!",
        twoFactor: false,
      };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );

        if (!twoFactorToken || twoFactorToken.token !== code) {
          return { error: "Invalid code!", success: "", twoFactor: false };
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
          return { error: "Code expired!", success: "", twoFactor: false };
        }

        await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

        const existingConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (existingConfirmation) {
          await db.twoFactorConfirmation.delete({
            where: { id: existingConfirmation.id },
          });
        }

        await db.twoFactorConfirmation.create({
          data: { userId: existingUser.id },
        });
      } else {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token
        );
        return { error: "", success: "", twoFactor: true };
      }
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { error: "", success: "Logged in successfully!", twoFactor: false };
  } catch (error: any) {
    if (error.type) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials!",
            success: "",
            twoFactor: false,
          };
        default:
          return {
            error: "Something went wrong!",
            success: "",
            twoFactor: false,
          };
      }
    }

    throw error;
  }
};
