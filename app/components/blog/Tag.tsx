import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface TagProps {
  link?: string;
  name: string;
  className?: any;
}

const Tag: React.FC<TagProps> = ({ link = "#", name, ...props }) => {
  return (
    <div
      className={cn(
        "inline-block py-2 sm:py-3 px-6 sm:px-10  bg-white text-light dark:text-accent rounded-full capitalize font-semibold border-2 border-solid border-light transition-all ease duration-200 text-sm sm:text-base",
        props.className
      )}
    >
      {name}
    </div>
  );
};

export default Tag;
