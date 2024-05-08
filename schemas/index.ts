import * as z from "zod";
import { UserRole } from "@prisma/client";
import { User } from "lucide-react";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  company: z.string().min(1, {
    message: "Company is required",
  }),
});

export const NotificationSchema = z.object({
  id: z.optional(z.string()),
  name: z.string().max(100, "Name must be 100 characters or less"),
  isActive: z.boolean(),
  imgUrl: z.union([z.string().url("Link must be a valid URL"), z.literal("")]),
  userId: z.string(),
  message: z.string().max(300, "Message must be 300 characters or less"),
  link: z.union([z.string().url("Link must be a valid URL"), z.literal("")]),
  sender: z
    .string()
    .min(1, "Sender is required")
    .max(30, "Sender name must be 30 characters or less"),
  page: z
    .string()
    .min(1, "Page may not be empty - use '/' for homepage")
    .max(100, "Page identifier must be 100 characters or less"),
  websiteId: z.string(),
  showTimeInMs: z
    .number()
    .min(1000, "Show time must be at least 1000 ms")
    .max(100000, "Show time must be no more than 100000 ms"),
  delayInMs: z
    .number()
    .min(0, "Delay must be at least 0 ms")
    .max(120000, "Delay must be no more than 120000 ms"),
});

export const WebsiteSchema = z.object({
  id: z.optional(z.string()),
  name: z.string().max(100, "Name must be 100 characters or less"),
  url: z.string().url("URL not valid - Add http:// or https:// in front."),
  userId: z.string(),
});
