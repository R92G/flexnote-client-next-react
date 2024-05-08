import { MetadataRoute } from "next";
// import { allBlogs, Blog } from "@/.contentlayer/generated";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const publishedBlogs: Blog[] = allBlogs.filter((blog) => blog.isPublished);

  // const blogEntries: MetadataRoute.Sitemap = publishedBlogs.map((blog) => ({
  //   url: `https://hulpmethuren.nl/info/${blog._raw.flattenedPath}`,
  //   lastModified: new Date(blog.updatedAt || blog.publishedAt).toISOString(),
  // }));

  return [
    {
      url: "https://hulpmethuren.nl/",
    },
  ];
}
