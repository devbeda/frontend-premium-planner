import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { baseUrl } from "../../../urls";


function ClientCards({ client, onDelete }) {
  const formattedDate = new Date(client.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
  const [click, setClick] = useState(false);
  const [deleteClient, setDeleteClient] = useState(false);

  
  
  const handleDelete = async() => {
    try {
      setDeleteClient(true);
      await axios.delete(
        `${baseUrl}/client/deleteclient/${client._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );
      
      onDelete(client._id);
    } catch (error) {
      console.error(
        "failed to delete client:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setDeleteClient(false);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className=" px-4 mt-3 flex flex-col items-center justify-center w-full"
      >
        <div
          onClick={()=>setClick(!click)}
          className=" w-full rounded-lg  outline-none outline-Lic-Blue   group  hover:bg-Lic-Yellow hover:scale-105 transition-all duration-300 hover:text-black"
        >
          <div className="flex justify-between items-center px-2 py-1">
            <p className="text-gray-400 group-hover:text-black text-[10px] sm:text-[10px] md:[14px]">
              Created: {formattedDate}
            </p>
            <div>
              {client.isActive ? (
                <div className="flex justify-end items-center gap-1 text-gray-400 text-sm ">
                  <div className="bg-green-400 h-2 w-2 rounded-full"></div>
                  <div className=" text-[13px] md:text-base group-hover:text-black md:text-[14px] ">
                    Actived
                  </div>
                </div>
              ) : (
                <div className="flex justify-end items-center gap-1 text-gray-400 text-sm ">
                  <div className="bg-gray-400 h-2 w-2 rounded-full"></div>
                  <div className="text-[13px] group-hover:text-black md:text-[14px] ">
                    Drafted
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="px-2 pb-2">
            <h1 className="text-left text-sm font-semibold tracking-wide">
              {client.fullName}
            </h1>
            <h2 className="text-left text-[13px] font-light tracking-wide">
              Targeting Price: {client.targetingPrice}
            </h2>
            <h2 className="text-left text-[13px] font-light tracking-wide">
              Premium per Year: {client.clientPayPerYear}Rs
            </h2>
            <h2 className="text-left text-[13px] font-light">
              Premium Period : {client.payingYearByClient}yr
            </h2>
            <h2 className="text-left text-[13px] font-light">
              maturity :{" "}
              {client.payingYearByClient + client.payingYearByCompany}
              yr
            </h2>
          </div>
          {click && (
            <div
              onClick={handleDelete}
              className="w-full py-1 text-white bg-red-500 rounded-b-lg flex justify-center items-center"
            >
              {deleteClient ? "Deleting.." : <MdDelete />}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ClientCards;
