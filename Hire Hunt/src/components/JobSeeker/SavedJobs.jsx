import axios from "axios";
import React, { useState, useEffect } from "react";
import { 
  HiOutlineArrowLeft, 
  HiOutlineBuildingOffice2, 
  HiOutlineMapPin, 
  HiOutlineBriefcase, 
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineTrash,
  HiOutlineBookmark,
  HiOutlineBookmarkSlash
} from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import ExpandedCard from "./ExpandedCard.jsx";
import Footer from "../Reusable.jsx/Footer.jsx";
import { toast } from "react-toastify";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardExpand, setCardExpand] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  const fetchSavedJobs = async () => {
    const loggedInEmp = JSON.parse(localStorage.getItem("loggedInEmp") || "{}");
    const userId = loggedInEmp?.id || loggedInEmp?._id;
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const jobs = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/job/fetch/savedJobs/${userId}`,
        { withCredentials: true }
      );
      setSavedJobs(jobs.data.SavedJobs || []);
    } catch (error) {
      console.error("Error fetching saved jobs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const handleRemoveJob = async (jobId) => {
    try {
      const loggedInEmp = JSON.parse(localStorage.getItem("loggedInEmp") || "{}");
      const userId = loggedInEmp?.id || loggedInEmp?._id;
      if (!userId) return;

      await axios.delete(
        `${import.meta.env.VITE_BaseUrl}/job/removeSavedJob/${jobId}/${userId}`
      );

      const updatedJobs = savedJobs.filter((job) => job._id !== jobId);
      setSavedJobs(updatedJobs);
      toast.success("Job removed from saved list");
    } catch (error) {
      console.log("Error removing job:", error.message);
      toast.error("Failed to remove saved job");
    }
  };

  const closeExpand = () => {
    setCardExpand(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 font-sans">
      <div>
        {/* Header Bar */}
        <div className="bg-black text-white px-4 sm:px-8 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                to="/jobseekerDash"
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="Back to dashboard"
              >
                <HiOutlineArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Saved <span className="text-[#E0C163]">Jobs</span>
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">
                  All your bookmarked job listings in one place
                </p>
              </div>
            </div>

            <Link
              to="/jobseekerDash"
              className="text-xs font-semibold text-[#E0C163] hover:underline"
            >
              Explore More Jobs →
            </Link>
          </div>
        </div>

        {/* Content Body */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {cardExpand && (
            <ExpandedCard closeExpand={closeExpand} job={selectedJob} />
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 animate-pulse space-y-4">
                  <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                  <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                  <div className="h-8 w-full bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : savedJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedJobs.map((job) => {
                const companyInitial = (job.companyName?.[0] || "C").toUpperCase();

                return (
                  <div
                    key={job._id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md hover:border-gray-200 transition-all duration-200 group"
                  >
                    <div>
                      {/* Header */}
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
                          onClick={() => handleRemoveJob(job._id)}
                          className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                          title="Remove from saved jobs"
                          aria-label="Remove saved job"
                        >
                          <HiOutlineTrash className="h-5 w-5" />
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

                      {/* Skills */}
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

                    {/* Actions */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setCardExpand(true);
                        }}
                        className="w-full py-2 bg-black text-[#E0C163] hover:bg-gray-800 text-xs font-semibold rounded-lg transition-colors shadow-sm text-center"
                      >
                        View Details & Apply
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm max-w-md mx-auto my-12 space-y-4">
              <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto text-gray-400">
                <HiOutlineBookmarkSlash className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">No Saved Jobs Yet</h3>
                <p className="text-sm text-gray-500 mt-1">
                  When you bookmark positions you're interested in, they'll appear here for quick access.
                </p>
              </div>
              <button
                onClick={() => navigate("/jobseekerDash")}
                className="px-5 py-2.5 bg-black text-[#E0C163] hover:bg-gray-800 text-sm font-semibold rounded-lg shadow-sm transition-colors"
              >
                Browse Available Jobs
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default SavedJobs;

