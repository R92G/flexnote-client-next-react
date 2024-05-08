import React from "react";

interface BlogHeaderProps {
  title: string;
  description: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, description }) => {
  return (
    <>
      <header className="mb-4">
        <h1 className="text-4xl lg:text-5xl font-heading mb-4 font-extrabold">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground text-gray-500">
          {description}
        </p>
      </header>
      <hr className="mb-4" />
    </>
  );
};

export default BlogHeader;
