import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import YourClient from "../YourClients/YourClient.jsx";
import ShowPlan from "../../camponents/Plan/ShowPlan.jsx";
import { motion } from "framer-motion";
import { baseUrl } from "../../../urls.js";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [selectedClient,setSelectedClient]= useState(null);
  // console.log(clicked);

  const openClientList = () => {
    setClicked(!clicked);
  };

  const userLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("token not found. Plese log in again.");
        return;
      }
      await axios.post(
        `${baseUrl}/user/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/";
      alert("user logged out successfully");
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "Error logging out user"
      );
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("token not found");
          return;
        }
        const response = await axios.get(`${baseUrl}/user/getuser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        setError(
          error.response
            ? error.response.data.message
            : "Error fetching user details"
        );
      }
    };
    fetchUser();
  }, []);

  const handleClientSelect = (client) => {
    setSelectedClient(client);
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  if (!user) return <div className="w-screen h-[90vh] flex justify-center items-center font-Heading-Text font-semibold text-2xl ">Loading...</div>;
  

  return (
    <div className="mt-14 w-full h-auto flex flex-col sm:grid grid-cols-5 gap-4 justify-center items-center py-3 px-5 ">
      <motion.div
      initial={{x:-200,opacity:0}}
      animate={{x:0,opacity:1}}
      transition={{duration:0.7}}
      className=" col-span-3 h-[500px] outline outline-Lic-Blue rounded-lg">
        <div className="w-full border border-b-[#00417c] px-3 py-2">
          <h1 className="text-lg  font-Heading-Text text-blue-800">
            Agent's Profile :-
          </h1>
        </div>
        <div className="grid grid-cols-4 justify-center items-center px-2">
          <div className="col-span-3  ">
            <h1 className="text-blue-800 mt-3 font-SideHeading-Text">
              Username:
              <span className="text-yellow-500 font-all-Text font-semibold ">
                {" "}
                {user.username}
              </span>
            </h1>
            <h1 className="text-blue-800 mt-3 font-SideHeading-Text">
              Full Name:
              <span className="text-yellow-500 font-all-Text font-semibold">
                {" "}
                {user.fullName}
              </span>
            </h1>
            
            <h1 className="text-blue-800 mt-3 ">
              Email:
              <span className="text-yellow-500 font-all-Text font-semibold">
                {" "}
                {user.email}
              </span>
            </h1>
            
          </div>
          <div className="col-span-1 ">
            <img src={logo} className="w-32" alt="" />
          </div>
        </div>
        <div className="flex justify-end mt-56 mr-3 ">
          <button
            onClick={userLogout}
            className=" px-3 py-1.5   Lic-Button"
          >
            Log out
          </button>
        </div>
        {selectedClient && (
          <ShowPlan details={selectedClient}  />
        )}
      </motion.div>

      <motion.div
      initial= {{x:200,opacity:0}}
      animate={{x:0, opacity:1}}
      transition={{duration:0.5}}
      className="px-2 w-full col-span-2 outline outline-[#00417c] rounded-md">
        <div className="w-full  px-3 py-2">
          <h2 className="text-lg  text-blue-800 font-Heading-Text">Services</h2>
        </div>
        <div className="h-[1px] w-full bg-Lic-Blue"></div>
        <div className="w-full text-center items-center justify-center flex flex-col gap-3  py-4 ">
          <Link
            to={"premiumplanner"}
            className=" w-[80%] px-2  Lic-Button"
          >
            Plan a Premium
          </Link>
          <Link
            onClick={openClientList}
            className=" w-[80%] Lic-Button px-2 "
          >
            Your Clients
          </Link>
          <div className="w-[80%]">
          {clicked && <YourClient onSelectClient={handleClientSelect}   />}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
