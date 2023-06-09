import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UpdateWorkerPopUp from "../components/Modal/UpdateWorkerPopUp";
import { useTranslation } from "react-i18next";
import MessagePopUp from "../components/Modal/MessagePopUp";

const WorkerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const workerId = location.search.substring(4);
  const [workerDetails, setworkerDetails] = useState({});
  const [openupdateWorker, setopenupdateWorker] = useState(false);
  const [imageUrl, setimageUrl] = useState("");
  const [openMessagePopUp, setopenMessagePopUp] = useState(false);
  const { t } = useTranslation();

  useEffect(async () => {
    const response = await axios.post("http://localhost:3000/users/getworker", {
      user_id: workerId,
    });
    setworkerDetails(response.data.response);
    const response2 = await axios.post(
      "http://localhost:3000/users/get_image",
      {
        user_id: workerId,
      }
    );
    if (response2.data && response2.data.response) {
      const uint8Array = new Uint8Array(response2.data.response.data);
      const blob = new Blob([uint8Array]);
      setimageUrl(URL.createObjectURL(blob));
    }
  }, [openupdateWorker]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <div className="flex justify-start items-center mb-7">
        <button
          className="hover:text-slate-500"
          onClick={() => navigate("/workers")}
        >
          <FaArrowLeft />
        </button>
      </div>
      {openupdateWorker ? (
        <UpdateWorkerPopUp
          setopenupdateWorker={setopenupdateWorker}
          workerDetails={workerDetails}
        />
      ) : (
        ""
      )}
      {openMessagePopUp ? (
        <MessagePopUp
          setopenMessagePopUp={setopenMessagePopUp}
          to_user_id={workerDetails._id}
          to_user_name={workerDetails.name}
        />
      ) : (
        ""
      )}
      <Header title="Worker Details" />
      <div className="p-8 bg-white mt-16 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">
                {workerDetails && workerDetails.user_id}
              </p>
              <p className="text-gray-400">{t("User Id")}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">
                {workerDetails && workerDetails.zone}
              </p>
              <p className="text-gray-400">{t("Zone")}</p>
            </div>
            {/* <div>
                <p className="font-bold text-gray-700 text-xl">89</p>
                <p className="text-gray-400">{t('Comments')}</p>
              </div> */}
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              {imageUrl ? (
                <img src={imageUrl} className="h-48 w-48 rounded-full" />
              ) : (
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
              )}
            </div>
          </div>
          <div className="space-x-8 flex justify-around mt-32 md:mt-0 md:justify-center">
            <button
              className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={() => setopenMessagePopUp(true)}
            >
              {t("Message")}
            </button>
            <button
              className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={() => setopenupdateWorker(true)}
            >
              {t("Edit Details")}
            </button>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {workerDetails && workerDetails.name}
            {/* <span className="font-light text-gray-500">27</span> */}
          </h1>
          <p className="font-light text-gray-600 mt-3 lowercase">
            {workerDetails && workerDetails.email}
          </p>
          <p className="mt-8 text-gray-500">
            {workerDetails && workerDetails.address}
          </p>
        </div>
        <div className="mt-12 flex flex-col justify-center">
          <div className="pl-3 text-lg font-bold">{t("Child Allocated")}</div>
          <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700 ">
            {workerDetails &&
              workerDetails.alloted_children &&
              workerDetails.alloted_children.map((child) => {
                return (
                  <li
                    className="py-4 sm:py-6 capitalize border-b-2 cursor-pointer"
                    onClick={() =>
                      navigate(`/child-details?id=${child.child_id}`)
                    }
                  >
                    <div className="flex items-center space-x-4 capitalize">
                      <div className="flex-shrink-0">
                        {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {child.childName}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {child.shelterHome}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-sm text-base font-semibold text-gray-900 dark:text-white">
                        {t(`${child.childClassification}`)}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetails;
