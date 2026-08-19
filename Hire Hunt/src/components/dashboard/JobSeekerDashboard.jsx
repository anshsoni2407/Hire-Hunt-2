import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Reusable.jsx/Header";
import CardContainer from "../JobSeeker/CardContainer";
import Footer from "../Reusable.jsx/Footer";
import SearchJob from "../JobSeeker/SearchJob";

const JobSeekerDashboard = () => {
  const [fetchedJobs, setFetchedJobs] = useState([]);
  const [filterJobs, setFilterJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role) {
      navigate("/");
      return;
    }

    const loadJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_BaseUrl}/job/fetch`);
        const jobs = Array.isArray(res.data) ? res.data : res.data.jobs || [];
        setFetchedJobs(jobs);
        setFilterJobs(jobs);
      } catch (error) {
        console.log(error.message, "Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [navigate]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === "") {
      setFilterJobs(fetchedJobs);
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = fetchedJobs.filter((job) => {
      const title = (job.jobTitle || "").toLowerCase();
      const loc = (job.location || "").toLowerCase();
      const company = (job.companyName || "").toLowerCase();
      const skills = (typeof job.skills === "string" ? job.skills : "").toLowerCase();
      const type = (job.jobType || "").toLowerCase();

      return (
        title.includes(term) ||
        loc.includes(term) ||
        company.includes(term) ||
        skills.includes(term) ||
        type.includes(term)
      );
    });
    setFilterJobs(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Header />
      <SearchJob onSearch={handleSearch} />

      <main className="flex-grow">
        <CardContainer jobs={filterJobs} loading={loading} />
      </main>

      <Footer />
    </div>
  );
};

export default JobSeekerDashboard;