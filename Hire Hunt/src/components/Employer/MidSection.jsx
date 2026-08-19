import React from "react";
import CreateJob from "./CreateJob.jsx";
import { HiOutlineBriefcase, HiOutlinePlusCircle } from "react-icons/hi2";

const MidSection = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header section */}
      <div className="mb-8" id="created-jobs">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-black text-[#E0C163] shadow-sm">
            <HiOutlineBriefcase className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Post a New Opportunity
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Fill in the job details below to publish to thousands of qualified candidates
            </p>
          </div>
        </div>
      </div>

      {/* Create Job Form Card */}
      <CreateJob />
    </div>
  );
};

export default MidSection;

