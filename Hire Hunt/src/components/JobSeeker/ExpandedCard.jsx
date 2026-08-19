import React, { useEffect, useState } from "react";
import { 
  HiOutlineArrowLeft, 
  HiOutlineXMark, 
  HiOutlineBriefcase, 
  HiOutlineMapPin, 
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineDocumentArrowUp,
  HiOutlineBuildingOffice2,
  HiOutlineCheckCircle
} from "react-icons/hi2";
import Footer from "../Reusable.jsx/Footer.jsx";
import axios from "axios";
import FancyLoader from "../Reusable.jsx/Loader.jsx";
import { toast, ToastContainer } from "react-toastify";

const ExpandedCard = ({ closeExpand, job }) => {
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loggedInEmp = JSON.parse(localStorage.getItem("loggedInEmp") || "{}");
  const userId = loggedInEmp?.id || loggedInEmp?._id;
  const jobId = job?._id;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleApply = async () => {
    if (!resume) {
      toast.error("Please select a resume to upload.");
      return;
    }
    const formData = new FormData();
    setIsLoading(true);
    formData.append("resume", resume);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BaseUrl}/application/apply/${jobId}/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Application submitted:", res.data);
      toast.success("Application submitted successfully!");
      setResume(null);
      setTimeout(() => closeExpand(), 2000);
    } catch (error) {
      console.log("error in apply job", error.message);
      toast.error(error.response?.data?.message || "Error submitting application.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto font-sans animate-in fade-in duration-200 flex flex-col justify-between">
      <div>
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-black text-[#E0C163] px-4 sm:px-8 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <button
              onClick={closeExpand}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Go back"
            >
              <HiOutlineArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Job <span className="text-[#E0C163]">Overview</span>
            </h1>
          </div>
          <button
            onClick={closeExpand}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <HiOutlineXMark className="h-6 w-6" />
          </button>
        </div>

        {isLoading && <FancyLoader />}
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Main Content Container */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Job Overview Hero Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <HiOutlineBuildingOffice2 className="h-4 w-4 text-[#E0C163]" />
                  <span>{job.companyName}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  {job.jobTitle}
                </h2>
                <p className="text-sm text-gray-500 flex items-center pt-1">
                  <HiOutlineMapPin className="h-4 w-4 mr-1 text-gray-400" />
                  {job.location}
                </p>
              </div>

              {job.createdAt && (
                <div className="text-xs text-gray-400 self-start sm:self-center">
                  Posted {new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
              )}
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 text-center">
                <span className="text-xs text-gray-500 font-medium block">Job Type</span>
                <span className="text-sm font-bold text-gray-900 mt-0.5 block">{job.jobType}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 text-center">
                <span className="text-xs text-gray-500 font-medium block">Compensation</span>
                <span className="text-sm font-bold text-green-700 mt-0.5 block">{job.salary} LPA</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 text-center">
                <span className="text-xs text-gray-500 font-medium block">Experience</span>
                <span className="text-sm font-bold text-purple-700 mt-0.5 block">{job.experience}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 text-center">
                <span className="text-xs text-gray-500 font-medium block">Work Mode</span>
                <span className="text-sm font-bold text-blue-700 mt-0.5 block">{job.jobType?.toLowerCase().includes("remote") ? "Remote" : "On-site"}</span>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider text-xs">
                About the Role
              </h3>
              <div className="bg-gray-50/70 rounded-xl p-5 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap border border-gray-100">
                {job.description}
              </div>
            </div>

            {/* Skills */}
            {job.skills && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider text-xs">
                  Required Competencies & Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(typeof job.skills === "string"
                    ? job.skills.split(",")
                    : Array.isArray(job.skills)
                    ? job.skills
                    : [job.skills]
                  ).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Application Submission Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Apply for this Position
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Attach your resume (PDF/DOC, max 5MB) and submit directly to the hiring team.
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#E0C163] transition-colors bg-gray-50/50">
              <HiOutlineDocumentArrowUp className="mx-auto h-10 w-10 text-gray-400 mb-2" />
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                className="hidden"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-black text-[#E0C163] hover:bg-gray-800 text-sm font-medium rounded-lg shadow-sm transition-colors"
              >
                Choose File
              </label>
              <p className="text-xs text-gray-400 mt-2">
                {resume ? (
                  <span className="text-green-600 font-semibold flex items-center justify-center gap-1">
                    <HiOutlineCheckCircle className="h-4 w-4" /> Selected: {resume.name}
                  </span>
                ) : (
                  "PDF, DOC, DOCX up to 5MB"
                )}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeExpand}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={!resume || isLoading}
                className="px-6 py-2.5 rounded-lg bg-black text-[#E0C163] hover:bg-gray-800 text-sm font-semibold shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ExpandedCard;

