import React, { useState, useEffect } from "react";
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";

const SearchJob = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm]);

  const quickTags = ["Remote", "Frontend", "Backend", "Full Stack", "Design", "Node.js"];

  return (
    <div className="bg-white border-b border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#E0C163]/15 text-gray-900 border border-[#E0C163]/30 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-[#E0C163] animate-pulse"></span>
          <span>Explore Verified Openings</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Find, Apply & Land Your <br className="hidden sm:inline" />
          <span className="text-[#E0C163] bg-gradient-to-r from-[#E0C163] to-[#caa23d] bg-clip-text text-transparent">
            Dream Career
          </span>
        </h1>

        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
          Discover verified opportunities from top companies and startups. Apply in seconds.
        </p>

        {/* Search Input Bar */}
        <div className="relative max-w-2xl mx-auto mt-6">
          <div className="relative flex items-center bg-white rounded-xl shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-[#E0C163] focus-within:border-transparent transition-all">
            <div className="pl-4 pr-2 text-gray-400">
              <HiOutlineMagnifyingGlass className="h-5 w-5" />
            </div>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search by role, skill, or location (e.g. React, Dehradun, Remote)..."
              className="w-full py-3 pr-10 text-sm text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="pr-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Clear search"
              >
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Quick Tag Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="text-gray-400 font-medium">Popular:</span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchTerm(tag)}
                className={`px-3 py-1 rounded-full border transition-all ${
                  searchTerm.toLowerCase() === tag.toLowerCase()
                    ? "bg-black text-[#E0C163] border-black"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchJob;