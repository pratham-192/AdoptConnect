import axios from "axios";
import React, { useState } from "react";
import { ImCross } from "react-icons/im";

export default function AddWorkerPopUp({ setopenAddWorker }) {
  const [userId, setuserId] = useState("");
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userCat, setuserCat] = useState("worker");
  const [userPass, setuserPass] = useState("");

  const addWorkerHandler = async () => {
    // console.log(userId);
    // console.log(userName);
    // console.log(userEmail);
    // console.log(userPass);
    // console.log(userCat);
    const response = await axios.post("http://localhost:3000/users/create", {
      user_id: userId,
      name: userName,
      email: userEmail,
      password: userPass,
      category: userCat,
    });
    console.log(response.data);
    setopenAddWorker(false);
  };

  return (
    <div className="z-50 h-screen w-screen fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-y-hidden">
      <div className="bg-white p-10 rounded-xl w-1/3">
        <div className="flex justify-end items-center">
          <button
            className="hover:text-slate-500"
            onClick={() => setopenAddWorker(false)}
          >
            <ImCross />
          </button>
        </div>
        <h1 className="font-semibold text-center text-2xl text-gray-700 mb-3">
          Please fill the details
        </h1>
        <div className="flex flex-col w-full">
          <div className="w-full mt-2">
            <div className="text-md">User Id</div>
            <div className="flex justify-between items-center">
              <div>
                <input
                  type="text"
                  className="border-b border-gray-700 p-1 focus:outline-none font-light bg-transparent mb-5 w-full"
                  value={userId}
                  onChange={(e) => setuserId(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="px-10 py-3 mb-4 bg-pink-500 hover:bg-pink-400 text-slate-100 rounded-xl"
                  onClick={() => setuserId(Math.floor(Math.random() * 1000000))}
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
          <div className="w-full mt-2">
            <div className="text-md">Name</div>
            <input
              type="text"
              className="border-b border-gray-700 p-1 focus:outline-none font-light bg-transparent mb-5 w-full"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
          </div>
          <div className="w-full mt-2">
            <div className="text-md">Email</div>
            <input
              type="text"
              className="border-b border-gray-700 p-1 focus:outline-none font-light bg-transparent mb-5 w-full"
              value={userEmail}
              onChange={(e) => setuserEmail(e.target.value)}
            />
          </div>
          <div className="w-full mt-2">
            <div className="text-md mb-2">Category</div>
            <select
              className="w-full p-3 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
              onChange={(e) => setuserCat(e.target.value)}
            >
              <option value="worker">Grass Root Worker</option>
              <option value="case-worker">Case Managment</option>
            </select>
          </div>
          <div className="w-full mt-2">
            <div className="text-md">Password</div>
            <input
              type="text"
              className="border-b border-gray-700 p-1 focus:outline-none font-light bg-transparent mb-5 w-full"
              value={userPass}
              onChange={(e) => setuserPass(e.target.value)}
            />
          </div>
        </div>
        <div className="text-center w-full">
          <button
            className="px-10 py-3 bg-pink-500 text-slate-100 rounded-xl w-full hover:bg-pink-400"
            onClick={addWorkerHandler}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
