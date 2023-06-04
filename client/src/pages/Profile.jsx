import React, { useState } from "react";
import NavBar from "../components/NavBar";
import ProfileSideBar from "../components/Profile/ProfileSideBar";
import Workers from "../components/Profile/Workers";

export default function Profile() {
  const [currSelected, setcurrSelected] = useState("workers");

  return (
    <div className="h-screen">
      <NavBar />
      <div className="grid grid-cols-6 h-full">
        <div>
          <ProfileSideBar setcurrSelected={setcurrSelected} />
        </div>
        <div className="col-span-5">
          {currSelected == "workers" ? <Workers /> : ""}
        </div>
      </div>
    </div>
  );
}
