import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  HiOutlineArrowLeft, 
  HiOutlinePencilSquare, 
  HiOutlineTrash, 
  HiOutlineBriefcase,
  HiOutlineXMark,
  HiOutlineMapPin,
  HiOutlineInformationCircle
} from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../Reusable.jsx/Footer.jsx";
import ConfirmDialog from "../Admin/ConfirmDialog.jsx";

const CreatedJobTable = () => {
  const [createdJobsByEmp, setCreatedJobsByEmp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Confirm delete dialog
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, jobId: null, jobTitle: "" });
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();
  const loggedInEmp = JSON.parse(localStorage.getItem("loggedInEmp") || "{}");
  const userId = loggedInEmp?.id || loggedInEmp?._id;

  const loadCreatedJobs = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/job/fetch/createdJobs/${userId}`,
        { withCredentials: true }
      );
      setCreatedJobsByEmp(res.data.createdJobs?.CreatedJobs || []);
    } catch (error) {
      console.error("Error fetching created jobs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCreatedJobs();
  }, [refreshFlag]);

  const handleDelete = async () => {
    if (!deleteConfirm.jobId) return;
    try {
      setIsDeleting(true);
      await axios.delete(
        `${import.meta.env.VITE_BaseUrl}/job/deleteJob/${deleteConfirm.jobId}/${userId}`
      );
      setRefreshFlag((prev) => !prev);
      toast.success("Job deleted successfully");
      setDeleteConfirm({ isOpen: false, jobId: null, jobTitle: "" });
    } catch (error) {
      console.log("error in job deleting", error.message);
      toast.error(error.response?.data?.message || "Error deleting job");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (job) => {
    setEditFormData({ ...job });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    if (e) e.preventDefault();
    const jobId = editFormData._id;
    try {
      setIsUpdating(true);
      await axios.put(
        `${import.meta.env.VITE_BaseUrl}/job/update/${jobId}`,
        editFormData
      );
      toast.success("Job updated successfully");
      setShowEditModal(false);
      setRefreshFlag((prev) => !prev);
    } catch (error) {
      console.log("Update error:", error.message);
      toast.error(error.response?.data?.message || "Error updating job");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 font-sans">
      <ToastContainer position="top-right" autoClose={2000} />

      <div>
        {/* Header Bar */}
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
                  Posted <span className="text-[#E0C163]">Jobs</span>
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">
                  Manage all active listings published by your organization
                </p>
              </div>
            </div>

            <Link
              to="/employerDash"
              className="text-xs font-semibold text-[#E0C163] hover:underline"
            >
              + Create New Listing
            </Link>
          </div>
        </div>

        {/* Content Body */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          ) : createdJobsByEmp.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm max-w-md mx-auto my-12 space-y-4">
              <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto text-gray-400">
                <HiOutlineBriefcase className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">No Jobs Posted Yet</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Start hiring top candidates by posting your first job opening.
                </p>
              </div>
              <button
                onClick={() => navigate("/employerDash")}
                className="px-5 py-2.5 bg-black text-[#E0C163] hover:bg-gray-800 text-sm font-semibold rounded-lg shadow-sm transition-colors"
              >
                Post a Job Opening
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Job Title & Company
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Work Mode
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Salary
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Experience
                      </th>
                      <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {createdJobsByEmp.map((job) => {
                      const companyInitial = (job.companyName?.[0] || "C").toUpperCase();

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
                                  {job.jobTitle}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {job.companyName}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <div className="flex items-center">
                              <HiOutlineMapPin className="h-4 w-4 mr-1 text-gray-400" />
                              <span>{job.location}</span>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                              {job.jobType}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">
                            {job.salary} LPA
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {job.experience}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleEdit(job)}
                              className="inline-flex items-center px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <HiOutlinePencilSquare className="h-4 w-4 mr-1 text-gray-500" />
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                setDeleteConfirm({
                                  isOpen: true,
                                  jobId: job._id,
                                  jobTitle: job.jobTitle,
                                })
                              }
                              className="inline-flex items-center px-3 py-1.5 rounded-lg border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <HiOutlineTrash className="h-4 w-4 mr-1 text-red-500" />
                              Delete
                            </button>
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

      {/* Edit Job Modal */}
      {showEditModal && editFormData && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200 my-8">
            <div className="bg-black text-[#E0C163] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <HiOutlinePencilSquare className="h-5 w-5" />
                <h2 className="text-lg font-bold">Edit Job Listing</h2>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <HiOutlineXMark className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input
                    name="jobTitle"
                    type="text"
                    value={editFormData.jobTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    name="companyName"
                    type="text"
                    value={editFormData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    name="location"
                    type="text"
                    value={editFormData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Work Mode
                  </label>
                  <select
                    name="jobType"
                    value={editFormData.jobType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all text-sm"
                    required
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary (LPA)
                  </label>
                  <input
                    name="salary"
                    type="text"
                    value={editFormData.salary}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <input
                    name="experience"
                    type="text"
                    value={editFormData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Required Skills
                </label>
                <input
                  name="skills"
                  type="text"
                  value={editFormData.skills}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description
                </label>
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all text-sm"
                  required
                ></textarea>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-6 py-2 text-sm font-semibold bg-black text-[#E0C163] hover:bg-gray-800 rounded-lg shadow-sm transition-colors disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, jobId: null, jobTitle: "" })}
        onConfirm={handleDelete}
        title="Delete Job Opening"
        message={`Are you sure you want to delete "${deleteConfirm.jobTitle}"? This will permanently remove the listing and all received applications.`}
        confirmText="Delete Job"
        confirmColor="red"
        loading={isDeleting}
      />

      <Footer />
    </div>
  );
};

export default CreatedJobTable;


