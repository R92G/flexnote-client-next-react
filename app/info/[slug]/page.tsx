import BlogDetails from "@/app/components/blog/BlogDetails";
import RenderMdx from "@/app/components/blog/RenderMdx";
import Tag from "@/app/components/blog/Tag";
import { siteMetadata } from "@/lib/siteMetadata";
import { allBlogs } from "contentlayer/generated";
import { slug } from "github-slugger";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBase64 } from "@/lib/getLocalBase64";
import BackBar from "@/app/components/BackBar";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  return allBlogs.map((blog) => ({ slug: blog._raw.flattenedPath }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);
  if (!blog) {
    return;
  }

  const publishedAt = new Date(blog.publishedAt).toISOString();
  const modifiedAt = new Date(blog.updatedAt || blog.publishedAt).toISOString();

  let imageList: string[] = blog.image
    ? [blog.image]
    : [siteMetadata.socialBanner];
  const ogImages = imageList.map((img) => ({
    url: img.includes("http") ? img : `${siteMetadata.siteUrl}${img}`,
  }));

  return {
    title: `${blog.title} | Snel een nieuwe huurwoning`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `${siteMetadata.siteUrl}/info/${blog._raw.flattenedPath}`,
      siteName: siteMetadata.title,
      locale: "nl-NL",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      images: ogImages,
      authors: [blog.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: ogImages,
    },
  };
}

export default async function BlogPage({ params }: { params: Params }) {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);

  if (!blog) {
    notFound();
    return null;
  }

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: blog.title,
    description: blog.description,
    image: blog.image,
    datePublished: new Date(blog.publishedAt).toISOString(),
    dateModified: new Date(blog.updatedAt || blog.publishedAt).toISOString(),
    author: {
      "@type": "Person",
      name: blog.author,
      url: siteMetadata.instagram,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <div className="relative mb-12 text-center pt-32 w-full h-[70vh] bg-dark">
          <div className="absolute top-16 left-5 z-10">
            <BackBar outline backLink="/info" />
          </div>
          {blog.image && (
            <Image
              src={blog.image}
              alt={blog.title}
              placeholder="blur"
              blurDataURL={blurDataUrl}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          )}
          {/* Overlay with shade */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/60"></div>
          {/* Content on top of the image and overlay */}
          <div className="absolute z-10 flex flex-col items-center justify-center w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {blog.tags && (
              <Tag
                name={blog.tags[0]}
                link={`/categories/${slug(blog.tags[0])}`}
                className="px-6 py-2 text-sm"
              />
            )}
            <h1 className="relative w-5/6 mt-6 text-2xl font-semibold capitalize md:text-3xl lg:text-5xl text-white !leading-normal inline-block">
              {blog.title}
            </h1>
          </div>
        </div>
        <BlogDetails blog={blog} slug={params.slug} />

        <div className="grid grid-cols-12  gap-y-8 lg:gap-8 sxl:gap-16 mt-8 px-5 md:px-10">
          <div className="col-span-12  lg:col-span-4">
            <details
              className="border-[1px] border-solid border-dark dark:border-light text-dark dark:text-light rounded-lg p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto"
              open
            >
              <summary className="text-lg font-semibold capitalize cursor-pointer">
                Inhoudsopgave
              </summary>
              <ul className="mt-4 font-in text-base">
                {blog.toc.map((heading: any) => {
                  return (
                    <li key={`#${heading.slug}`} className="py-1">
                      <a
                        href={`#${heading.slug}`}
                        data-level={heading.level}
                        className="data-[level=two]:pl-0 data-[level=two]:font-semibold  data-[level=two]:pt-2
                                       data-[level=two]:border-t border-solid border-black/40
                                       data-[level=three]:pl-4 data-[level=three]:font-light
                                       sm:data-[level=three]:pl-6
                                       flex items-center justify-start
                                       "
                      >
                        {heading.level === "three" ? (
                          <span className="flex w-1 h-1 rounded-full bg-dark mr-2">
                            &nbsp;
                          </span>
                        ) : null}

                        <span className="hover:underline">{heading.text}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </details>
          </div>
          <RenderMdx blog={blog} />
        </div>
        <div className="pt-12 max-w-[200px] mx-auto">
          <Link className="underline" href="/info">
            Back to info
          </Link>
        </div>
      </article>
    </>
  );
}
