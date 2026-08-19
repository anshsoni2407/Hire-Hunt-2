import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineLockClosed,
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
} from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const nameRegex = /^[A-Za-z ]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const passwordRegex = /^.{6,}$/;

  const [RegisterAs, setRegisterAs] = useState("jobseeker");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameRegex.test(name.trim())) {
      toast.error("Name should only contain letters and spaces");
      return;
    }
    if (!emailRegex.test(email.trim())) {
      toast.error("Invalid email address");
      return;
    }
    if (!phoneRegex.test(phone.trim())) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const data = {
      RegisterAs,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password,
    };

    try {
      setIsLoading(true);
      const baseUrl = import.meta.env.VITE_BaseUrl || "http://localhost:3000";
      const res = await axios.post(
        `${baseUrl}/auth/sign-up`,
        data
      );

      toast.success("Registration successful! Please login.");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      console.log("submitted", res);
    } catch (error) {
      console.error("Error submitting form:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 font-sans">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-lg space-y-8">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-black flex items-center justify-center text-[#E0C163] font-bold text-xl shadow-md">
            HH
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Join HireHunt as a Job Seeker or Employer
          </p>
        </div>

        {/* Card */}
        <div className="bg-white py-8 px-6 shadow-sm border border-gray-100 rounded-2xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Segmented Role Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I want to register as
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRegisterAs("jobseeker")}
                  className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                    RegisterAs === "jobseeker"
                      ? "bg-black text-[#E0C163] border-black shadow-sm"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <HiOutlineAcademicCap className="h-5 w-5" />
                  <span>Job Seeker</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRegisterAs("employer")}
                  className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                    RegisterAs === "employer"
                      ? "bg-black text-[#E0C163] border-black shadow-sm"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <HiOutlineBriefcase className="h-5 w-5" />
                  <span>Employer</span>
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <HiOutlineUser className="h-5 w-5" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all sm:text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <HiOutlineEnvelope className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all sm:text-sm"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <HiOutlinePhone className="h-5 w-5" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10 digit number"
                  className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <HiOutlineLockClosed className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-black bg-[#E0C163] hover:bg-[#d4b350] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E0C163] transition-all disabled:opacity-50"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400 font-medium">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-4">
              <Link to="/" className="w-full block">
                <button
                  type="button"
                  className="w-full flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
                >
                  Sign In Instead
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

