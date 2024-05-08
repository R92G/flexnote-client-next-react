import React from "react";

const BrowserMock = () => {
  return (
    <div className="hidden lg:block w-full my-10 rounded-b-lg">
      <div className="w-full h-11 relative rounded-t-lg backdrop-filter backdrop-blur-lg bg-black opacity-90 flex overflow-hidden justify-start items-center space-x-1.5 px-2">
        <div className="absolute w-full h-full inset-0  bg-black  backdrop-filter backdrop-blur-[0.1] opacity-90 rounded-xl"></div>
        <span className="relative w-3 h-3 border-2 rounded-full border-red-400 bg-red-400"></span>
        <span className="relative w-3 h-3 border-2 rounded-full border-yellow-400 bg-yellow-400"></span>
        <span className="relative w-3 h-3 border-2 rounded-full border-green-400 bg-green-400"></span>
      </div>
      <div className="relative border-t-0 w-full h-96 border-t border-blue-900">
        <div className="absolute w-full border-[1px] border-black h-full inset-0 dark:bg-black opacity-10 backdrop-filter backdrop-blur-lg shadow-xl rounded-b-xl"></div>
      </div>
    </div>
  );
};

export default BrowserMock;
