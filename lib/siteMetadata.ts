import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import { compareDesc, parseISO } from "date-fns";
// import { Blog } from "contentlayer/generated";
import { Payment } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteMetadata = {
  title: "Flexnote",
  author: "Flexnote",
  headerTitle: "Flexible Notifications",
  description:
    "Lightweight notification management tool that simplifies audience engagement.",
  keywords: [""],
  canonical: "https://www.flexnote.io",
  robots: "index, follow",
  language: "en-US",
  theme: "system", // system, dark or light
  siteUrl: "https://www.flexnote.io", // your website URL
  siteLogo: "",
  socialBanner: "", // add social banner in the public folder
  email: "info@flexnote.io",
  instagram: "https://instagram.com/flexnote",
  locale: "en-US",
};

// export const sortBlogs = (blogs: Blog[]) => {
//   return blogs
//     .slice()
//     .sort((a, b) =>
//       compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
//     );
// };
