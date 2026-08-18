import React, { useEffect, useState, useCallback } from "react";
import { MdOutlineBookmarkAdd, MdBookmarkAdded } from "react-icons/md";
import { GiModernCity, GiTakeMyMoney } from "react-icons/gi";
import { IoLocation, IoPeopleSharp } from "react-icons/io5";
import { HiBuildingOffice2 } from "react-icons/hi2";
import axios from "axios";
import ExpandedCard from "./ExpandedCard.jsx";

const JobCards = ({ jobs }) => {
  const [cardExpand, setcardExpand] = useState(false);
  const [selectedJob, setselectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInEmp"))?.id;

  const closeExpandedCard = () => {
    setcardExpand(false);
  };

  const fetchSavedJobs = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/job/fetch/savedJobs/${loggedInUser}`,
      );
      setSavedJobs(res.data.SavedJobs);
    } catch (error) {
      console.log("Error fetching saved jobs:", error.message);
    }
  }, [loggedInUser]);

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  const isJobSaved = (jobId) => {
    return savedJobs.some((savedJob) => savedJob._id === jobId);
  };

  const handleToggleSave = async (jobId) => {
    try {
      if (isJobSaved(jobId)) {
        await axios.delete(
          `${import.meta.env.VITE_BaseUrl}/job/removeSavedJob/${jobId}/${loggedInUser}`,
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_BaseUrl}/job/savedJobs/${jobId}/${loggedInUser}`,
        );
      }
      fetchSavedJobs();
    } catch (error) {
      console.log("Error toggling saved job:", error.message);
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {cardExpand && (
        <ExpandedCard closeExpand={closeExpandedCard} job={selectedJob} />
      )}

      {jobs.map((job) => (
        <div
          key={job._id}
          className="w-65 lg:w-72 bg-[#fff4d4] rounded-2xl p-3 m-3 flex flex-col justify-between hover:scale-105 duration-300 hover:bg-[#ffefb9] shadow-md shadow-[#E0C163]"
        >
          {/* Title */}
          <h2 className="font-bold text-2xl text-center truncate mb-1">
            {job.jobTitle}
          </h2>

          {/* Company */}
          <h3 className="font-medium text-sm text-gray-600 truncate mb-2">
            <HiBuildingOffice2 className="inline mr-1" />: {job.companyName}
          </h3>

          {/* Location + Type */}
          <div className="flex justify-between text-sm mb-2">
            <p className="truncate max-w-[48%]">
              <IoLocation className="inline mr-1" />: {job.location}
            </p>
            <p className="truncate max-w-[48%]">
              <GiModernCity className="inline mr-1" />: {job.jobType}
            </p>
          </div>

          {/* Salary + Experience */}
          <div className="flex justify-between text-sm mb-2">
            <p className="truncate max-w-[48%]">
              <GiTakeMyMoney className="inline mr-1" />: {job.salary} LPA
            </p>
            <p className="truncate max-w-[48%]">
              <IoPeopleSharp className="inline mr-1" />: {job.experience}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => {
                setcardExpand(true);
                setselectedJob(job);
              }}
              className="w-[75%] border border-black rounded-lg p-1.5 bg-black text-[#E0C163] font-semibold text-sm hover:bg-[#E0C163] hover:text-black duration-300"
            >
              View Details
            </button>

            <button
              onClick={() => handleToggleSave(job._id)}
              className={`w-[18%] flex items-center justify-center rounded-lg p-2 text-2xl duration-300 ${
                isJobSaved(job._id)
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-black text-[#E0C163]  hover:bg-[#E0C163] hover:text-black"
              }`}
            >
              {isJobSaved(job._id) ? (
                <MdBookmarkAdded />
              ) : (
                <MdOutlineBookmarkAdd />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCards;
