import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoMdPerson, IoIosMail, IoMdUnlock } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
 

  // regex for validation

  const nameRegex = /^[A-Za-z ]+$/;             
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const phoneRegex = /^[0-9]{10}$/;             
  const passwordRegex = /^.{6,}$/;              


  const [RegisterAs, setRegisterAs] = useState("jobseeker");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!nameRegex.test(name)) {
      toast.error("❌ Name should only contain letters and spaces");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("❌ Invalid Email Address");
      return;
    }
    if (!phoneRegex.test(phone)) {
      toast.error("❌ Phone must be 10 digits");
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.error("❌ Password must be at least 6 characters");
      return;
    }

    const data = {
      RegisterAs,
      name,
      email,
      phone,
      password,
    };

    try {
      
      const res = await axios.post(
        `${import.meta.env.VITE_BaseUrl}/auth/sign-up`,
        data,
      );
     

      toast.success("✅ Registration Successful!");


      setname("");
      setemail("");
      setphone("");
      setpassword("");
      console.log(`submitted`, res);

    } catch (error) {
      console.error("Error submitting form:", error.response.data.message);
      toast.error(`${error.response.data.message}`);
    }
    
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-10 bg-gray-300 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center text-center justify-center h-auto w-[90%] md:w-1/2 p-4 bg-white rounded-lg"
      >
        <h1 className="text-4xl font-bold my-10">Create a new account</h1>

        {/* Register As */}
        <label htmlFor="registerAs" className="text-xl">
          Register As
        </label>
        <div className="w-[100%] flex items-center justify-center mb-8  overflow-hidden">
          <select
            id="registerAs"
            name="registerAs"
            onChange={(e) => {
              setRegisterAs(e.target.value);
            }}
            className="w-[90%] bg-gray-300 p-2 text-left appearance-none rounded-tl-lg rounded-bl-lg"
            defaultValue="jobseeker"
          >
            <option className="text-left" value="employer">
              Employer
            </option>
            <option className="text-left" value="jobseeker">
              Job Seeker
            </option>
          </select>
          <div className="h-full w-[10%] text-white bg-black p-2 flex items-center justify-center text-2xl rounded-br-lg rounded-tr-lg">
            <span>
              {" "}
              <IoMdPerson />
            </span>
          </div>
        </div>

        {/* Name */}
        <label htmlFor="name" className="text-xl">
          Name
        </label>
        <div className="w-[100%] flex items-center justify-center mb-8  overflow-hidden">
          <input
            type="text"
            value={name}
            id="name"
            onChange={(e) => setname(e.target.value)}
            className="w-[90%] bg-gray-300 p-2 rounded-bl-lg rounded-tl-lg text-left"
            name="name"
            placeholder="Enter your name"
          />
          <div className="h-full w-[10%] text-white bg-black p-2 flex items-center justify-center text-2xl rounded-br-lg rounded-tr-lg">
            <span>
              <MdDriveFileRenameOutline />
            </span>
          </div>
        </div>

        {/* Email */}
        <label htmlFor="email" className="text-xl">
          Email Address
        </label>
        <div className="w-[100%] flex items-center justify-center mb-8  overflow-hidden">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-[90%] bg-gray-300 p-2 rounded-bl-lg rounded-tl-lg text-left"
            name="email"
            placeholder="Enter your email"
          />
          <div className="h-full w-[10%] text-white bg-black p-2 flex items-center justify-center text-2xl rounded-br-lg rounded-tr-lg">
            <span>
              <IoIosMail />
            </span>
          </div>
        </div>

        {/* Phone */}
        <label htmlFor="phone" className="text-xl">
          Phone Number
        </label>
        <div className="w-[100%] flex items-center justify-center mb-8 overflow-hidden">
          <input
            type="number"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            id="phone"
            className="w-[90%] bg-gray-300 p-2 rounded-bl-lg rounded-tl-lg text-left"
            name="phone"
            placeholder="Enter your phone"
          />
          <div className="h-full w-[10%] text-white bg-black p-2 flex items-center justify-center text-2xl rounded-br-lg rounded-tr-lg">
            <span>
              <FaPhoneAlt />
            </span>
          </div>
        </div>

        {/* Password */}
        <label htmlFor="password" className="text-xl">
          Password
        </label>
        <div className="w-[100%] flex items-center justify-center mb-8 overflow-hidden">
          <input
            className="w-[90%] bg-gray-300 p-2 rounded-bl-lg rounded-tl-lg text-left"
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            id="password"
            name="password"
            placeholder="Enter your password"
          />
          <div className="h-full w-[10%] text-white bg-black p-2 flex items-center justify-center text-2xl rounded-br-lg rounded-tr-lg">
            <span>
              <IoMdUnlock />
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 mb-6 cursor-pointer hover:bg-blue-600 hover:w-full duration-300 font-semibold text-white p-2 w-1/2 rounded-full"
        >
          Register
        </button>
        <Link to="/" className="w-full">
          <button
            type="button"
            className="text-white cursor-pointer font-semibold hover:w-full duration-300 mb-6 bg-black p-2 w-1/2 rounded-full"
          >
            Login
          </button>
        </Link>
      </form>

      {/* ✅ Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Register;
