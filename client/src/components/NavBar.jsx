import React from "react";
import bal_Asha_logo from "../assets/bal_Asha_logo.png";
import { BiUser } from "react-icons/bi";

export default function NavBar() {
  return (
    <div className="flex justify-between items-center border shadow-lg">
      <div className="p-3">
        <img src={bal_Asha_logo} className="h-14" />
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="text-xl pr-5">2390 - Somesh</div>
        <div className="flex justify-center items-center mr-10 p-2 rounded-full bg-slate-300">
          <BiUser size={40} />
        </div>
      </div>
    </div>
  );
}
