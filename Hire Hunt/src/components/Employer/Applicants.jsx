import React, { useState, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { IoCloseOutline, IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [filterApplicants, setFilterApplicants] = useState([]);

  const user = JSON.parse(localStorage.getItem("loggedInEmp"));
  const userId = user.id;

  // Fetch applicants
  const fetchApplicants = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/application/fetch/applicants/${userId}`,
      );
      setApplicants(response.data.applicants);
      setFilterApplicants(response.data.applicants);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      toast.error("Error fetching applicants");
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  useEffect(() => {
    setFilterApplicants(applicants);
  }, [applicants]);
const handleStatusUpdate = async (applicationId, newStatus) => {
  try {
    console.log("before api call");

    const statusUpdate = await axios.patch(
      `${import.meta.env.VITE_BaseUrl}/application/update/${applicationId}`,
      { status: newStatus },
    );

    console.log("after api call", statusUpdate);

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

    toast.success(`Status updated to ${newStatus}`);
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Failed to update status");
  }
};



  // Filter applicants
  const handleFilterChange = (status) => {
    if (status === "All") {
      setFilterApplicants(applicants);
    } else {
      setFilterApplicants(applicants.filter((app) => app.status === status));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between bg-black text-[#E0C163] p-2 shadow-lg w-full mb-6">
        <Link to="/employerDash">
          <button className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition">
            <MdArrowBack />
          </button>
        </Link>

        <h1 className="text-3xl font-semibold">Applicant</h1>

        <Link to="/employerDash">
          <button className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition">
            <IoCloseOutline />
          </button>
        </Link>
      </div>

 
      {/* Filter Buttons */}
      <div className="flex justify-evenly w-full mb-4">
        <button
          onClick={() => handleFilterChange("All")}
          className="bg-black text-white p-2 px-4 rounded-lg"
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("Accepted")}
          className="bg-green-500 text-white p-2 rounded-lg"
        >
          Accepted
        </button>
        <button
          onClick={() => handleFilterChange("Rejected")}
          className="bg-red-500 text-white p-2 rounded-lg"
        >
          Rejected
        </button>
        <button
          onClick={() => handleFilterChange("Pending")}
          className="bg-[#E0C163] text-black p-2 rounded-lg"
        >
          Pending
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
      {/* Applicants List */}
      <div className="flex flex-wrap justify-center">
        {filterApplicants.length === 0 ? (
          <div className="text-3xl text-center mt-6">NO APPLICANTS FOUND</div>
        ) : (
          filterApplicants.map((applicant, index) => (
            <div
              key={index}
              className="w-65 lg:w-72 p-4 m-5 bg-[#fff4d4] rounded-2xl flex flex-col hover:scale-102 duration-300 hover:bg-[#ffefb9] shadow-md shadow-[#E0C163]"
            >
              <div className="text-gray-500 text-right text-sm">
                {new Date(applicant.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              <h2 className="font-bold text-2xl truncate mb-1">
                {applicant.jobSeekerId.name}
              </h2>

              <h3 className="font-medium text-xl text-gray-600 truncate mb-2">
                {applicant.jobId.jobTitle}
              </h3>

              <div className="flex items-center justify-center gap-2">
                <IoCall /> <p>{applicant.jobSeekerId.phone}</p>
              </div>

              <div className="flex items-center justify-evenly mt-2">
                <a
                  href={applicant.resumeUrl}
                  className="w-[30%] border rounded-lg p-1.5 bg-black text-[#E0C163] font-semibold text-sm hover:bg-[#E0C163] hover:text-black duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>

                <select
                  value={applicant.status}
                  onChange={(e) =>
                    handleStatusUpdate(applicant._id, e.target.value)
                  }
                  className={`w-[55%] border border-black rounded-lg p-1.5 font-semibold text-sm
                    ${
                      applicant.status === "Accepted"
                        ? "bg-green-500 text-white"
                        : ""
                    }
                    ${
                      applicant.status === "Rejected"
                        ? "bg-red-500 text-white"
                        : ""
                    }
                    ${
                      applicant.status === "Pending"
                        ? "bg-[#E0C163] text-black"
                        : ""
                    }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Applicants;
