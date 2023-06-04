import React from "react";

export default function ProfileSideBar({ setcurrSelected }) {
  return (
    <div className="border-r-2 h-full">
      <div className="flex justify-center items-center py-4 border-b-2 text-lg hover:bg-slate-100 cursor-pointer" onClick={()=>setcurrSelected("analytics")}>
        Analytics
      </div>
      <div className="flex justify-center items-center py-4 border-b-2 text-lg hover:bg-slate-100 cursor-pointer" onClick={()=>setcurrSelected("workers")}>
        Workers
      </div>
      <div className="flex justify-center items-center py-4 border-b-2 text-lg hover:bg-slate-100 cursor-pointer" onClick={()=>setcurrSelected("signout")}>
        Signout
      </div>
    </div>
  );
}
