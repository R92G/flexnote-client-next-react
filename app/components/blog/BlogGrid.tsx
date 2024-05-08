// components/BlogGrid.tsx

import BlogArticle from "./BlogArticle";
import { Blog } from "contentlayer/generated";

interface BlogGridProps {
  blogs: Blog[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ blogs }) => {
  return (
    <section className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {blogs.map((blog) => (
        <BlogArticle key={blog._id} blog={blog} />
      ))}
    </section>
  );
};

export default BlogGrid;
