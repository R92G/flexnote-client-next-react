import Image from "next/image";
import Link from "next/link";
import { Blog } from "contentlayer/generated";
import BlogTags from "./BlogTags";
import { getBase64 } from "@/lib/getLocalBase64";

interface BlogArticleProps {
  blog: Blog;
}

const BlogArticle: React.FC<BlogArticleProps> = async ({ blog }) => {
  let imageUrl;

  if (process.env.VERCEL_ENV === "production") {
    imageUrl = `https://hulpmethuren.nl${blog.image}`;
  } else if (process.env.VERCEL_ENV === "preview") {
    imageUrl = `https://hmh-git-develop-r92gs-projects.vercel.app${blog.image}`;
  } else {
    imageUrl = `http://localhost:3000${blog.image}`;
  }

  const base64 = await getBase64(imageUrl);

  const blurDataUrl = base64;

  return (
    <article
      key={blog._id}
      className="group relative flex flex-col space-y-2 border p-2"
    >
      <Link href={blog.url} passHref>
        <div
          aria-label={`View ${blog.title}`}
          className="focus:outline-none block"
        >
          {blog.image && (
            <div className="relative h-60 w-full mb-4">
              <Image
                src={blog.image}
                alt={blog.title}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                fill
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                className="rounded-md"
              />
            </div>
          )}

          <span className="block bg-gradient-to-r from-primary to-primary bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
            <h2 className="text-2xl font-extrabold">{blog.title}</h2>
          </span>
          {blog.description && (
            <p className="text-muted-foreground">{blog.description}</p>
          )}
          <BlogTags tags={blog.tags || []} />
        </div>
      </Link>
    </article>
  );
};

export default BlogArticle;
