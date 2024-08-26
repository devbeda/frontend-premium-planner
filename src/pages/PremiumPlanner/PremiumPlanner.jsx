import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import ShowPlan from "../../camponents/Plan/ShowPlan";
import { motion } from "framer-motion";
import { baseUrl } from "../../../urls.js";

function PremiumPlanner() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [clientDetails, setClientDetails] = useState("");
  const [error, setError] = useState("");
  const saveClient = async (data) => {
    try {
      const clientInfo = {
        fullName: data.fullName,
        age: data.age,
        targetingPrice: data.targetingPrice,
        isActive: data.isActive || false,
      };

      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("You are not logged in. Please login first");
        return;
      }

      const response = await axios.post(
        `${baseUrl}/client/saveclient`,
        clientInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setClientDetails(response.data.savedClient);

      // submit data to the server
    } catch (error) {
      console.error(error);
      setError(
        error.response
          ? error.response.data.message
          : "Failed to create client. Please try again"
      );
    }
  };
  console.log(clientDetails);

  return (
    <div>
      {!clientDetails ? (
        <motion.div
          initial={{ y: -300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full md:h-[90vh] h-[95vh]  flex justify-center items-center"
        >
          <div className=" w-[70vw] h-auto md:w-1/2 md:h-3/4 outline-none outline-Lic-Blue rounded-lg px-7 py-3">
            <div>
              <h1 className="text-2xl md:text-6xl text-center text-yellow-400 font-bold">
                Premium Planner
              </h1>
              <p className="text-sm mb-2 md:text-xl text-center text-yellow-300">
                create a premium for your premium client
              </p>
            </div>
            <div className="w-full h-[0.5px] sm:h-[1px] bg-Lic-Blue"></div>
            <div className="mt-5">
              {error && <p className="text-red-500">{error}</p>}

              <form
                onSubmit={handleSubmit(saveClient)}
                className="flex flex-col"
              >
                <div className="mb-4">
                  <div className=" flex gap-3 items-center  ">
                    <label className="text-[12px]  sm:text-base  font-medium text-gray-700">
                      Full Name:
                    </label>
                    <input
                      type="text"
                      className="w-40 sm:w-60 h-6 sm:h-9 px-2 py-1 text-sm font-semibold  mt-1 outline-none outline-Lic-Blue  sm:text-sm  rounded-3xl"
                      {...register("fullName", { required: true })}
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-[12px] text-red-500 sm:text-base">
                      Enter your Full Name
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <div className="  flex gap-3 items-center ">
                    <label className=" text-[12px]   sm:text-base font-medium text-gray-700">
                      Age:
                    </label>
                    <input
                      type="number"
                      className="text-sm w-16 sm:w-16 h-6 sm:h-9 px-2  font-semibold mt-1 outline-none outline-Lic-Blue   sm:text-sm  rounded-3xl"
                      {...register("age", { required: true })}
                    />
                  </div>
                  {errors.age && (
                    <span className="text-[12px] text-red-500 sm:text-base">
                      Enter your age
                    </span>
                  )}
                </div>
                <div className="mb-4 ">
                  <div className="  flex gap-3 items-center ">
                    <label className="block text-[12px]  sm:text-base font-medium text-gray-700">
                      Targeting Price:
                    </label>
                    <input
                      type="number"
                      className="w-32 sm:w-60 h-6 text-sm  sm:h-9 px-2 py-1 font-semibold mt-1 outline-none outline-Lic-Blue  sm:text-sm  rounded-3xl"
                      {...register("targetingPrice", { required: true })}
                    />
                  </div>
                  {errors.targetingPrice && (
                    <span className="text-[12px]  text-red-500 sm:text-base">
                      Set your Targeting Price
                    </span>
                  )}
                </div>
                <div className="mb-4 flex gap-3 items-center ">
                  <label className=" text-[12px]  sm:text-base font-medium text-gray-700">
                    Premium Active:
                  </label>
                  <div className=" px-2 py-1 font-semibold flex items-center gap-1">
                    <input
                      type="checkbox"
                      value={true}
                      className="mt-1 accent-blue-500 scale-100 sm:scale-110 cursor-pointer "
                      {...register("isActive")}
                    />
                    <p className="text-[12px]  sm:text-base">Yes</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    to={"/dashboard"}
                    className="w-full text-center px-6 py-3 text-sm font-medium hover:text-white bg-gray-300 rounded-3xl focus:outline-none text-[#00417c] active:bg-Lic-Blue hover:bg-yellow-500"
                  >
                    Back
                  </Link>
                  <button className="w-full px-6 py-3 text-sm font-medium Lic-Button">
                    Create a Plan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      ) : (
        <div
          
          className="w-full h-auto flex justify-center items-center my-5"
        >
          <div className="w-[90vw] h-auto  md:w-1/2 md:h-3/4 outline-none outline-Lic-Blue rounded-lg px-7 py-3 ">
            <ShowPlan details={clientDetails}></ShowPlan>
            <div className="flex flex-col gap-2">
              <Link
                to={"/premiumplanner"}
                onClick={() => setClientDetails(null)}
                className="w-full text-center px-6 py-3 text-sm font-medium hover:text-white bg-gray-300 rounded-3xl focus:outline-none text-[#00417c] active:bg-Lic-Blue hover:bg-yellow-500"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PremiumPlanner;
