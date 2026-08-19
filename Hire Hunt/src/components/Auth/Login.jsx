import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import FancyLoader from "../Reusable.jsx/Loader.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email.trim().toLowerCase(),
      password: password,
    };

    try {
      setIsLoading(true);
      const baseUrl = import.meta.env.VITE_BaseUrl || "http://localhost:3000";
      const res = await axios.post(
        `${baseUrl}/auth/login`,
        data,
        {
          withCredentials: true,
        }
      );
      toast.success("Login successful!");

      const userRole = res.data.userdetail.RegisterAs;
      const userDetails = res.data.userdetail;

      localStorage.setItem("role", userRole);
      localStorage.setItem("loggedInEmp", JSON.stringify(userDetails));

      if (userRole === "jobseeker") {
        navigate("/jobseekerDash");
      } else if (userRole === "employer") {
        navigate("/employerDash");
      } else if (userRole === "admin") {
        navigate("/adminDash");
      }
    } catch (error) {
      console.log("Login error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 font-sans">
      <ToastContainer position="top-right" autoClose={3000} />
      {isLoading && <FancyLoader />}

      <div className="w-full max-w-md space-y-8">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-black flex items-center justify-center text-[#E0C163] font-bold text-xl shadow-md">
            HH
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome to Hire<span className="text-[#E0C163]">Hunt</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to access your dashboard and opportunities
          </p>
        </div>

        {/* Card */}
        <div className="bg-white py-8 px-6 shadow-sm border border-gray-100 rounded-2xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="••••••••"
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
                {isLoading ? "Signing in..." : "Sign In"}
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
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-4">
              <Link to="/sign-up" className="w-full block">
                <button
                  type="button"
                  className="w-full flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
                >
                  Create New Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

