import React from "react";
import { ImCross } from "react-icons/im";

export default function childDetails({ childDetails, setopenchildDetails }) {
  console.log(childDetails);
  return (
    <div className="z-50 h-screen w-screen fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-y-hidden">
      <div className="h-full w-full flex justify-center items-center">
        <div className="h-5/6 w-5/6 p-8 bg-white shadow rounded-lg overflow-y-scroll">
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
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {childDetails.child_id}
                </p>
                <p className="text-gray-400">Child ID</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {childDetails.caseStatus}
                </p>
                <p className="text-gray-400">Status</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {childDetails.gender}
                </p>
                <p className="text-gray-400">Gender</p>
              </div>
            </div>
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {childDetails.childClassification}
                </p>
                <p className="text-gray-400">Classification</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {childDetails.age}
                </p>
                <p className="text-gray-400">Age</p>
              </div>
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
          </div>
          <div className="mt-12 flex flex-col">
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              Date of Birth :{" "}
              <span className="text-slate-600 font-light">
                {childDetails.dateOfBirth}
              </span>
            </p>
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
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              Inquiry Date Of Admission :{" "}
              <span className="text-slate-600 font-light">
                {childDetails.inquiryDateOfAdmission}
              </span>
            </p>
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              Reason for Admission :{" "}
              <span className="text-slate-600 font-light">
                {childDetails.reasonForAdmission}
              </span>
            </p>
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              Last Visit :{" "}
              <span className="text-slate-600 font-light">
                {childDetails.lastVisit}
              </span>
            </p>
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              Last Call :{" "}
              <span className="text-slate-600 font-light">
                {childDetails.lastCall}
              </span>
            </p>
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              Guardian :{" "}
              <span className="text-slate-600 font-light">
                {childDetails.guardianListed}
              </span>
            </p>
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              Last Family Visit Phone Call :{" "}
              <span className="text-slate-600 font-light">
                {childDetails.familyVisitPhoneCall}
              </span>
            </p>
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              Number of siblings :{" "}
              <span className="text-slate-600 font-light">
                {childDetails.siblings}
              </span>
            </p>
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              Last Date Of CWC order :{" "}
              <span className="text-slate-600 font-light">
                {childDetails.lastDateOfCWCOrder}
              </span>
            </p>
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              Last CWC order :{" "}
              <span className="text-slate-600 font-light">
                {childDetails.Lastcwcorder}
              </span>
            </p>
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              Time of stay in shelter :{" "}
              <span className="text-slate-600 font-light">
                {childDetails.lengthOfStayInShelter}
              </span>
            </p>
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              CARINGS Registration Number :{" "}
              <span className="text-slate-600 font-light">
                {childDetails.caringsRegistrationNumber}
              </span>
            </p>
            <p className="text-gray-800 font-bold p-1 lg:px-16">
              Date LFA, CSR, MERU uploaded in CARINGS :{" "}
              <span className="text-slate-600 font-light">
                {childDetails.dateLFA_CSR_MERUUploadedINCARINGS}
              </span>
            </p>
            {/* <button className="text-indigo-500 py-2 px-4  font-medium mt-4">
              Show
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
