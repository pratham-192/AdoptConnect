import React, { useState } from "react";
import { IoIosPersonAdd } from "react-icons/io";
import { MdFilterAlt } from "react-icons/md";
import AddWorkerPopUp from "../Modal/AddWorkerPopUp";
import WorkerListItem from "./WorkerListItem";

export default function Workers() {
  const [openAddWorker, setopenAddWorker] = useState(true);

  return (
    <div className="">
      {openAddWorker ? (
        <AddWorkerPopUp setopenAddWorker={setopenAddWorker} />
      ) : (
        ""
      )}
      <div className="flex justify-between items-center m-10">
        <div>
          <button className="py-3 flex justify-center items-center w-56 bg-green-400 rounded-xl text-slate-100 hover:bg-green-300 cursor-pointer">
            Filter
            <span className="pl-3">
              <MdFilterAlt size={25} />
            </span>
          </button>
        </div>
        <div>
          <button
            className="py-3 flex justify-center items-center w-56 bg-green-400 rounded-xl text-slate-100 hover:bg-green-300 cursor-pointer"
            onClick={() => setopenAddWorker(true)}
          >
            Add new worker
            <span className="pl-3">
              <IoIosPersonAdd size={25} />
            </span>
          </button>
        </div>
      </div>
      <div>
        <WorkerListItem />
        <WorkerListItem />
        <WorkerListItem />
        <WorkerListItem />
        <WorkerListItem />
      </div>
    </div>
  );
}
