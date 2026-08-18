import React from 'react'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeDashboard from './components/dashboard/EmployeDashboard';
import JobSeekerDashboard from './components/dashboard/JobSeekerDashboard';
import SavedJobs from './components/JobSeeker/SavedJobs';
import CreatedJobTable from './components/Employer/CreatedJobTable';
import AppliedJobs from './components/JobSeeker/AppliedJobs';
import Applicants from './components/Employer/Applicants';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/employerDash" element={<EmployeDashboard />} />
          <Route path="/jobseekerDash" element={<JobSeekerDashboard />} />
          <Route path="/adminDash" element={<JobSeekerDashboard />} />

          <Route path="/saveJobsPage" element={<SavedJobs />} />
          <Route path="/createdJobsTable" element={<CreatedJobTable />} />
          <Route path="/appliedJobs" element={<AppliedJobs />} />
          <Route path="/applicants" element={<Applicants />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App