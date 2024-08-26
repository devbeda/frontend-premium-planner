import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {motion} from "framer-motion"
import { baseUrl } from "../../../urls.js";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const submit = async (data) => {
    const userInfo = {
      username: data.username,

      password: data.password,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/user/login`,
        userInfo
      );

      if (response.data) {
        localStorage.setItem("accessToken", response.data.accessToken);

        localStorage.setItem("refreshToken", response.data.refreshToken);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      if (
        
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Error logging in user");
      }
    }
    console.log(error);
    
  };

  return (
    <div className="w-full h-[90vh]  flex items-center justify-center">
      <motion.div
        initial={{scale:0, opacity:0}}
        animate={{scale:1, opacity:1}}
        transition={{duration:1}}
        className="w-auto sm:w-[400px] h-auto  rounded-xl outline outline-blue-800">
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex justify-center items-center h-[10%] border border-b-blue-800">
            <h1 className=" text-xl font-semibold text-black py-1 ">Log in</h1>
          </div>
          <div className="flex justify-center items-center">
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="w-full h-2/6 px-5 py-3 ">
            <div className="">
              <h2 className="text-black font-semibold ">Username:-</h2>
              <input
                type="text"
                className="outline-none rounded-2xl py-0.5 px-2 text-md  outline-Lic-Blue"
                {...register("username", { required: true })}
              />
            </div>
            <div className="">
              <h2 className="text-black font-semibold">Password:-</h2>
              <input
                type="password"
                className="outline-none rounded-2xl py-0.5 px-2 text-md  outline-Lic-Blue"
                {...register("password", { required: true })}
              />
            </div>
          </div>
          <div className="h-1/6 flex justify-center items-center">
            <button className="Lic-Button px-2.5">Log in</button>
          </div>
          <div className="h-1/6 py-2 px-2">
            <p>
              If you don't have any account,
              <Link
                to={"signup"}
                className="text-blue-800 hover:cursor-pointer hover:font-semibold"
              >
                {" "}
                Sign up
              </Link>{" "}
              Here
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
