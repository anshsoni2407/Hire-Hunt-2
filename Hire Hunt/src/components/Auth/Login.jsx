import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdPerson, IoIosMail, IoMdUnlock } from "react-icons/io";
import { useState } from "react";
import FancyLoader from '../Reusable.jsx/Loader.jsx'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const [RegisterAs, setregisterAs] = useState("jobseeker");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email.trim().toLowerCase(),
      password: password
    };

    try { 
  
      const res = await axios.post(
        `${import.meta.env.VITE_BaseUrl}/auth/login`,
        data,
        {
          withCredentials: true,
        },
      );
      setisLoading(true);
      console.log("data sent to backend");
      toast.success("Login successful!");

      const userRole = res.data.userdetail.RegisterAs;
      const userDetails = res.data.userdetail;

      localStorage.setItem("role", userRole);
      localStorage.setItem("loggedInEmp", JSON.stringify(userDetails)); // storing full object

      if (userRole === "jobseeker") {
        Navigate("/jobseekerDash");
      } else if (userRole === "employer") {
        Navigate("/employerDash");
      }
      else if (userRole === "admin") {
        Navigate("/adminDash")
      }
    } catch (error) {
      console.log("Login error:", error.response.data.message);
      toast.error(error.response.data.message);
    }
    finally {
      setisLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-10 bg-gray-300 ">
      <ToastContainer position="top-right" autoClose={3000} />
      {isLoading && <FancyLoader />}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center text-center justify-center h-auto w-[90%] md:w-1/2 p-4 bg-white rounded-lg min-w-[280px] min-h-"
      >
        <h1 className="text-4xl font-bold my-10">Login</h1>

    

        <label htmlFor="email" className="text-xl">
          Email Address
        </label>
        <div className="w-full flex items-center justify-center mb-8 overflow-hidden">
          <input
            type="email"
            required
            onChange={(e) => setemail(e.target.value)}
            className="w-[90%] bg-gray-300 p-2 rounded-bl-lg rounded-tl-lg text-left"
            placeholder="Enter your Email"
          />
          <div className="w-[10%] bg-black p-2 text-white flex justify-center items-center text-2xl rounded-tr-lg rounded-br-lg">
            <span>
              {" "}
              <IoIosMail />
            </span>
          </div>
        </div>

        <label htmlFor="password" className="text-xl">
          Password
        </label>
        <div className="w-full flex items-center justify-center mb-8 overflow-hidden">
          <input
            type="password"
            required
            onChange={(e) => setpassword(e.target.value)}
            className="w-[90%] bg-gray-300 p-2 rounded-bl-lg rounded-tl-lg text-left"
            placeholder="Enter your Password"
          />
          <div className="w-[10%] bg-black p-2 text-white flex justify-center items-center text-2xl rounded-tr-lg rounded-br-lg">
            <span>
              <IoMdUnlock />
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 mb-6 hover:bg-blue-600 hover:w-full duration-300 font-semibold text-white p-2 w-2/3 rounded-full"
        >
          Login
        </button>

        <Link to="sign-up" className="w-full">
          <button
            type="button"
            className="text-white bg-black font-semibold p-2 w-1/2 rounded-full hover:w-full duration-300"
          >
            Register
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
