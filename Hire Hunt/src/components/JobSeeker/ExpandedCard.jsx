import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import Footer from "../Reusable.jsx/Footer.jsx";
import axios from "axios";
import FancyLoader from '../Reusable.jsx/Loader.jsx'
import { toast, ToastContainer } from "react-toastify";

const ExpandedCard = ({ closeExpand, job }) => {
  const [resume, setResume] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const userId = JSON.parse(localStorage.getItem("loggedInEmp")).id;
  const jobId = job._id;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleApply = async () => {
    const formData = new FormData();
     setisLoading(true);
    
    formData.append("resume", resume);

    try { 
      const res = await axios.post(
        `${import.meta.env.VITE_BaseUrl}/application/apply/${jobId}/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("Application submitted:", res.data);
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.log("error in apply job", error.message);
      toast.error("Error submitting application.");
    }
    finally{
      setResume(null);
      setisLoading(false);
     setTimeout(() => closeExpand(), 3000);
    }

  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto shadow-xl">
    
      
      <div className="flex justify-between items-center p-4 shadow-lg bg-black">
        <button
          onClick={closeExpand}
          className="text-[#c8ac5a] text-2xl p-1 rounded-full hover:bg-[#E0C163] hover:text-black duration-300"
        >
          <IoArrowBack />
        </button>
        <h1 className="text-2xl md:text-4xl text-[#c8ac5a]">Job Details</h1>
        <button
          onClick={closeExpand}
          className="text-[#c8ac5a] text-2xl p-1 rounded-full hover:bg-[#E0C163] hover:text-black duration-300"
        >
          <IoMdClose />
        </button>
      </div>
{isLoading && <FancyLoader />}
<ToastContainer position="top-right" autoClose={3000} />
      {/* Main Content */}
      <section className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
        {/* Job Details Section */}
        <div className="flex-1 bg-gray-100 p-4 md:p-6 flex items-center justify-center">
          <div className="w-full max-w-xl space-y-4 md:space-y-6 text-base md:text-lg">
            <Detail label="Job Title" value={job.jobTitle} />
            <Detail label="Company Name" value={job.companyName} />
            <Detail label="Location" value={job.location} />
            <Detail label="Job Type" value={job.jobType} />
            <Detail label="Experience" value={job.experience} />
            <Detail label="Salary" value={`${job.salary} LPA`} />
            <Detail label="Skills" value={job.skills} />
            <Detail label="Description" value={job.description} />

            {/* Resume Upload */}
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2">
                Upload Resume:
              </h2>
              <input
                onChange={(e) => setResume(e.target.files[0])}
                type="file"
                className="block w-full p-2 border border-black rounded-md bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#E0C163] file:text-black file:font-semibold hover:file:bg-black hover:file:text-[#E0C163] transition"
              />
              <p className="text-center text-sm">Less than 5MB</p>
            </div>

            {!resume ? (
              <div className="flex justify-center p-4 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed">
                Upload your Resume to apply
              </div>
            ) : (
              <button
                onClick={handleApply}
                disabled={!resume}
                className="flex justify-center p-4 rounded-lg w-full bg-black text-[#E0C163] hover:bg-[#E0C163] hover:text-black"
              >
                Apply Now
              </button>
            )}
          </div>
        </div>

        {/* HURRY UP Section - only on large screens */}
        <div className="hidden lg:flex flex-1 bg-black text-[#E0C163] items-center justify-center text-center p-6 lg:p-10 text-3xl lg:text-6xl xl:text-8xl font-semibold hover:bg-[#E0c163] hover:text-black hover:border-black tracking-wide">
          HURRY UP!!
          <br />
          GRAB THE OPPORTUNITY NOW!!
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Reusable Detail Component
const Detail = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1">
    <h2 className="font-semibold text-gray-700 min-w-[130px]">{label}:</h2>
    <p className="text-gray-800 break-words">{value}</p>
  </div>
);

export default ExpandedCard;
