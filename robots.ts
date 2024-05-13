import { MetadataRoute } from "next";
import { adminRoutes } from "./routes";
import { authRoutes } from "./routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin-dashboard/users",
          "/notifications/create",
          "/notifications/add-website",
          "/auth/new-password",
          "/auth/new-verification",
          "/auth/reset",
          ...adminRoutes,
          ...authRoutes,
        ],
      },
    ],
    sitemap: "https://www.flexnote.io/sitemap.xml",
  };
}
