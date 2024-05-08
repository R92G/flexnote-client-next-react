// components/BlogTags.tsx

interface BlogTagsProps {
  tags: string[];
}

const BlogTags: React.FC<BlogTagsProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};

export default BlogTags;
