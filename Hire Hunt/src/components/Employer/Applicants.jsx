import React, { useState, useEffect } from "react";
import { 
  HiOutlineArrowLeft, 
  HiOutlinePhone, 
  HiOutlineEnvelope,
  HiOutlineDocumentText, 
  HiOutlineBriefcase,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineArrowTopRightOnSquare
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../Reusable.jsx/Footer.jsx";

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [filterApplicants, setFilterApplicants] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const loggedInEmp = JSON.parse(localStorage.getItem("loggedInEmp") || "{}");
  const userId = loggedInEmp?.id || loggedInEmp?._id;

  // Fetch applicants
  const fetchApplicants = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/application/fetch/applicants/${userId}`
      );
      const data = response.data.applicants || [];
      setApplicants(data);
      setFilterApplicants(data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      toast.error(error.response?.data?.message || "Error fetching applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BaseUrl}/application/update/${applicationId}`,
        { status: newStatus }
      );

      setApplicants((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );

      setFilterApplicants((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );

      toast.success(`Application status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  // Filter applicants
  const handleFilterChange = (status) => {
    setActiveFilter(status);
    if (status === "All") {
      setFilterApplicants(applicants);
    } else {
      setFilterApplicants(
        applicants.filter(
          (app) => (app.status || "").toLowerCase() === status.toLowerCase()
        )
      );
    }
  };

  const getCount = (status) => {
    if (status === "All") return applicants.length;
    return applicants.filter(
      (app) => (app.status || "").toLowerCase() === status.toLowerCase()
    ).length;
  };

  const filterTabs = [
    { label: "All Applicants", key: "All" },
    { label: "Pending", key: "Pending" },
    { label: "Accepted", key: "Accepted" },
    { label: "Rejected", key: "Rejected" },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 font-sans">
      <ToastContainer position="top-right" autoClose={3000} />

      <div>
        {/* Top Header */}
        <div className="bg-black text-white px-4 sm:px-8 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                to="/employerDash"
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="Back to dashboard"
              >
                <HiOutlineArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Candidate <span className="text-[#E0C163]">Applications</span>
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">
                  Review applicant profiles and update hiring progress
                </p>
              </div>
            </div>

            <span className="text-xs text-gray-300 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700">
              Total Candidates: <strong className="text-[#E0C163]">{applicants.length}</strong>
            </span>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 flex flex-wrap gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.key;
              const count = getCount(tab.key);
              return (
                <button
                  key={tab.key}
                  onClick={() => handleFilterChange(tab.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-black text-[#E0C163] shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-gray-800 text-[#E0C163]"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Candidate Grid */}
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
          ) : filterApplicants.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm max-w-md mx-auto my-12 space-y-4">
              <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto text-gray-400">
                <HiOutlineDocumentText className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">No Applicants in this Stage</h3>
                <p className="text-sm text-gray-500 mt-1">
                  There are currently no candidates matching the selected status filter.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterApplicants.map((applicant) => {
                const seekerName = applicant.jobSeekerId?.name || "Candidate";
                const initial = seekerName[0].toUpperCase();
                const jobTitle = applicant.jobId?.jobTitle || "Job Position";
                const phone = applicant.jobSeekerId?.phone || "N/A";
                const email = applicant.jobSeekerId?.email;
                const status = applicant.status || "Pending";

                return (
                  <div
                    key={applicant._id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md hover:border-gray-200 transition-all duration-200"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-11 w-11 rounded-xl bg-black text-[#E0C163] flex items-center justify-center font-bold text-lg shadow-sm flex-shrink-0">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-base font-bold text-gray-900 truncate">
                              {seekerName}
                            </h3>
                            <p className="text-xs text-gray-500 flex items-center mt-0.5 truncate">
                              <HiOutlineBriefcase className="h-3.5 w-3.5 mr-1 text-gray-400 flex-shrink-0" />
                              <span className="truncate">{jobTitle}</span>
                            </p>
                          </div>
                        </div>

                        <span className="text-[11px] text-gray-400 whitespace-nowrap">
                          {applicant.createdAt
                            ? new Date(applicant.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            : ""}
                        </span>
                      </div>

                      {/* Contact Details */}
                      <div className="bg-gray-50 rounded-xl p-3 space-y-1.5 mb-5 text-xs text-gray-600 border border-gray-100">
                        <div className="flex items-center">
                          <HiOutlinePhone className="h-3.5 w-3.5 mr-2 text-gray-400 flex-shrink-0" />
                          <span>{phone}</span>
                        </div>
                        {email && (
                          <div className="flex items-center truncate">
                            <HiOutlineEnvelope className="h-3.5 w-3.5 mr-2 text-gray-400 flex-shrink-0" />
                            <span className="truncate">{email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions & Status Dropdown */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                      {applicant.resumeUrl ? (
                        <a
                          href={applicant.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 bg-black text-[#E0C163] hover:bg-gray-800 text-xs font-semibold rounded-lg shadow-sm transition-colors"
                        >
                          <HiOutlineDocumentText className="h-3.5 w-3.5 mr-1" />
                          Resume
                          <HiOutlineArrowTopRightOnSquare className="h-3 w-3 ml-1" />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No resume</span>
                      )}

                      <div className="flex items-center space-x-1.5">
                        <select
                          value={status}
                          onChange={(e) =>
                            handleStatusUpdate(applicant._id, e.target.value)
                          }
                          className={`text-xs font-semibold rounded-lg px-2.5 py-2 border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E0C163] ${
                            status === "Accepted"
                              ? "bg-green-50 text-green-800 border-green-200"
                              : status === "Rejected"
                              ? "bg-red-50 text-red-800 border-red-200"
                              : "bg-yellow-50 text-yellow-800 border-yellow-200"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Applicants;

