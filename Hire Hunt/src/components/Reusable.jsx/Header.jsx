import React, { useState, useRef, useEffect } from "react";
import { 
  HiOutlineBars3, 
  HiOutlineXMark, 
  HiOutlineUser, 
  HiOutlineLockClosed, 
  HiOutlineArrowRightOnRectangle,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineArrowLeft,
  HiOutlineChevronDown
} from "react-icons/hi2";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";

const Header = () => {
  const role = localStorage.getItem("role");
  let loggedInEmp = null;
  try {
    loggedInEmp = JSON.parse(localStorage.getItem("loggedInEmp")) || {};
  } catch {
    loggedInEmp = {};
  }
  const userName = loggedInEmp?.name || "User";
  const userId = loggedInEmp?.id || loggedInEmp?._id;
  const userPhone = loggedInEmp?.phone || "";
  const profileLogo = (userName.charAt(0) || "U").toUpperCase();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactUs, setcontactUs] = useState(false);
  const [openEditForm, setopenEditForm] = useState(false);
  const [openEditPasswordForm, setopenEditPasswordForm] = useState(false);
  const [updatedName, setupdatedName] = useState(userName);
  const [updatedPhone, setupdatedPhone] = useState(userPhone);
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [showReloginModel, setshowReloginModel] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const HandleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BaseUrl}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log(`Error logging out: ${error.message}`);
    } finally {
      localStorage.removeItem("loggedInEmp");
      localStorage.removeItem("role");
      window.location.href = "/";
    }
  };

  const handleEditPassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    const data = {
      oldPassword: currentPassword,
      newPassword: newPassword,
    };
    try {
      setIsSubmitting(true);
      await axios.patch(
        `${import.meta.env.VITE_BaseUrl}/auth/user/editPassword/${userId}`,
        data,
        { withCredentials: true }
      );
      toast.success("Password updated successfully");
      setcurrentPassword("");
      setnewPassword("");
      setopenEditPasswordForm(false);
    } catch (error) {
      console.log(`Error updating password: ${error}`, error);
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const data = {
      name: updatedName,
      phone: updatedPhone,
    };
    try {
      setIsSubmitting(true);
      const res = await axios.patch(
        `${import.meta.env.VITE_BaseUrl}/auth/user/editProfile/${userId}`,
        data
      );
      if (res.status === 200) {
        setshowReloginModel(true);
        setopenEditForm(false);
      }
    } catch (error) {
      console.log(`Update error: ${error.message}`);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const isModalOpen = openEditForm || openEditPasswordForm || contactUs || showReloginModel;
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openEditForm, openEditPasswordForm, contactUs, showReloginModel]);

  const navLinkClass = (isActive) =>
    `text-sm font-medium transition-colors duration-150 cursor-pointer ${
      isActive
        ? "text-black font-semibold"
        : "text-gray-600 hover:text-gray-900"
    }`;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="Open mobile menu"
            >
              <HiOutlineBars3 className="h-6 w-6" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <Link
              to={role === "employer" ? "/employerDash" : "/jobseekerDash"}
              className="flex items-center space-x-2 group"
            >
              <div className="h-9 w-9 rounded-xl bg-black flex items-center justify-center text-[#E0C163] font-bold text-lg shadow-sm">
                HH
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-black transition-colors">
                Hire<span className="text-[#E0C163]">Hunt</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {role === "employer" ? (
              <>
                <button
                  type="button"
                  className={navLinkClass(location.pathname === "/employerDash")}
                  onClick={() => {
                    if (location.pathname !== "/employerDash") {
                      navigate("/employerDash");
                    } else {
                      const section = document.getElementById("created-jobs");
                      if (section) section.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Create Jobs
                </button>
                <Link
                  to="/createdJobsTable"
                  className={navLinkClass(location.pathname === "/createdJobsTable")}
                >
                  Created Jobs
                </Link>
                <Link
                  to="/applicants"
                  className={navLinkClass(location.pathname === "/applicants")}
                >
                  Applicants
                </Link>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={navLinkClass(location.pathname === "/jobseekerDash")}
                  onClick={() => {
                    if (location.pathname !== "/jobseekerDash") {
                      navigate("/jobseekerDash");
                    } else {
                      const section = document.getElementById("featured-jobs");
                      if (section) section.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Browse Jobs
                </button>
                <Link
                  to="/saveJobsPage"
                  className={navLinkClass(location.pathname === "/saveJobsPage")}
                >
                  Saved Jobs
                </Link>
                <Link
                  to="/appliedJobs"
                  className={navLinkClass(location.pathname === "/appliedJobs")}
                >
                  Applied Jobs
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={() => setcontactUs(true)}
              className={navLinkClass(false)}
            >
              Contact Us
            </button>
          </nav>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleMenu}
              className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none border border-gray-200"
            >
              <div className="h-8 w-8 rounded-full bg-black text-[#E0C163] flex items-center justify-center font-bold text-sm shadow-sm">
                {profileLogo}
              </div>
              <span className="hidden sm:inline-block text-sm font-medium text-gray-700">
                {userName}
              </span>
              <HiOutlineChevronDown className="hidden sm:inline-block h-4 w-4 text-gray-400" />
            </button>

            {menuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-3">
                  <p className="text-xs text-gray-500">Signed in as</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-[#E0C163]/20 text-gray-800 capitalize">
                    {role || "User"}
                  </span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setopenEditForm(true);
                    }}
                    className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <HiOutlineUser className="mr-3 h-4 w-4 text-gray-400" />
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setopenEditPasswordForm(true);
                    }}
                    className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <HiOutlineLockClosed className="mr-3 h-4 w-4 text-gray-400" />
                    Change Password
                  </button>
                </div>

                <div className="py-1">
                  <button
                    onClick={HandleLogout}
                    className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <HiOutlineArrowRightOnRectangle className="mr-3 h-4 w-4 text-red-500" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {role === "employer" ? (
            <>
              <button
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (location.pathname !== "/employerDash") {
                    navigate("/employerDash");
                  } else {
                    const section = document.getElementById("created-jobs");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Create Jobs
              </button>
              <Link
                to="/createdJobsTable"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Created Jobs
              </Link>
              <Link
                to="/applicants"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Applicants
              </Link>
            </>
          ) : (
            <>
              <button
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (location.pathname !== "/jobseekerDash") {
                    navigate("/jobseekerDash");
                  } else {
                    const section = document.getElementById("featured-jobs");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Browse Jobs
              </button>
              <Link
                to="/saveJobsPage"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Saved Jobs
              </Link>
              <Link
                to="/appliedJobs"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Applied Jobs
              </Link>
            </>
          )}
          <button
            onClick={() => {
              setcontactUs(true);
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Contact Us
          </button>
        </div>
      )}

      {/* Change Password Modal */}
      {openEditPasswordForm && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-black text-[#E0C163] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <HiOutlineLockClosed className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Change Password</h2>
              </div>
              <button
                onClick={() => setopenEditPasswordForm(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <HiOutlineXMark className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleEditPassword} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  required
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setcurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  required
                  type="password"
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                  placeholder="Enter new password (min. 6 characters)"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all text-sm"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setopenEditPasswordForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-sm font-medium bg-black text-[#E0C163] hover:bg-gray-800 rounded-lg shadow-sm transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {openEditForm && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-black text-[#E0C163] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <HiOutlineUser className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Edit Profile</h2>
              </div>
              <button
                onClick={() => setopenEditForm(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <HiOutlineXMark className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleEditProfile} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={updatedName}
                  onChange={(e) => setupdatedName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  value={updatedPhone}
                  onChange={(e) => setupdatedPhone(e.target.value)}
                  placeholder="10 digit phone number"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0C163] focus:border-transparent transition-all text-sm"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setopenEditForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-sm font-medium bg-black text-[#E0C163] hover:bg-gray-800 rounded-lg shadow-sm transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contact Us Modal */}
      {contactUs && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-black text-[#E0C163] px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Contact & Support</h2>
              <button
                onClick={() => setcontactUs(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <HiOutlineXMark className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold text-gray-900">We're here to help</h3>
                <p className="text-sm text-gray-500">
                  Have questions, feedback, or need assistance? Reach out anytime.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="p-3 rounded-full bg-[#E0C163]/20 text-[#E0C163]">
                    <HiOutlineEnvelope className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Email Us</p>
                    <p className="text-sm font-semibold text-gray-900">hirehunt@support.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="p-3 rounded-full bg-green-100 text-green-700">
                    <HiOutlinePhone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Phone Support</p>
                    <p className="text-sm font-semibold text-gray-900">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-700">
                    <HiOutlineMapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Headquarters</p>
                    <p className="text-sm font-semibold text-gray-900">Dehradun, India</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setcontactUs(false)}
                  className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium bg-black text-[#E0C163] hover:bg-gray-800 rounded-lg shadow-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Relogin Modal */}
      {showReloginModel && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 text-center space-y-4 max-w-sm w-full animate-in fade-in zoom-in duration-200">
            <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center">
              <HiOutlineUser className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Profile Updated Successfully</h3>
            <p className="text-sm text-gray-500">
              Your details have been saved. Please sign in again to continue.
            </p>
            <button
              onClick={() => {
                setshowReloginModel(false);
                navigate("/");
              }}
              className="w-full py-2.5 bg-black text-[#E0C163] hover:bg-gray-800 rounded-lg font-medium text-sm transition-colors shadow-sm"
            >
              Sign In Again
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </header>
  );
};

export default Header;
