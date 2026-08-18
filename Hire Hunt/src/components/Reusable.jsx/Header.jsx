import React, { useState, useRef, useEffect } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { FaEdit, FaLock } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import Footer from "./Footer";
import { toast, ToastContainer} from "react-toastify";

const Header = () => {
  const role = localStorage.getItem("role");
  const loggedInEmp = JSON.parse(localStorage.getItem("loggedInEmp"));
  const userName = loggedInEmp.name;
  const userId = loggedInEmp.id;
  const userPhone = loggedInEmp.phone;  
  const profileLogo = loggedInEmp.name.charAt(0).toUpperCase();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactUs, setcontactUs] = useState(false);
  const [openEditForm, setopenEditForm] = useState(false);
  const [openEditPasswordForm, setopenEditPasswordForm] = useState(false)
  const [updatedName, setupdatedName] = useState(userName);
  const [updatedPhone, setupdatedPhone] = useState(userPhone);
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState('')
  const [showReloginModel, setshowReloginModel] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
      localStorage.removeItem("loggedInEmp");
      localStorage.removeItem("role");
      window.location.href = "/";
    } catch (error) {
      console.log(`Error logging out: ${error.message}`);
    }
  };

  const handleEditPassword = async (e) => {
    e.preventDefault();
    const data = {
      oldPassword: currentPassword,
      newPassword: newPassword,
    };
try {
  const res = await axios.patch(
    `${import.meta.env.VITE_BaseUrl}/auth/user/editPassword/${userId}`,
    data,
    { withCredentials: true },
  );
console.log('Password updated successfully'); 
toast.success("Password updated successfully");
} catch (error) {
  console.log(`Error updating password: ${error}`, error);
  toast.error(error.response.data.message);
  
}

  }

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const data = {
      name: updatedName,
      phone: updatedPhone,
     
    };
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BaseUrl}/auth/user/editProfile/${userId}`,
        data,
      );
      if (res.status === 200) {
        console.log("Profile updated");
        setshowReloginModel(true);
        setopenEditForm(false);
      }
    } catch (error) {
      console.log(`Update error: ${error.message}`);
    }
  };

  

  useEffect(() => {
    document.body.style.overflow = openEditForm ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [openEditForm]);

  return (
    <div className="relative top-0 p-2 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between">
        <div className="md:hidden">
          <HiOutlineMenu
            className="text-3xl text-gray-600 cursor-pointer"
            onClick={toggleMobileMenu}
          />
        </div>
        <img
          src="/download.png"
          alt="Logo"
          className="object-contain w-32 h-12 rounded-3xl"
        />

        <div className="hidden md:flex items-center gap-10 md:text-md font-semibold text-gray-600 text-center">
          {role === "employer" ? (
            <div
              className="hover:underline cursor-pointer "
              onClick={() => {
                const section = document.getElementById("created-jobs");
                if (section) section.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Create Jobs
            </div>
          ) : (
            <div
              className="hover:underline cursor-pointer"
              onClick={() => {
                const section = document.getElementById("featured-jobs");
                if (section) section.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Jobs
            </div>
          )}

          <div
            onClick={() => setcontactUs(true)}
            className="hover:underline cursor-pointer"
          >
            Contact Us
          </div>
          {role === "employer" ? (
            <Link to="/createdJobsTable">
              <div className="hover:underline cursor-pointer">Created Jobs</div>
            </Link>
          ) : (
            <div
              onClick={() => navigate("/saveJobsPage")}
              className="hover:underline cursor-pointer"
            >
              Saved Job
            </div>
          )}
          {role === "employer" ? (
            <Link to="/applicants">
              <div className="hover:underline cursor-pointer">Applicants</div>
            </Link>
          ) : (
            <Link to="/appliedJobs">
              <div className="hover:underline cursor-pointer">Applied Jobs</div>
            </Link>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-3 border border-gray-300 rounded-lg p-1 bg-white cursor-pointer"
            onClick={toggleMenu}
          >
            <div className="h-9 w-9 text-center bg-black text-[#E0C163] font-semibold text-2xl rounded-full">
              {profileLogo}
            </div>
            <p className="hidden sm:block">Hii {userName} 👋</p>
            <HiOutlineMenu className="text-2xl text-gray-600" />
          </div>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-50 bg-white rounded-lg shadow-md z-50 overflow-hidden">
              <div
                onClick={() => setopenEditForm(true)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
              >
                <p>Edit Profile</p>
                <FaEdit />
              </div>

              <div
                onClick={() => setopenEditPasswordForm(true)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
               >
                <p>Change Password</p>
                <FaLock />
              </div>
              <div
                onClick={HandleLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
              >
                Logout <IoLogOut />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-0 w-full text-lg font-semibold text-gray-700 text-center bg-white shadow-md ">
          {role === "employer" ? (
            <div
              className="cursor-pointer border-b"
              onClick={() => {
                const section = document.getElementById("created-jobs");
                if (section) section.scrollIntoView({ behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
            >
              Create Jobs
            </div>
          ) : (
            <div
              className="cursor-pointer border-b "
              onClick={() => {
                const section = document.getElementById("featured-jobs");
                if (section) section.scrollIntoView({ behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
            >
              Job
            </div>
          )}

          <div
            onClick={() => {
              setcontactUs(true);
              setMobileMenuOpen(false);
            }}
            className="cursor-pointer border-b"
          >
            Contact Us
          </div>
          {role === "employer" ? (
            <Link
              to="/createdJobsTable"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="cursor-pointer border-b">Created Jobs</div>
            </Link>
          ) : (
            <div
              onClick={() => {
                navigate("/saveJobsPage");
                setMobileMenuOpen(false);
              }}
              className="cursor-pointer border-b"
            >
              Saved Job
            </div>
          )}
          {role === "employer" ? (
            <Link to="/applicants" onClick={() => setMobileMenuOpen(false)}>
              <div className="cursor-pointer border-b ">Applicants</div>
            </Link>
          ) : (
            <Link to="/appliedJobs" onClick={() => setMobileMenuOpen(false)}>
              <div className="cursor-pointer border-b">Applied Jobs</div>
            </Link>
          )}
        </div>
      )}

      {openEditPasswordForm && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-black text-[#E0C163] p-4 shadow-lg w-full">
            <button
              onClick={() => setopenEditPasswordForm(false)}
              className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition"
            >
              <MdArrowBack />
            </button>
            <h1 className="text-3xl font-semibold">Change Password</h1>
            <button
              onClick={() => setopenEditPasswordForm(false)}
              className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition"
            >
              <IoCloseOutline />
            </button>
          </div>

          {/* Form Body */}
          <div className="flex justify-center items-center min-h-[80%] p-4 bg-gray-50">
            <form
              onSubmit={handleEditPassword}
              className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg space-y-6"
            >
              <div>
                <label className="block text-gray-700 text-lg font-semibold mb-1">
                  Current Password
                </label>
                <input
                  required
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setcurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E0C163]"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg font-semibold mb-1">
                  New Password
                </label>
                <input
                  required
                  type="password"
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                  placeholder="Set new password"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E0C163]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-[#E0C163] font-semibold py-3 rounded hover:bg-[#E0C163] hover:text-black transition"
              >
                Submit
              </button>
            </form>
          </div>

          <Footer />
        </div>
      )}

      {openEditForm && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-black text-[#E0C163] p-4 shadow-lg w-full">
            <button
              onClick={() => setopenEditForm(false)}
              className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition"
            >
              <MdArrowBack />
            </button>
            <h1 className="text-3xl font-semibold">Edit Profile</h1>
            <button
              onClick={() => setopenEditForm(false)}
              className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition"
            >
              <IoCloseOutline />
            </button>
          </div>

          {/* Form Body */}
          <div className="flex justify-center items-center min-h-[80%] p-4 bg-gray-50">
            <form
              onSubmit={handleEditProfile}
              className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg space-y-6"
            >
              <div>
                <label className="block text-gray-700 text-lg font-semibold mb-1">
                  Name
                </label>
                <input
                  required
                  type="text"
                  value={updatedName}
                  onChange={(e) => setupdatedName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E0C163]"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg font-semibold mb-1">
                  Phone
                </label>
                <input
                  required
                  type="number"
                  value={updatedPhone}
                  onChange={(e) => setupdatedPhone(e.target.value)}
                  placeholder="Enter your Phone Number"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E0C163]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-[#E0C163] font-semibold py-3 rounded hover:bg-[#E0C163] hover:text-black transition"
              >
                Submit
              </button>
            </form>
          </div>

          <Footer />
        </div>
      )}

      {contactUs && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-black text-[#E0C163] p-4 shadow-lg w-full">
            <button
              onClick={() => setcontactUs(false)}
              className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition"
            >
              <MdArrowBack />
            </button>
            <h1 className="text-3xl font-semibold">Contact Us</h1>
            <button
              onClick={() => setcontactUs(false)}
              className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition"
            >
              <IoCloseOutline />
            </button>
          </div>
          {/* Split Section */}
          <div className="flex flex-col md:flex-row h-[calc(100vh-72px)]">
            {/* Left Half - Contact Info */}
            <div className="w-full flex items-center justify-center p-10">
              <div className="text-center space-y-6 text-gray-800">
                <div>
                  <h2 className="text-2xl font-bold text-black mb-2">
                    📧 Email
                  </h2>
                  <p className="text-lg">hirehunt@support.com</p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black mb-2">
                    📞 Phone
                  </h2>
                  <p className="text-lg">+91 98765 43210</p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black mb-2">
                    📍 Location
                  </h2>
                  <p className="text-lg">Dehradun, India</p>
                </div>
              </div>
            </div>
          


         
          </div>
        </div>
      )}

      {showReloginModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 max-w-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              Profile Updated Successfully
            </h2>
            <p className="text-gray-600">Please login again to continue.</p>
            <button
              onClick={() => {
                setshowReloginModel(false);
                navigate("/"); // go to login
              }}
              className="mt-2 bg-black text-[#E0C163] px-4 py-2 rounded hover:bg-[#E0C163] hover:text-black transition"
            >
              Login Again
            </button>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Header;
