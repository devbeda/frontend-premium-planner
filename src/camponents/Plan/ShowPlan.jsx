import React from "react";
import { motion } from "framer-motion";


function ShowPlan({ details }) {
  let currentAge = details.age + details.payingYearByClient;
  const totalAge =
    details.age + details.payingYearByClient + details.payingYearByCompany - 1;
  const clientRows = Array.from(
    { length: details.payingYearByClient },
    (_, index) => {
      return (
        <tr key={index}>
          <td className="border-black border-2 px-2">{index + 1}</td>
          <td className="border-black border-2 px-2">{details.age + index}</td>
          <td className="border-black border-2 px-2">
            {details.clientPayPerYear}
          </td>
          <td className="border-black border-2 px-2">0</td>
          <td className="border-black border-2 px-2">0</td>
        </tr>
      );
    }
  );
  const companyRows = Array.from(
    { length: details.payingYearByCompany },
    (_, index) => {
      return (
        <tr key={index + details.payingYearByClient}>
          <td className="border-black border-2 px-2">
            {index + 1 + details.payingYearByClient}
          </td>
          <td className="border-black border-2 px-2">{currentAge + index}</td>
          <td className="border-black border-2 px-2">0</td>
          <td className="border-black border-2 px-2">
            {details.companyPayPerYear}
          </td>
          <td className="border-black border-2 px-2">0</td>
        </tr>
      );
    }
  );

  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className=" w-full flex justify-center items-center  pb-5 font-semibold ">
        <table className="w-[70%] px-3 py-2 text-sm sm:text-base border-black border-2 text-center">
          <tr>
            <th className="bg-Lic-Blue text-white border-black border-2">
              Fullname
            </th>
            <td className="bg-Lic-Yellow  border-black border-2">
              {details.fullName}
            </td>
          </tr>
          <tr>
            <th className="bg-Lic-Blue text-white border-black border-2">
              Age
            </th>
            <td className="bg-Lic-Yellow  border-black border-2">
              {details.age}
            </td>
          </tr>
          <tr>
            <th className="bg-Lic-Blue text-white border-black border-2">
              Targeting Price
            </th>
            <td className="bg-Lic-Yellow  border-black border-2">
              {details.targetingPrice}
            </td>
          </tr>
        </table>
      </div>
      <div className="flex justify-center items-center mb-4">
        <table className="w-[70%] text-sm sm:text-base text-center border-black border-2">
          <tr className="border-black border-2 bg-Lic-Blue text-white">
            <th className="border-black border-2">Quatarly</th>
            <th className="border-black border-2">Half Yearly</th>
            <th className="border-black border-2">Yearly</th>
          </tr>
          <tr className="border-black border-2  bg-Lic-Yellow ">
            <td className="border-black border-2">
              {details.clientPayPerYear / 4}
            </td>
            <td className="border-black border-2">
              {details.clientPayPerYear / 2}
            </td>
            <td className="border-black border-2">
              {details.clientPayPerYear}
            </td>
          </tr>
        </table>
      </div>
      <div className="w-full h-auto flex justify-center items-center ">
        <table className="text-sm sm:text-base w-[90%] md:w-[60%] border-black border-2 text-center">
          <thead className="border-black border-2 bg-Lic-Blue text-white">
            <tr>
              <th className="border-black border-2 px-2">Year</th>
              <th className="border-black border-2 px-2">Age</th>
              <th className="border-black border-2 px-2">
                Premium Pay By Client
              </th>
              <th className="border-black border-2 px-2">
                Premium Pay By Company
              </th>
              <th className="border-black border-2 px-2">Return</th>
            </tr>
          </thead>
          <tbody className="bg-Lic-Yellow">
            {clientRows}
            {companyRows}
            <tr className="text-white bg-Lic-Blue">
              <td className="border-black border-2 px-2">{""}</td>
              <td className="border-black border-2 px-2">{""}</td>
              <td className="border-black border-2 px-2">
                {details.totalPayByClient}
              </td>
              <td className="border-black border-2 px-2">
                {details.totalPayByCompany}
              </td>
              <td className="border-black border-2 px-2">
                {details.targetingPrice}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center sm:text-2xl px-4 my-4 ">
        <p>
          Save Rs.{" "}
          <span className="text-green-500 font-semibold">
            {(details.clientPayPerYear / 12).toFixed(2)}
          </span>{" "}
          per month for{" "}
          <span className="font-semibold text-blue-700">
            {details.payingYearByClient}
          </span>{" "}
          yrs, and get a bulk amount of Rs.{" "}
          <span className="text-green-600 font-bold">
            {details.targetingPrice}{" "}
          </span>
          at age <span className="text-blue-700 font-semibold">{totalAge}</span>
        </p>
      </div>
    </motion.div>
  );
}

export default ShowPlan;
