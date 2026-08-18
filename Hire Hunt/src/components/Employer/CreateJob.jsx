import axios from "axios";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";


const CreateJob = () => {
  const [jobTitle, setjobTitle] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [location, setlocation] = useState("");
  const [jobType, setjobType] = useState("");
  const [salary, setsalary] = useState("");
  const [experience, setexperience] = useState("");
  const [description, setdescription] = useState("");
  const [skills, setskills] = useState("");



  const handleSubmit = async (e) => {

    const userId = JSON.parse(localStorage.getItem("loggedInEmp")).id;

    e.preventDefault();

    
console.log(userId);
    const data = {
      jobTitle,
      companyName,
      location : location.toUpperCase(),
      jobType,
      salary: salary,
      experience,
      description,
      skills,
      postedBy: userId,
    };

    try {
      const res = await axios.post( `${import.meta.env.VITE_BaseUrl}/job/create`, data, {withCredentials: true });
      console.log("Job created successfully", res.data);
      toast.success("Job created successfully!");

      setjobTitle("");
      setcompanyName("");
      setlocation("");
      setjobType("");
      setsalary("");
      setexperience("");
      setdescription("");
      setskills("");

    } catch (error) {
      toast.error('Error while creating job ');
      console.error("Error creating job:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 p-4 mt-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <form
        onSubmit={handleSubmit}
        className="relative bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl"
      >
        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div>
            <label htmlFor="jobTitle" className="block font-semibold mb-1">
              Job Title
            </label>
            <input
              id="jobTitle"
              type="text"
              value={jobTitle}
              onChange={(e) => setjobTitle(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Frontend Developer"
              required
            />
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block font-semibold mb-1">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setcompanyName(e.target.value)}
              className="w-full p-2 border rounded"
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
              id="location"
              type="text"
              value={location}
              onChange={(e) => setlocation(e.target.value)}
              className="w-full p-2 border rounded"
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
              id="jobType"
              value={jobType}
              onChange={(e) => setjobType(e.target.value)}
              className="w-full p-2 border rounded"
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
              id="salary"
              type="number"
              maxLength={3}
              value={salary}
              onChange={(e) => setsalary(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="20, 40, 60 LPA "
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className="block font-semibold mb-1">
              Experience
            </label>
            <input
              id="experience"
              type="text"
              value={experience}
              onChange={(e) => setexperience(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="1-2 years"
              required
            />
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <label htmlFor="skills" className="block font-semibold mb-1">
            Skills Required
          </label>
          <textarea
            id="skills"
            value={skills}
            onChange={(e) => setskills(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="React, Node.js, MongoDB, etc."
            rows={3}
            required
          ></textarea>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label htmlFor="description" className="block font-semibold mb-1">
            Job Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Write about responsibilities, requirements, perks, etc."
            rows={4}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-black text-[#E0C163] font-semibold py-2 rounded hover:bg-[#333] transition duration-300"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
