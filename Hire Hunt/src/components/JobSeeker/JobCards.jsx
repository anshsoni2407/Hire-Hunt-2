import React, { useEffect, useState, useCallback } from "react";
import { 
  HiOutlineBookmark, 
  HiBookmark,
  HiOutlineBuildingOffice2, 
  HiOutlineMapPin, 
  HiOutlineBriefcase, 
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineInformationCircle
} from "react-icons/hi2";
import axios from "axios";
import ExpandedCard from "./ExpandedCard.jsx";

const JobCards = ({ jobs }) => {
  const [cardExpand, setCardExpand] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInEmp"))?.id;

  const closeExpandedCard = () => {
    setCardExpand(false);
  };

  const fetchSavedJobs = useCallback(async () => {
    if (!loggedInUser) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/job/fetch/savedJobs/${loggedInUser}`
      );
      setSavedJobs(res.data.SavedJobs || []);
    } catch (error) {
      console.log("Error fetching saved jobs:", error.message);
    }
  }, [loggedInUser]);

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  const isJobSaved = (jobId) => {
    return savedJobs.some((savedJob) => savedJob._id === jobId);
  };

  const handleToggleSave = async (jobId) => {
    if (!loggedInUser) return;
    try {
      if (isJobSaved(jobId)) {
        await axios.delete(
          `${import.meta.env.VITE_BaseUrl}/job/removeSavedJob/${jobId}/${loggedInUser}`
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_BaseUrl}/job/savedJobs/${jobId}/${loggedInUser}`
        );
      }
      fetchSavedJobs();
    } catch (error) {
      console.log("Error toggling saved job:", error.message);
    }
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm max-w-xl mx-auto my-8">
        <HiOutlineInformationCircle className="mx-auto h-12 w-12 text-gray-300 mb-3" />
        <h3 className="text-lg font-bold text-gray-800 mb-1">No Jobs Found</h3>
        <p className="text-sm text-gray-500">
          Try adjusting your search criteria or keywords to find more opportunities.
        </p>
      </div>
    );
  }

  return (
    <>
      {cardExpand && (
        <ExpandedCard closeExpand={closeExpandedCard} job={selectedJob} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => {
          const saved = isJobSaved(job._id);
          const companyInitial = (job.companyName?.[0] || "C").toUpperCase();

          return (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md hover:border-gray-200 transition-all duration-200 group"
            >
              <div>
                {/* Header: Company Avatar & Bookmark */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-11 w-11 rounded-xl bg-black text-[#E0C163] flex items-center justify-center font-bold text-lg shadow-sm flex-shrink-0">
                      {companyInitial}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
                        {job.companyName}
                      </h4>
                      <p className="text-xs text-gray-400 flex items-center mt-0.5">
                        <HiOutlineMapPin className="h-3.5 w-3.5 mr-1 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleSave(job._id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      saved
                        ? "bg-amber-50 border-amber-200 text-[#ca9e28]"
                        : "border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                    title={saved ? "Remove from saved jobs" : "Save job"}
                    aria-label="Save job"
                  >
                    {saved ? (
                      <HiBookmark className="h-5 w-5 fill-current text-[#ca9e28]" />
                    ) : (
                      <HiOutlineBookmark className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Job Title */}
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors line-clamp-1 mb-3">
                  {job.jobTitle}
                </h3>

                {/* Pill Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    <HiOutlineBriefcase className="h-3 w-3 mr-1" />
                    {job.jobType}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                    <HiOutlineCurrencyDollar className="h-3 w-3 mr-1" />
                    {job.salary} LPA
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                    <HiOutlineClock className="h-3 w-3 mr-1" />
                    {job.experience}
                  </span>
                </div>

                {/* Description Excerpt */}
                {job.description && (
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                    {job.description}
                  </p>
                )}

                {/* Skills Preview */}
                {job.skills && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {(typeof job.skills === "string"
                      ? job.skills.split(",")
                      : Array.isArray(job.skills)
                      ? job.skills
                      : [job.skills]
                    )
                      .slice(0, 3)
                      .map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] bg-gray-100 text-gray-600 font-medium truncate max-w-[120px]"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                  </div>
                )}
              </div>

              {/* Action Area */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                <span className="text-[11px] text-gray-400">
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "Recently posted"}
                </span>

                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setCardExpand(true);
                  }}
                  className="px-4 py-2 bg-black text-[#E0C163] hover:bg-gray-800 text-xs font-semibold rounded-lg transition-colors shadow-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default JobCards;

