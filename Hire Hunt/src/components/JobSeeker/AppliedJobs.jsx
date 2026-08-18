import React, { useState, useEffect } from "react";
import { HiBuildingOffice2 } from "react-icons/hi2";
import {
  IoLocation,
  IoPeopleSharp,
  IoArrowBack,
  IoClose,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import Footer from "../Reusable.jsx/Footer.jsx";
import axios from "axios";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  const userId = JSON.parse(localStorage.getItem("loggedInEmp")).id;

  const fetchAppliedJobs = async () => {
    try {
      const job = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/application/fetch/${userId}`,
      );
      setAppliedJobs(job.data.jobs);
    } catch (error) {
      console.log(`error in fetching Applied jobs ${error.message}`);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);
 
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 shadow-lg bg-black">
        <Link to={"/jobseekerDash"}>
          <button className="text-[#c8ac5a] text-2xl p-1 rounded-full hover:bg-[#E0C163] hover:text-black duration-300">
            <IoArrowBack />
          </button>
        </Link>
        <h2 className="text-3xl md:text-4xl text-[#c8ac5a]">APPLIED JOBS</h2>
        <Link to={"/jobseekerDash"}>
          <button className="text-[#c8ac5a] text-2xl p-1 rounded-full hover:bg-[#E0C163] hover:text-black duration-300">
            <IoClose />
          </button>
        </Link>
      </div>

      {/* Content */}
      {appliedJobs.length === 0 ? (
        <div className="flex-grow text-2xl md:text-3xl text-center m-6">
          No applied jobs found
        </div>
      ) : (
        <div className="flex-grow mt-6 px-2">
          {/* Scrollable wrapper */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm md:text-lg text-center border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Job Title</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Work Mode</th>
                  <th className="px-4 py-2">Contact Details</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {appliedJobs.map((job) => (
                  job?.jobId ? (
                     <tr
                    key={job._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="p-4">
                      <h3 className="text-base md:text-lg font-semibold">
                        {job.jobId.jobTitle}
                      </h3>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center">
                        <IoLocation className="text-xl md:text-2xl text-gray-500 mr-2" />
                        <span>{job.jobId.location}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center">
                        <HiBuildingOffice2 className="text-xl md:text-2xl text-gray-500 mr-2" />
                        <span>{job.jobId.jobType}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center">
                        <IoPeopleSharp className="text-xl md:text-2xl text-gray-500 mr-2" />
                        <span>{job.jobId.postedBy.phone}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div
                        className="bg-[#c8ac5a] text-black font-semibold hover:text-white px-3 py-1 md:px-4 md:py-2 rounded hover:bg-black transition duration-300 cursor-default "
                      >
                        {job.status}
                      </div>
                    </td>
                  </tr>
                  ) : null
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer className="mt-auto" />
    </div>
  );
};

export default AppliedJobs;
