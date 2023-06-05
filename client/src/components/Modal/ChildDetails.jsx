import React from "react";
import { ImCross } from "react-icons/im";

export default function childDetails({ childDetails, setopenchildDetails }) {
  console.log(childDetails);
  return (
    <div className="z-50 h-screen w-screen fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-y-hidden">
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24 rounded-lg">
          <div className="flex justify-end items-center">
            <button
              className="hover:text-slate-500"
              onClick={() => setopenchildDetails(false)}
            >
              <ImCross />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {childDetails.child_id}
                </p>
                <p className="text-gray-400">Child ID</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {childDetails.status}
                  undefined
                </p>
                <p className="text-gray-400">Status</p>
              </div>
            </div>
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {childDetails.childClassification}
                </p>
                <p className="text-gray-400">Classification</p>
              </div>
              {/* <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Connect
              </button> */}
              {/* <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Message
              </button> */}
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {childDetails.childName}
              <span className="font-light text-gray-500">
                {childDetails.age}
              </span>
            </h1>
            <p className="font-light text-gray-600 mt-3">
              {childDetails.shelterHome}
            </p>
            <p className="mt-8 text-gray-500">
              {childDetails.district}, {childDetails.state}
            </p>
            <p className="mt-2 text-gray-500">University of Computer Science</p>
          </div>
          <div className="mt-12 flex flex-col">
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              Recommended For Adoption :{" "}
              <span className="text-slate-600 font-light">
                {childDetails.recommendedForAdoption}
              </span>
            </p>
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              Linked with SAA :{" "}
              <span className="text-slate-600 font-light">
                {childDetails.linkedWithSAA}
              </span>
            </p>
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              Case History :
            </p>
            <p className="text-gray-500 lg:px-16">
              <span className="text-slate-600 font-light">
                {childDetails.caseHistory}
              </span>
            </p>
            {/* <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
              Show more
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
