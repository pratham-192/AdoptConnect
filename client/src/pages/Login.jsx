import React, { useEffect, useState } from "react";
import bal_Asha_Team from "../assets/bal_Asha_Team.png";
import bal_Asha_logo from "../assets/bal_Asha_logo.png";
import { FaUserCircle, FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setusername] = useState("");
  const [userpassword, setuserpassword] = useState("");
  const [err, seterr] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const loginHandler = async () => {
    if (!username || !userpassword) {
      seterr("Please enter username and password");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/users/createSession",
        {
          user_id: username,
          password: userpassword,
        }
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
    seterr("");
  };

  useEffect(() => {
    const path = location.pathname.split("/");
    console.log(path);
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center sm:grid sm:grid-cols-3">
      <div className="h-0 sm:h-screen">
        <img src={bal_Asha_Team} className="h-full sm:block hidden" />
      </div>
      <div className="sm:col-span-2 w-full">
        <div className="flex justify-end m-5">
          <img src={bal_Asha_logo} className="h-24" />
        </div>
        <div className="sm:mx-auto mx-10 h-3/5 sm:w-1/2 bg-pink-900 py-20 rounded-xl">
          <div className="flex justify-center text-white">
            <FaUserCircle size={100} />
          </div>
          <div className="pt-4 flex flex-col justify-center items-center">
            <div className="border-b-2 w-10/12 mt-3 flex items-center text-slate-800 bg-slate-100 rounded-xl p-3 text-2xl">
              <FaUser />
              <input
                type="text"
                className="text-sm focus:outline-none pl-2 font-light bg-transparent text-slate-800 w-full"
                placeholder="Your username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div className="border-b-2 w-10/12 mt-9 flex items-center text-slate-800 bg-slate-100 rounded-xl p-3 text-2xl">
              <RiLockPasswordLine />
              <input
                type="password"
                className="text-sm focus:outline-none pl-2 font-light bg-transparent text-slate-800 w-full"
                placeholder="Your password"
                value={userpassword}
                onChange={(e) => setuserpassword(e.target.value)}
              />
            </div>
          </div>
          {err ? (
            <div className="text-red-500 text-sm pt-2 pl-10 flex items-center">
              {err}
            </div>
          ) : (
            ""
          )}
          <div className="mt-8 flex justify-center items-center">
            <button
              className="h-12 w-10/12 bg-green-500 rounded-lg text-slate-100 hover:bg-green-200 hover:text-white"
              onClick={loginHandler}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
