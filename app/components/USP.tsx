import { CheckCheck } from "lucide-react";
import React from "react";

const USP = () => {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <div className="flex gap-4">
        <CheckCheck className="text-green-600" />
        <div>Increase Engagement</div>
      </div>
      <div className="flex gap-4">
        <CheckCheck className="text-green-600" />
        <div>Increase Customer Experience</div>
      </div>
      <div className="flex gap-4">
        <CheckCheck className="text-green-600" />
        <div>Increase Sales</div>
      </div>
    </div>
  );
};

export default USP;
