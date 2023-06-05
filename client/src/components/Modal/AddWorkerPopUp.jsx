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
      <div className="h-4/5 p-6 px-10 bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl flex justify-between items-center text-gray-600 mb-5">
              <div className="pl-4">Add New Worker</div>
              <div>
                <button
                  className="hover:text-slate-500"
                  onClick={() => setopenAddWorker(false)}
                >
                  <ImCross />
                </button>
              </div>
            </h2>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Worker Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="user_id">User ID</label>
                      <div className="grid grid-cols-2">
                        <input
                          type="text"
                          name="user_id"
                          id="user_id"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={userId}
                          onChange={(e) => setuserId(e.target.value)}
                        />
                        <button
                          className="h-10 bg-blue-500 text-slate-100 w-3/4 mt-1 rounded ml-10 hover:bg-blue-400"
                          onClick={() => {
                            setuserId(Math.floor(Math.random() * 1000000000));
                          }}
                        >
                          Generate Random
                        </button>
                      </div>
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userEmail}
                        onChange={(e) => setuserEmail(e.target.value)}
                        placeholder="email@domain.com"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <select
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setuserCat(e.target.value)}
                        placeholder="email@domain.com"
                      >
                        <option value="worker">Grass Root Worker</option>
                        <option value="case-manager">Case Managment</option>
                      </select>
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="pass">Password</label>
                      <input
                        type="text"
                        name="pass"
                        id="pass"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userPass}
                        onChange={(e) => setuserPass(e.target.value)}
                        placeholder="*********"
                      />
                    </div>
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => addWorkerHandler()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
