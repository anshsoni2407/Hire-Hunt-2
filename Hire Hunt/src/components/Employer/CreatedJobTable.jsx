import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const CreatedJobTable = () => {
  const [createdJobsByEmp, setcreatedJobsByEmp] = useState([]);
  const [refershFlag, setrefershFlag] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  const userId = JSON.parse(localStorage.getItem("loggedInEmp")).id;

  const createdJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/job/fetch/createdJobs/${userId}`,
        {
          withCredentials: true,
        },
      );
      setcreatedJobsByEmp(res.data.createdJobs.CreatedJobs);
    } catch (error) {
      console.error("Error fetching created jobs:", error.message);
    } 
  };

  useEffect(() => {
    createdJobs();
  }, [refershFlag]);

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BaseUrl}/job/deleteJob/${jobId}/${userId}`,
      );
      setrefershFlag((prev) => !prev);
      toast.success("Job deleted successfully");
    } catch (error) {
      console.log("error in job deleting", error.message);
      toast.error("Error deleting job");
    }
  };

  const handleEdit = (job) => {
    setEditFormData(job);
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const jobId = editFormData._id
    try {
      await axios.put(
        `${import.meta.env.VITE_BaseUrl}/job/update/${jobId}`,
        editFormData,
      );
      toast.success("Job updated successfully");
      setShowEditModal(false);
      setrefershFlag((prev) => !prev);
    } catch (error) {
      console.log("Update error:", error.message);
      toast.error("Error updating job");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="flex items-center justify-between bg-black text-[#E0C163] p-2 shadow-lg w-full mb-6">
        <Link to={"/employerDash"}>
          <button className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition">
            <IoMdArrowBack />
          </button>
        </Link>
        <h1 className="text-3xl font-semibold">Created Job</h1>

        <Link to={"/employerDash"}>
          <button className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition">
            <IoCloseOutline />
          </button>
        </Link>
      </div>

      {createdJobsByEmp.length === 0 ? (
        <div className="text-3xl text-center">NO CREATED JOBS</div>
      ) : (
        <div className="w-full overflow-x-auto mt-8 mb-8">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-4 text-center">Job Title</th>
                <th className="py-3 px-4 text-center">Company Name</th>
                <th className="py-3 px-4 text-center">Location</th>
                <th className="py-3 px-4 text-center">Job Type</th>
                <th className="py-3 px-4 text-center">Description</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {createdJobsByEmp.map((job, index) => (
                <tr
                  key={index}
                  className="text-gray-700 border hover:bg-gray-100"
                >
                  <td className="py-3 px-4 text-center truncate">
                    {job.jobTitle}
                  </td>
                  <td className="py-3 px-4 text-center truncate">
                    {job.companyName}
                  </td>
                  <td className="py-3 px-4 text-center truncate">
                    {job.location}
                  </td>
                  <td className="py-3 px-4 text-center truncate">
                    {job.jobType}
                  </td>
                  <td className="py-3 px-4 text-center max-w-xs truncate">
                    {job.description}
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(job)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-red-500 hover:underline ml-4"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {showEditModal && editFormData && (
        <div className="fixed top-0 left-0 flex justify-center bg-black/40 p-4 w-full h-full z-50 overflow-auto">
          <div className="bg-gray-100 p-4 rounded-xl overflow-y-scroll">

         <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="relative bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-4xl"
          >
            {/* Header */}
            <div className="relative mb-6 bg-black text-[#E0C163] rounded-lg py-3">
              {/* Back button */}
              <div
                onClick={() => setShowEditModal(false)}
                className="absolute top-1/2 -translate-y-1/2 left-3 text-2xl sm:text-3xl font-extrabold cursor-pointer text-white hover:bg-[#E0C163] hover:text-black p-1 rounded-full duration-300"
              >
                <IoMdArrowBack />
              </div>
              {/* Close button */}
              <div
                onClick={() => setShowEditModal(false)}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-2xl sm:text-3xl font-extrabold cursor-pointer text-white hover:bg-[#E0C163] hover:text-black p-1 rounded-full duration-300"
              >
                <IoCloseOutline />
              </div>
              <h2 className="text-center font-bold text-lg sm:text-xl">
                Edit Job
              </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Job Title */}
              <div>
                <label htmlFor="jobTitle" className="block font-semibold mb-1">
                  Job Title
                </label>
                <input
                  name="jobTitle"
                  type="text"
                  value={editFormData.jobTitle}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E0C163]"
                  placeholder="Frontend Developer"
                  required
                />
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block font-semibold mb-1"
                >
                  Company Name
                </label>
                <input
                  name="companyName"
                  type="text"
                  value={editFormData.companyName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E0C163]"
                  placeholder="TechCorp Inc."
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block font-semibold mb-1">
                  Location
                </label>
                <input
                  name="location"
                  type="text"
                  value={editFormData.location}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E0C163]"
                  placeholder="Dehradun"
                  required
                />
              </div>

              {/* Job Type */}
              <div>
                <label htmlFor="jobType" className="block font-semibold mb-1">
                  Job Type
                </label>
                <select
                  name="jobType"
                  value={editFormData.jobType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E0C163]"
                  required
                >
                  <option value="">Select</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              {/* Salary */}
              <div>
                <label htmlFor="salary" className="block font-semibold mb-1">
                  Salary in Lakh Per Annum (LPA)
                </label>
                <input
                  name="salary"
                  type="text"
                  value={editFormData.salary}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E0C163]"
                  placeholder="20, 40, 60 LPA"
                  required
                />
              </div>

              {/* Experience */}
              <div>
                <label
                  htmlFor="experience"
                  className="block font-semibold mb-1"
                >
                  Experience
                </label>
                <input
                  name="experience"
                  type="text"
                  value={editFormData.experience}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E0C163]"
                  placeholder="1-2 years"
                  required
                />
              </div>
            </div>

            {/* Skills */}
            <div className="mt-4 sm:mt-6">
              <label htmlFor="skills" className="block font-semibold mb-1">
                Skills Required
              </label>
              <textarea
                name="skills"
                value={editFormData.skills}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E0C163]"
                placeholder="React, Node.js, MongoDB, etc."
                rows={3}
                required
              ></textarea>
            </div>

            {/* Description */}
            <div className="mt-4 sm:mt-6">
              <label htmlFor="description" className="block font-semibold mb-1">
                Job Description
              </label>
              <textarea
                name="description"
                value={editFormData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E0C163]"
                placeholder="Write about responsibilities, requirements, perks, etc."
                rows={4}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full mt-6 sm:mt-8 bg-black text-[#E0C163] font-semibold py-2 rounded hover:bg-[#333] transition duration-300"
            >
              Update Job
            </button>
          </form>
        </div></div>
      )}
    </div>
  );
};

export default CreatedJobTable;

