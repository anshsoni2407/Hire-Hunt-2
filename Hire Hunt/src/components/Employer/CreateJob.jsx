import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { HiOutlineSparkles } from "react-icons/hi2";

const CreateJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedInEmp = JSON.parse(localStorage.getItem("loggedInEmp") || "{}");
    const userId = loggedInEmp?.id || loggedInEmp?._id;

    if (!userId) {
      toast.error("User session expired. Please sign in again.");
      return;
    }

    const data = {
      jobTitle: jobTitle.trim(),
      companyName: companyName.trim(),
      location: location.trim().toUpperCase(),
      jobType,
      salary: salary.trim(),
      experience: experience.trim(),
      description: description.trim(),
      skills: skills.trim(),
      postedBy: userId,
    };

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BaseUrl}/job/create`,
        data,
        { withCredentials: true }
      );
      console.log("Job created successfully", res.data);
      toast.success("Job listing published successfully!");

      setJobTitle("");
      setCompanyName("");
      setLocation("");
      setJobType("");
      setSalary("");
      setExperience("");
      setDescription("");
      setSkills("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error while creating job");
      console.error("Error creating job:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-b border-gray-100 pb-4">
          <h2 className="text-lg font-bold text-gray-900">Job Specifications</h2>
          <p className="text-xs text-gray-500 mt-0.5">Provide clear information about the vacancy</p>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Job Title */}
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1.5">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              id="jobTitle"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all sm:text-sm shadow-sm"
              placeholder="e.g. Senior Frontend Engineer"
              required
            />
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1.5">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all sm:text-sm shadow-sm"
              placeholder="e.g. Acme Corp Inc."
              required
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1.5">
              Location / City <span className="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all sm:text-sm shadow-sm"
              placeholder="e.g. DEHRADUN or REMOTE"
              required
            />
          </div>

          {/* Job Type */}
          <div>
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1.5">
              Work Mode / Type <span className="text-red-500">*</span>
            </label>
            <select
              id="jobType"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all sm:text-sm shadow-sm"
              required
            >
              <option value="">Select Work Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Salary */}
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1.5">
              Annual Salary (LPA) <span className="text-red-500">*</span>
            </label>
            <input
              id="salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all sm:text-sm shadow-sm"
              placeholder="e.g. 12 or 24"
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1.5">
              Required Experience <span className="text-red-500">*</span>
            </label>
            <input
              id="experience"
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all sm:text-sm shadow-sm"
              placeholder="e.g. 2-4 Years or Fresher"
              required
            />
          </div>
        </div>

        {/* Skills */}
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1.5">
            Required Skills (Comma separated) <span className="text-red-500">*</span>
          </label>
          <input
            id="skills"
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all sm:text-sm shadow-sm"
            placeholder="e.g. React, Node.js, TypeScript, PostgreSQL"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
            Comprehensive Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all sm:text-sm shadow-sm leading-relaxed"
            placeholder="Describe team culture, key responsibilities, benefits, qualifications, etc."
            rows={5}
            required
          ></textarea>
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 bg-black text-[#E0C163] hover:bg-gray-800 font-semibold rounded-lg shadow-sm transition-all text-sm disabled:opacity-50"
          >
            {isSubmitting ? "Publishing Job..." : "Publish Job Opening"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;

