import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BackBarProps {
  backLink: string;
  className?: string;
  outline?: boolean;
}

const BackBar = ({ backLink, className, outline = false }: BackBarProps) => {
  return (
    <div
      className={cn(
        "border mb-4 w-fit px-4 py-2 rounded-full flex justify-center items-center cursor-pointer",
        className,
        outline ? "border-white" : "" // Add white border if outline is true
      )}
    >
      <Link
        href={backLink}
        className={cn(
          "flex items-center gap-2",
          outline ? "text-white" : "text-gray-500"
        )}
      >
        <FaChevronLeft /> <span className="inline-block">Back</span>
      </Link>
    </div>
  );
};

export default BackBar;
