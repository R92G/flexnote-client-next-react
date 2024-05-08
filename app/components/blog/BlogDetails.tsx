import { format, parseISO } from "date-fns";
import Link from "next/link";
import React from "react";
import { slug as slugger } from "github-slugger";
import { Blog } from "contentlayer/generated";

interface BlogDetailsProps {
  blog: Blog;
  slug: string;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ blog, slug: blogSlug }) => {
  // Zorg ervoor dat er ten minste één tag is of gebruik een lege string als fallback
  const firstTag = blog.tags?.[0] ?? "";

  return (
    <div className="px-2 md:px-10 bg-primary text-white dark:text-accent py-2 flex items-center justify-around flex-wrap text-lg sm:text-xl font-medium mx-5 md:mx-10 rounded-lg">
      <time className="m-3">
        {format(parseISO(blog.publishedAt), "LLLL d, yyyy")}
      </time>
      <div>
        {blog.readingTime && (
          <span className="m-3">{blog.readingTime.text}</span>
        )}
      </div>

      {/* Toon de link alleen als er een eerste tag is */}
      {firstTag && (
        <Link href={`/categories/${slugger(firstTag)}`}>
          <span className="m-3">#{firstTag}</span>
        </Link>
      )}
    </div>
  );
};

export default BlogDetails;
