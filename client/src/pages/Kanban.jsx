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
  const [currentChild, setcurrentChild] = useState();
  const [reload, setreload] = useState(false);
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const { t } = useTranslation();

  let grid;
  const parallelTaskUpdate = async () => {
    if (grid) {
      const currAdoptionflow = currentChild.majorTask;
      currAdoptionflow[currentChild.currMajorTask].minorTask = grid.kanbanData;
      const response = await axios.post(
        "http://localhost:3000/child/status_update",
        {
          child_id: selectedChild,
          statusObject: currAdoptionflow,
        }
      );
      if (response.data.response)
        setcurrentChild(response.data.response.individualAdoptionFlow);
    }
  };

  const seriesMinorCompleted = async (minorIndex) => {
    const newmajorAdoptionFlow =
      currentChild.majorTask[currentChild.currMajorTask];
    newmajorAdoptionFlow.minorTask[minorIndex].minorTaskStatus = 2;
    const majorAdoptionFlow = currentChild.majorTask;
    majorAdoptionFlow[currentChild.currMajorTask] = newmajorAdoptionFlow;
    const response = await axios.post(
      "http://localhost:3000/child/status_update",
      {
        child_id: selectedChild,
        statusObject: majorAdoptionFlow,
      }
    );
    console.log(response.data);
    if (response.data.response)
      setcurrentChild(response.data.response.individualAdoptionFlow);
  };

  const getcurrentChildHandler = async (child_id) => {
    const response = await axios.post("http://localhost:3000/child/getchild", {
      child_id: child_id,
    });
    if (response.data.response)
      setcurrentChild(response.data.response.individualAdoptionFlow);
  };

  useEffect(async () => {
    if (!user) return;
    if (user.category === "admin") {
      const response = await axios.get("http://localhost:3000/admin/all_child");
      console.log(response.data.response);
      setchildData(response.data.response);
    } else {
      const response = await axios.post(
        "http://localhost:3000/users/get_allocated_children",
        {
          user_id: user.user_id,
        }
      );
      setchildData(response.data.response.alloted_children);
    }
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <Header category="App" title="Progress" />
      <div className="mb-4 ml-3">
        <span className="font-semibold pr-5">{t("Select Child")} : </span>
        <select
          className="h-10 border mt-1 rounded px-4 w-3/4 bg-gray-50 ml-5"
          onChange={(e) => {
            console.log(e.target.value);
            if (e.target.value === "") {
              setcurrentChild();
            } else {
              getcurrentChildHandler(e.target.value);
              setselectedChild(e.target.value);
            }
          }}
        >
          <option value="">Please Select</option>
          {childData &&
            childData.length &&
            childData.map((child, index) => {
              return (
                <option key={index} value={child.child_id}>
                  {child.childName}
                </option>
              );
            })}
        </select>
      </div>
      {currentChild ? (
        <div>
          {currentChild.currMajorTask < currentChild.majorTask.length ? (
            <div>
              <div className="text-lg font-bold my-7">Current Tasks</div>
              <div className="mb-5 ml-5">
                <div className="text-md font-semibold mb-5">
                  {
                    currentChild.majorTask[currentChild.currMajorTask]
                      .majorTaskStatement
                  }
                </div>
                {currentChild.majorTask[currentChild.currMajorTask]
                  .iterationMethod === "series" ? (
                  <ol className="pl-7">
                    {currentChild.majorTask[currentChild.currMajorTask] &&
                    currentChild.majorTask[currentChild.currMajorTask].minorTask
                      .length
                      ? currentChild.majorTask[
                          currentChild.currMajorTask
                        ].minorTask.map((minor, index) => {
                          if (
                            index ==
                              currentChild.majorTask[currentChild.currMajorTask]
                                .currMinorTask &&
                            minor.minorTaskStatus === 0
                          ) {
                            return (
                              <li className="flex justify-between items-center py-2 hover:bg-slate-100 px-2 rounded">
                                <span className="flex items-center space-x-4">
                                  <span className="text-green-500">
                                    <BsClockHistory />
                                  </span>
                                  <span className="">
                                    {t(`${minor.minorTaskStatement}`)}
                                  </span>
                                </span>
                                <span>
                                  <button
                                    className="py-1 text-sm px-4 rounded bg-green-400 hover:bg-green-300 text-slate-100 mr-4"
                                    onClick={() => seriesMinorCompleted(index)}
                                  >
                                    {t("Completed")}
                                  </button>
                                </span>
                              </li>
                            );
                          } else if (minor.minorTaskStatus === 0) {
                            return (
                              <li className="flex justify-between items-center py-2 cursor-not-allowed hover:bg-slate-100 px-2 rounded">
                                <span className="flex items-center space-x-4">
                                  <span className="text-yellow-500">
                                    <BsClockHistory />
                                  </span>
                                  <span className="">
                                    {t(`${minor.minorTaskStatement}`)}
                                  </span>
                                </span>
                              </li>
                            );
                          } else {
                            return (
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
                                <span className="text-slate-400">
                                  {t(`${minor.minorTaskStatement}`)}
                                </span>
                              </li>
                            );
                          }
                        })
                      : ""}
                  </ol>
                ) : (
                  <div>
                    <KanbanComponent
                      id="kanban"
                      dataSource={
                        currentChild.majorTask[currentChild.currMajorTask]
                          .minorTask
                      }
                      cardSettings={{
                        contentField: "",
                        headerField: "minorTaskStatement",
                      }}
                      keyField="minorTaskStatus"
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
                        onClick={() => parallelTaskUpdate()}
                      >
                        {t("Update")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
          {currentChild.currMajorTask > 0 ? (
            <div className="mt-5">
              <div className="text-lg font-bold mb-3">
                {t("Completed Tasks")}
              </div>
              {currentChild.majorTask && currentChild.majorTask.length
                ? currentChild.majorTask.map((major, index) => {
                    if (index < currentChild.currMajorTask) {
                      return (
                        <ul
                          class="mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400"
                          key={index}
                        >
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
                            <span>{t(`${major.majorTaskStatement}`)}</span>
                          </li>
                          <ol className="pl-7">
                            {major.minorTask && major.minorTask.length
                              ? major.minorTask.map((minor, index) => {
                                  return (
                                    <li
                                      class="flex items-center space-x-3"
                                      key={index}
                                    >
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
                                      <span>
                                        {t(`${minor.minorTaskStatement}`)}
                                      </span>
                                    </li>
                                  );
                                })
                              : ""}
                          </ol>
                        </ul>
                      );
                    } else {
                      return "";
                    }
                  })
                : ""}
            </div>
          ) : (
            ""
          )}
          {currentChild.currMajorTask < currentChild.majorTask.length - 1 ? (
            <div className="mt-5">
              <div className="text-lg font-bold mb-3">
                {t("Upcoming Tasks")}
              </div>
              {currentChild.majorTask && currentChild.majorTask.length
                ? currentChild.majorTask.map((major, index) => {
                    if (index > currentChild.currMajorTask) {
                      return (
                        <ul
                          class="mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400"
                          key={index}
                        >
                          <li class="flex items-center space-x-3">
                            <span className="text-yellow-500">
                              <BsClockHistory />
                            </span>
                            <span>{t(`${major.majorTaskStatement}`)}</span>
                          </li>
                          <ol className="pl-7">
                            {major.minorTask && major.minorTask.length
                              ? major.minorTask.map((minor, index) => {
                                  return (
                                    <li
                                      class="flex items-center space-x-3"
                                      key={index}
                                    >
                                      <span className="text-yellow-500">
                                        <BsClockHistory />
                                      </span>
                                      <span>
                                        {t(`${minor.minorTaskStatement}`)}
                                      </span>
                                    </li>
                                  );
                                })
                              : ""}
                          </ol>
                        </ul>
                      );
                    } else {
                      return "";
                    }
                  })
                : ""}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Kanban;
