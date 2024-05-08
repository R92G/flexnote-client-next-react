import { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/siteMetadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [""],
      },
    ],
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
  };
}
