import React, { useState, useEffect } from "react";
import { 
  HiOutlineArrowLeft, 
  HiOutlineBuildingOffice2, 
  HiOutlineMapPin, 
  HiOutlineBriefcase, 
  HiOutlinePhone,
  HiOutlineDocumentText,
  HiOutlineInformationCircle
} from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Reusable.jsx/Footer.jsx";
import axios from "axios";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loggedInEmp = JSON.parse(localStorage.getItem("loggedInEmp") || "{}");
  const userId = loggedInEmp?.id || loggedInEmp?._id;

  const fetchAppliedJobs = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/application/fetch/${userId}`
      );
      setAppliedJobs(res.data.jobs || []);
    } catch (error) {
      console.log(`Error in fetching applied jobs: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase() || "pending";
    let bg = "bg-yellow-50 text-yellow-800 border-yellow-200";
    if (s === "accepted" || s === "selected") {
      bg = "bg-green-50 text-green-800 border-green-200";
    } else if (s === "rejected") {
      bg = "bg-red-50 text-red-800 border-red-200";
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${bg} capitalize`}>
        {status || "Pending"}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 font-sans">
      <div>
        {/* Header */}
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
                  Applied <span className="text-[#E0C163]">Jobs</span>
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">
                  Track the real-time status of your job applications
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

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          ) : appliedJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm max-w-md mx-auto my-12 space-y-4">
              <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto text-gray-400">
                <HiOutlineDocumentText className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">No Applications Submitted</h3>
                <p className="text-sm text-gray-500 mt-1">
                  You haven't applied to any job positions yet. Find your next opportunity today!
                </p>
              </div>
              <button
                onClick={() => navigate("/jobseekerDash")}
                className="px-5 py-2.5 bg-black text-[#E0C163] hover:bg-gray-800 text-sm font-semibold rounded-lg shadow-sm transition-colors"
              >
                Browse Open Positions
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Job Position & Company
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Mode & Type
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appliedJobs.map((job) => {
                      if (!job?.jobId) return null;
                      const companyInitial = (job.jobId?.companyName?.[0] || "C").toUpperCase();

                      return (
                        <tr
                          key={job._id}
                          className="hover:bg-gray-50/80 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-xl bg-black text-[#E0C163] flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0">
                                {companyInitial}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-gray-900">
                                  {job.jobId.jobTitle}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {job.jobId.companyName}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <div className="flex items-center">
                              <HiOutlineMapPin className="h-4 w-4 mr-1 text-gray-400" />
                              <span>{job.jobId.location}</span>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <div className="flex items-center">
                              <HiOutlineBriefcase className="h-4 w-4 mr-1 text-gray-400" />
                              <span>{job.jobId.jobType}</span>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <div className="flex items-center">
                              <HiOutlinePhone className="h-4 w-4 mr-1 text-gray-400" />
                              <span>{job.jobId.postedBy?.phone || "N/A"}</span>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(job.status)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AppliedJobs;

