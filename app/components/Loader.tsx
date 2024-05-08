"use client";

import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <PuffLoader
        size={100}
        className="drop-shadow-xl shadow-black/10 dark:shadow-white/10"
      />
    </div>
  );
};

export default Loader;
