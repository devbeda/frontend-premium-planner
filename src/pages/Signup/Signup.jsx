import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../../urls.js";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const submit = async (data) => {
    const userInfo = {
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      password: data.password,
      cPassword: data.cPassword,
    };
    try {
      const response = await axios.post(
        `${baseUrl}/user/signup`,
        userInfo
      );

      if (response.data) {
        alert("Registration successful!");
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while registering the user");
      }
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(submit)}>
        <motion.div
        initial={{scale:0, opacity:0}}
        animate={{scale:1, opacity:1}}
        transition={{duration:1}}
        className=" md:w-[400px] h-auto  rounded-xl outline outline-blue-800 pb-4">
          <div className="flex justify-center items-center h-[10%] border border-b-blue-800">
            <h2 className=" text-xl  text-black py-1 font-Heading-Text ">Sign up</h2>
          </div>
          <div className="w-full flex flex-col gap-1 h-2/6 px-5 py-5 ">
            <div className="">
              <h2 className="text-black mb-1 font-SideHeading-Text">Agent's Full Name:-</h2>
              <input
                type="text"
                className="outline-none rounded-2xl py-0.5 px-2 text-md font-all-Text outline-Lic-Blue"
                {...register("fullName", { required: true })}
              />
              <div>
              {errors.fullName && (
                    <span className="text-[12px] font-button-Text text-red-500 sm:text-sm">
                      Enter your Fullname
                    </span>
                  )}
              </div>
            </div>
            <div className="">
              <h2 className="text-black mb-1 font-SideHeading-Text">Agent's Username:-</h2>
              <input
                type="text"
                className="outline-none rounded-2xl font-all-Text py-0.5 px-2 text-md  outline-Lic-Blue"
                {...register("username", { required: true })}
              />

              <div>
              {errors.username && (
                    <span className="text-[12px] font-button-Text text-red-500 sm:text-sm">
                      Enter your username
                    </span>
                  )}
              </div>
            </div>
            <div className="">
              <h2 className="text-black mb-1 font-SideHeading-Text">Email:-</h2>
              <input
                type="email"
                className="outline-none rounded-2xl py-0.5 px-2 text-md font-all-Text outline-Lic-Blue"
                {...register("email", { required: true })}
              />
              <div>
              {errors.email && (
                    <span className="text-[12px] font-button-Text  text-red-500 sm:text-sm">
                      Enter your Email
                    </span>
                  )}
              </div>
            </div>
            <div className="">
              <h2 className="text-black mb-1 font-SideHeading-Text">Password:-</h2>
              <input
                type="password"
                className="outline-none rounded-2xl font-all-Text py-0.5 px-2 text-md  outline-Lic-Blue"
                {...register("password", { required: true })}
              />
              <div>
              {errors.password && (
                    <span className="text-[12px] font-button-Text text-red-500 sm:text-sm">
                      Enter your Password
                    </span>
                  )}
              </div>
            </div>
            <div className="">
              <h2 className="text-black mb-1 font-SideHeading-Text">Confirm Password:-</h2>
              <input
                type="password"
                className="outline-none rounded-2xl py-0.5 px-2 text-md font-all-Text outline-Lic-Blue"
                {...register("cPassword", { required: true })}
              />
            </div>
          </div>
          <div className="flex justify-center items-center font-button-Text mb-1">
            {error && <p className="text-red-500 font-all-Text">{error}</p>}
            
          </div>
          <div className="h-1/6 flex flex-col justify-center items-center">
            <button className="Lic-Button px-2 py-1">
              Sign up
            </button>
            <p className="text-black mb-1 font-all-Text px-2">
              Already have an account? <NavLink to="/" className="hover:font-semibold   text-blue-600">Login</NavLink>
            </p>
          </div>
        </motion.div>
      </form>
    </div>
  );
}


export default Signup;
