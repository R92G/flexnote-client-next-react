import BlogHeader from "../components/blog/BlogHeader";
import BlogGrid from "../components/blog/BlogGrid";
import { allBlogs, Blog } from "contentlayer/generated";
import BackBar from "../components/BackBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Info | Flexible Notifications",
  description:
    "All info you need to quickly setup and start using notifications on your website.",
};

const BlogPage: React.FC = async (props: any) => {
  const publishedBlogs: Blog[] = allBlogs.filter((blog) => blog.isPublished);

  return (
    <div className="container pt-12">
      <div className="block sm:hidden">
        <BackBar backLink="/" />
      </div>
      <div className="w-full py-6 lg:py-10">
        <BlogHeader
          title={"Information"}
          description={
            "How notifications can increase sales and improve customer satisfaction."
          }
        />

        {publishedBlogs.length > 0 ? (
          <BlogGrid blogs={publishedBlogs} />
        ) : (
          <p>No posts published.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
