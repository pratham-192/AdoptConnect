import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "../components";
import { AiOutlineCloudDownload, AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopUp from "../components/Modal/PopUp";
import { managerRoute } from "../Contexts/ProtectedRoute";

const ManageData = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [childData, setchildData] = useState();
  const [openPopUp, setopenPopUp] = useState(false);
  const [popUpDetails, setpopUpDetails] = useState({});

  const getUsersDataHandler = async () => {
    await axios
      .get("https://adoptconnect.onrender.com/users/download_csv")
      .then((response) => response.data)
      .then((arrayBuffer) => {
        const blob = new Blob([arrayBuffer], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "user_details.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
        setpopUpDetails({
          heading: "Success",
          message: "User details succesfully downloaded",
          status: true,
        });
        setopenPopUp(true);
      })
      .catch((error) => {
        // console.log(error);
        setpopUpDetails({
          heading: "Failure",
          message: "Error in downloading user details",
          status: false,
        });
        setopenPopUp(true);
      });
  };

  const getChildDataHandler = async () => {
    await axios
      .get("https://adoptconnect.onrender.com/child/download_csv")
      .then((response) => response.data)
      .then((arrayBuffer) => {
        const blob = new Blob([arrayBuffer], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "child_details.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
        setpopUpDetails({
          heading: "Success",
          message: "Child details succesfully downloaded",
          status: true,
        });
        setopenPopUp(true);
      })
      .catch((error) => {
        // console.log(error);
        setpopUpDetails({
          heading: "Failure",
          message: "Error in downloading child details",
          status: false,
        });
        setopenPopUp(true);
      });
  };

  const uploadChildDataHandler = async () => {
    const formData = new FormData();
    formData.append("file", childData);
    console.log(formData);
    const response = await axios.post(
      "https://adoptconnect.onrender.com/child/bulk_upload",
      formData
    );
    console.log(response.data);
    if (response.data.message) {
      setpopUpDetails({
        heading: "Success",
        message: "Child details uploaded succesfully",
        status: true,
      });
      setopenPopUp(true);
    } else {
      setpopUpDetails({
        heading: "Failure",
        message: "Error in uploading child details",
        status: false,
      });
      setopenPopUp(true);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Manage Data" />
      {openPopUp ? (
        <PopUp
          heading={popUpDetails.heading}
          message={popUpDetails.message}
          status={popUpDetails.status}
          setopenPopUp={setopenPopUp}
        />
      ) : (
        ""
      )}
      <div className="border-b-2 pb-5 mb-2">
        <div className="text-lg font-semibold pb-4">Workers</div>
        <div className="inline-flex items-end">
          <button
            className="bg-blue-400 hover:bg-blue-500 flex justify-center items-center w-72 text-white font-bold py-2 px-4 rounded"
            onClick={() => getUsersDataHandler()}
          >
            <span> {t("Download Data")}</span>
            <span className="flex justify-center items-center pl-5">
              <AiOutlineCloudDownload size={23} />
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-semibold pb-4">Children</div>
        <div className="inline-flex items-end">
          <input
            type="file"
            onChange={(e) => setchildData(e.target.files[0])}
          />
          <button
            className="bg-blue-400 hover:bg-blue-500 flex justify-center items-center w-72 text-white font-bold py-2 px-4 rounded ml-10"
            onClick={() => uploadChildDataHandler()}
          >
            <span> {t("Upload Data")}</span>
            <span className="flex justify-center items-center pl-5">
              <AiOutlineCloudUpload size={23} />
            </span>
          </button>
        </div>
        <div className="inline-flex items-end mt-10">
          <button
            className="bg-blue-400 hover:bg-blue-500 flex justify-center items-center w-72 text-white font-bold py-2 px-4 rounded"
            onClick={() => getChildDataHandler()}
          >
            <span> {t("Download Data")}</span>
            <span className="flex justify-center items-center pl-5">
              <AiOutlineCloudDownload size={23} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default managerRoute(ManageData);
