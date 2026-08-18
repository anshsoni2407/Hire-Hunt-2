import axios from "axios";
import React, { useState, useEffect } from "react";
import { HiBuildingOffice2 } from "react-icons/hi2";
import {
  IoLocation,
  IoPeopleSharp,
  IoArrowBack,
  IoClose,
} from "react-icons/io5";
import { GiModernCity, GiTakeMyMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import ExpandedCard from "./ExpandedCard.jsx";
import Footer from "../Reusable.jsx/Footer.jsx";

const SavedJobs = () => {
  const [savedJobs, setsavedJobs] = useState([]);
  const [cardExpand, setcardExpand] = useState(false);
  const [selectedJob, setselectedJob] = useState(null);

  const fetchSavedJobs = async () => {
    const userId = JSON.parse(localStorage.getItem("loggedInEmp"))?.id;
    if (!userId) return;

    try {
      const jobs = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/job/fetch/savedJobs/${userId}`,
        { withCredentials: true },
      );
      setsavedJobs(jobs.data.SavedJobs || []);
    } catch (error) {
      console.error("Error fetching saved jobs:", error.message);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const handleRemoveJob = async (jobId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("loggedInEmp"))?.id;
      if (!userId) return;

      await axios.delete(
        `${import.meta.env.VITE_BaseUrl}/job/removeSavedJob/${jobId}/${userId}`,
      );

      const updatedJobs = savedJobs.filter((job) => job._id !== jobId);
      setsavedJobs(updatedJobs);
    } catch (error) {
      console.log("Error removing job:", error.message);
    }
  };

  const closeExpand = () => {
    setcardExpand(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 shadow-lg bg-black">
        <Link to={"/jobseekerDash"}>
          <button className="text-[#c8ac5a] text-2xl p-1 rounded-full hover:bg-[#E0C163] hover:text-black duration-300">
            <IoArrowBack />
          </button>
        </Link>
        <h2 className="text-4xl text-[#c8ac5a]">SAVED JOBS</h2>
        <Link to={"/jobseekerDash"}>
          <button className="text-[#c8ac5a] text-2xl p-1 rounded-full hover:bg-[#E0C163] hover:text-black duration-300">
            <IoClose />
          </button>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-grow ">
        {cardExpand && (
          <ExpandedCard closeExpand={closeExpand} job={selectedJob} />
        )}

        {savedJobs.length > 0 ? (
          <div className="flex flex-wrap gap-6 m-6 justify-center px-4">
            {savedJobs.map((job) => (
              <div
                key={job._id}
                className="w-80 bg-[#fff4d4] rounded-2xl p-4 flex flex-col justify-between hover:scale-105 duration-300 hover:bg-[#ffefb9] shadow-md shadow-[#E0C163]"
              >
                {/* Title */}
                <h2 className="font-bold text-2xl text-center truncate mb-1">
                  {job.jobTitle}
                </h2>

                {/* Company */}
                <h3 className="font-medium text-sm text-gray-600 truncate mb-3">
                  <HiBuildingOffice2 className="inline mr-1" />:{" "}
                  {job.companyName}
                </h3>

                {/* Location & Job Type */}
                <div className="flex justify-between text-sm mb-3">
                  <p className="truncate max-w-[48%]">
                    <IoLocation className="inline mr-1" />: {job.location}
                  </p>
                  <p className="truncate max-w-[48%]">
                    <GiModernCity className="inline mr-1" />: {job.jobType}
                  </p>
                </div>

                {/* Salary & Experience */}
                <div className="flex justify-between text-sm mb-4">
                  <p className="truncate max-w-[48%]">
                    <GiTakeMyMoney className="inline mr-1" />: {job.salary} LPA
                  </p>
                  <p className="truncate max-w-[48%]">
                    <IoPeopleSharp className="inline mr-1" />: {job.experience}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-auto">
                  <button
                    onClick={() => {
                      setcardExpand(true);
                      setselectedJob(job);
                    }}
                    className="w-[75%] border border-black rounded-lg py-1 bg-black text-[#E0C163] font-semibold text-sm hover:bg-[#E0C163] hover:text-black duration-300"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleRemoveJob(job._id)}
                    className="w-[15%] flex items-center justify-center rounded-lg p-2 bg-black text-[#E0C163] text-xl hover:bg-[#E0C163] hover:text-black duration-300"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-[10%] text-3xl text-gray-600">
            No saved jobs
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer className="mt-auto" />
    </div>
  );
};

export default SavedJobs;
