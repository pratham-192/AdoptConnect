import React, { useState, useEffect } from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import { kanbanData, kanbanGrid } from "../Data/dummy";
import { Header } from "../components";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { BsClockHistory } from "react-icons/bs";

const Kanban = () => {
  const [childData, setchildData] = useState({});
  const [selectedChild, setselectedChild] = useState();
  const { t } = useTranslation();
  let grid;
  const getData = () => {
    if (grid) {
      // console.log(grid.kanbanData);
      // const selectedrowindex = grid.getSelectedRowIndexes();
      // const selectedrecords = grid.getSelectedRecords();
      // console.log(selectedrecords);
      // setworkerDetails(selectedrecords[0]);
      // setopenworkerDetails(true);
    }
  };
  useEffect(async () => {
    const response = await axios.get("http://localhost:3000/admin/all_child");
    setchildData(response.data.response);
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <Header category="App" title="Progress" />
      <div className="mb-4 ml-3">
        <span className="font-semibold pr-5">{t("Select Child")} : </span>
        <select
          className="h-10 border mt-1 rounded px-4 w-3/4 bg-gray-50 ml-5"
          onChange={(e) => console.log(childData[e.target.value])}
        >
          <option value="">Please Select</option>
          {childData &&
            childData.length &&
            childData.map((child, index) => {
              return (
                <option key={index} value={index}>
                  {child.childName}
                </option>
              );
            })}
        </select>
      </div>
      <div className="text-lg font-bold my-7">Current Tasks</div>
      <div className="mb-5 ml-5">
        <div className="text-md font-semibold mb-5">Major task 1</div>
        <ol className="pl-7">
          <li class="flex items-center space-x-3 py-2 hover:bg-slate-100 px-2 rounded">
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="text-slate-400">Minor task 1</span>
          </li>
          <li className="flex justify-between items-center py-2 hover:bg-slate-100 px-2 rounded">
            <span className="flex items-center space-x-4">
              <span className="text-yellow-500">
                <BsClockHistory />
              </span>
              <span className="">Minor task 2</span>
            </span>
            <span>
              <button className="py-1 text-sm px-4 rounded bg-green-400 hover:bg-green-300 text-slate-100 mr-4">
                Completed
              </button>
            </span>
          </li>
          <li className="flex justify-between items-center py-2 hover:bg-slate-100 px-2 rounded">
            <span className="flex items-center space-x-4">
              <span className="text-yellow-500">
                <BsClockHistory />
              </span>
              <span className="text-slate-500">Minor task 2</span>
            </span>
          </li>
        </ol>
      </div>
      <KanbanComponent
        id="kanban"
        dataSource={kanbanData}
        cardSettings={{ contentField: "Summary", headerField: "Id" }}
        keyField="Status"
        ref={(g) => (grid = g)}
      >
        <ColumnsDirective>
          {kanbanGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
      </KanbanComponent>
      <div className="flex justify-end items-center mr-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 w-56 flex justify-center items-center text-white font-bold py-2 px-4 rounded"
          onClick={() => getData()}
        >
          Update
        </button>
      </div>
      <div className="mt-5">
        <div className="text-lg font-bold mb-3">Completed Tasks</div>
        <ul class="mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400">
          <li class="flex items-center space-x-3">
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>Individual configuration</span>
          </li>
          <ol className="pl-7">
            <li class="flex items-center space-x-3">
              <svg
                class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Individual configuration</span>
            </li>
          </ol>
        </ul>

        <div className="text-lg font-bold mb-3">Upcoming Tasks</div>
        <ul class="mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400">
          <li class="flex items-center space-x-3">
            <span className="text-yellow-500">
              <BsClockHistory />
            </span>
            <span>Individual configuration</span>
          </li>
          <ol className="pl-7">
            <li class="flex items-center space-x-3">
              <span className="text-yellow-500">
                <BsClockHistory />
              </span>
              <span>Individual configuration</span>
            </li>
          </ol>
        </ul>
      </div>
    </div>
  );
};

export default Kanban;
