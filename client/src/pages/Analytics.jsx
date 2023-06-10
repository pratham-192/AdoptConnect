import React, { useState, useEffect } from "react";
import { FaChild } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import { adminRoute } from "../Contexts/ProtectedRoute";
import axios from "axios";

const Analytics = () => {
  const [analyticsData, setanalyticsData] = useState();
  const [caseStatusCount, setcaseStatusCount] = useState([]);

  useEffect(async () => {
    const response = await axios.get(
      "https://adoptconnect.onrender.com/admin/get_analytics"
    );
    console.log(response.data.response);
    if (response.data) {
      setanalyticsData(response.data.response);
      const arr = response.data.response.ratioCaseStatus;
      const newArr = [];
      var inactive = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].caseStatus === "inactive") {
          inactive = arr[i].count;
          break;
        }
      }
      newArr.push(inactive);

      var completed = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].caseStatus === "completed") {
          completed = arr[i].count;
          break;
        }
      }
      newArr.push(completed);

      var inprogress = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].caseStatus === "inprogress") {
          inprogress = arr[i].count;
          break;
        }
      }
      newArr.push(inprogress);
      setcaseStatusCount([...caseStatusCount, ...newArr]);
    }
  }, []);

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                className="text-2xl text-green-500 bg-green-100 opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <HiUserGroup size={30} />
              </button>
              <p className="mt-3">
                <span className="text-xl font-semibold">
                  {analyticsData &&
                    analyticsData.AdoptionSuccess &&
                    analyticsData.AdoptionSuccess[0] &&
                    analyticsData.AdoptionSuccess[0].totalCount}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">Total Cases</p>
            </div>
          </div>
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              className="text-2xl opacity-0.9 rounded-full bg-sky-100 text-sky-400 p-4 hover:drop-shadow-xl"
            >
              <FaChild size={30} />
            </button>
            <p className="mt-3">
              <span className="text-xl font-semibold">
                {caseStatusCount[1]}
              </span>
            </p>
            <p className="text-sm text-gray-400  mt-1">Adopted</p>
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              className="text-2xl opacity-0.9 text-slate-100 bg-yellow-400 rounded-full  p-4 hover:drop-shadow-xl"
            >
              <AiOutlineFieldTime size={30} />
            </button>
            <p className="mt-3">
              <span className="text-xl font-semibold">
                {caseStatusCount[2]}
              </span>
            </p>
            <p className="text-sm text-gray-400  mt-1">In Progress</p>
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              className="text-2xl text-red-400 bg-slate-100 opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
            >
              <BiError size={30} />
            </button>
            <p className="mt-3">
              <span className="text-xl font-semibold">
                {caseStatusCount[0]}
              </span>
            </p>
            <p className="text-sm text-gray-400  mt-1">Inactive</p>
          </div>
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue Updates</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default adminRoute(Analytics);
