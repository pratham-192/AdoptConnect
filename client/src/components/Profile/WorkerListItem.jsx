import React from "react";

export default function WorkerListItem() {
  return (
    <div className="flex rounded-2xl border-2 mb-8 mx-10">
      <div>
        <img
          src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"
          className="h-32 w-40 rounded-2xl"
        />
      </div>
      <div className="w-full">
        <div className="text-xl grid grid-cols-2 w-full ml-10 p-2">
          <div>ID : 129873</div>
          <div>Active Cases : 8</div>
        </div>
        <div className="text-xl grid grid-cols-2 w-full ml-10 p-2">
          <div>Name : Somesh Singh</div>
          <div>Date of Joining : 08/06/2021</div>
        </div>
      </div>
    </div>
  );
}
