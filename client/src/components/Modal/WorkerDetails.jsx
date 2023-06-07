import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import ChildDetails from "./ChildDetails";
import UpdateWorkerPopUp from "./UpdateWorkerPopUp";

export default function WorkerDetails({ workerDetails, setopenworkerDetails }) {
  const [openupdateWorker, setopenupdateWorker] = useState(false);
  const [openchildDetails, setopenchildDetails] = useState(false);

  return (
    <div className="z-50 h-screen w-screen fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-y-hidden">
      <div className="p-16">
        {openupdateWorker ? (
          <UpdateWorkerPopUp
            workerDetails={workerDetails}
            setopenupdateWorker={setopenupdateWorker}
          />
        ) : (
          ""
        )}
        {openchildDetails ? (
          <ChildDetails
            setopenchildDetails={setopenchildDetails}
            childDetails={1}
          />
        ) : (
          ""
        )}
        <div className="p-8 bg-white shadow mt-24 rounded-lg">
          <div className="flex justify-end items-center mb-7">
            <button
              className="hover:text-slate-500"
              onClick={() => setopenworkerDetails(false)}
            >
              <ImCross />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {workerDetails.user_id}
                </p>
                <p className="text-gray-400">User Id</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {workerDetails.zone}
                </p>
                <p className="text-gray-400">Zone</p>
              </div>
              {/* <div>
                <p className="font-bold text-gray-700 text-xl">89</p>
                <p className="text-gray-400">Comments</p>
              </div> */}
            </div>
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
            <div className="space-x-8 flex justify-around mt-32 md:mt-0 md:justify-center">
              <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Message
              </button>
              <button
                className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                onClick={() => setopenupdateWorker(true)}
              >
                Edit Details
              </button>
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {workerDetails.name}
              {/* <span className="font-light text-gray-500">27</span> */}
            </h1>
            <p className="font-light text-gray-600 mt-3 lowercase">
              {workerDetails.email}
            </p>
            <p className="mt-8 text-gray-500">{workerDetails.address}</p>
          </div>
          <div className="mt-12 flex flex-col justify-center">
            <div className="pl-3 text-lg font-bold">Child Allocated</div>
            <ul class="w-full h-48 divide-y divide-gray-200 dark:divide-gray-700 overflow-y-scroll">
              <li class="py-4 sm:py-6">
                <div class="flex items-center space-x-4 capitalize">
                  <div class="flex-shrink-0">
                    {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Neil Sims
                    </p>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                      Bal Asha, New Delhi
                    </p>
                  </div>
                  <div class="inline-flex items-center text-sm text-base font-semibold text-gray-900 dark:text-white">
                    surrendered
                  </div>
                </div>
              </li>
              <li class="py-4 sm:py-6">
                <div class="flex items-center space-x-4 capitalize">
                  <div class="flex-shrink-0">
                    {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Neil Sims
                    </p>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                      Bal Asha, New Delhi
                    </p>
                  </div>
                  <div class="inline-flex items-center text-sm text-base font-semibold text-gray-900 dark:text-white">
                    surrendered
                  </div>
                </div>
              </li>
              <li class="py-4 sm:py-6">
                <div class="flex items-center space-x-4 capitalize">
                  <div class="flex-shrink-0">
                    {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Neil Sims
                    </p>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                      Bal Asha, New Delhi
                    </p>
                  </div>
                  <div class="inline-flex items-center text-sm text-base font-semibold text-gray-900 dark:text-white">
                    surrendered
                  </div>
                </div>
              </li>
              <li class="py-4 sm:py-6">
                <div class="flex items-center space-x-4 capitalize">
                  <div class="flex-shrink-0">
                    {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Neil Sims
                    </p>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                      Bal Asha, New Delhi
                    </p>
                  </div>
                  <div class="inline-flex items-center text-sm text-base font-semibold text-gray-900 dark:text-white">
                    surrendered
                  </div>
                </div>
              </li>
              <li class="py-4 sm:py-6">
                <div class="flex items-center space-x-4 capitalize">
                  <div class="flex-shrink-0">
                    {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Neil Sims
                    </p>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                      Bal Asha, New Delhi
                    </p>
                  </div>
                  <div class="inline-flex items-center text-sm text-base font-semibold text-gray-900 dark:text-white">
                    surrendered
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
