import React from "react";
import JobCards from "./JobCards";
import { HiOutlineBriefcase } from "react-icons/hi2";

const CardContainer = ({ jobs }) => {
  const count = Array.isArray(jobs) ? jobs.length : 0;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="featured-jobs">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Featured Opportunities
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E0C163]/20 text-gray-900 border border-[#E0C163]/40">
              {count} {count === 1 ? "Job" : "Jobs"} Available
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Browse the latest verified positions matched with your profile
          </p>
        </div>
      </div>

      {/* Grid of Job Cards */}
      <JobCards jobs={jobs} />
    </div>
  );
};

export default CardContainer;

