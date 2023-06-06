import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from ".";
import { FiUser } from "react-icons/fi";
import { BsFillInboxesFill } from "react-icons/bs";
import { useStateContext } from "../Contexts/ContextProvider";
import avatar from "../Data/avatar.jpg";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userDetails"));

  const logoutHandler = async () => {
    // const response = await axios.post("http://localhost:3000/users/sign-out");
    // console.log(response.data);
    localStorage.removeItem("userDetails");
    navigate("/login/admin");
  };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200 capitalize">
            {" "}
            {user.name}{" "}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400 capitalize">
            {" "}
            {user.category}{" "}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            {user.email}{" "}
          </p>
        </div>
      </div>
      <div>
        <div
          className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          onClick={() => navigate("/edit-profile")}
        >
          <button
            type="button"
            className=" text-xl rounded-lg p-3 bg-sky-100 text-sky-500 hover:bg-light-gray"
          >
            <FiUser size={23} />
          </button>
          <div>
            <p className="font-semibold dark:text-gray-200 ">My Profile</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              {" "}
              Account Settings
            </p>
          </div>
        </div>
        <div
          className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          onClick={() => navigate("/progress")}
        >
          <button
            type="button"
            className=" text-xl rounded-lg p-3 bg-yellow-400 text-slate-100 hover:bg-light-gray hover:text-yellow-400"
          >
            <BsFillInboxesFill size={23} />
          </button>
          <div>
            <p className="font-semibold dark:text-gray-200 ">My Tasks</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              {" "}
              To-do and Daily Tasks
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <span onClick={() => logoutHandler()}>
          <Button
            color="white"
            bgColor={currentColor}
            text="Logout"
            borderRadius="10px"
            width="full"
          />
        </span>
      </div>
    </div>
  );
};

export default UserProfile;
