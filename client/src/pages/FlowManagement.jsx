import React, { useEffect, useState } from "react";
import { Header } from "../components";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import ConfirmPopUp from "../components/Modal/ConfirmPopUp";
import EditFlowPopUp from "../components/Modal/EditFlowPopUp";
import { FiEdit } from "react-icons/fi";
import { RxDot } from "react-icons/rx";

const FlowManagement = () => {
  const [category, setcategory] = useState({});
  const [selectedCategory, setselectedCategory] = useState({});
  const [flowDetails, setflowDetails] = useState();
  const [openConfirmPopUp, setopenConfirmPopUp] = useState(0);
  const [newCategory, setnewCategory] = useState("");
  const [reload, setreload] = useState(false);
  const [openAddCategory, setopenAddCategory] = useState(false);
  const [majorTaskPosition, setmajorTaskPosition] = useState(0);
  const [majorTaskStatement, setmajorTaskStatement] = useState("");
  const [majorTaskNote, setmajorTaskNote] = useState("");
  const [minorTaskPosition, setminorTaskPosition] = useState(0);
  const [minorTaskStatement, setminorTaskStatement] = useState("");
  const [minorTaskNote, setminorTaskNote] = useState("");
  const [openEditPopUp, setopenEditPopUp] = useState(false);
  const [editTaskDetails, seteditTaskDetails] = useState({});

  const addMajorTaskHandler = async () => {
    await axios.post("http://localhost:3000/admin/adoption_flow/major/create", {
      childClassification: selectedCategory.childClassification,
      majorTaskPosition: majorTaskPosition + 1,
      majorTaskNote: majorTaskNote,
      majorTaskStatement: majorTaskStatement,
    });
    setmajorTaskNote("");
    setmajorTaskPosition(0);
    setmajorTaskStatement("");
    changeCategory(selectedCategory.childClassification);
  };
  const addMinorTaskHandler = async () => {
    await axios.post("http://localhost:3000/admin/adoption_flow/minor/create", {
      childClassification: selectedCategory.childClassification,
      majorTaskPosition: majorTaskPosition,
      minorTaskPosition: minorTaskPosition + 1,
      minorTaskNote: minorTaskNote,
      minorTaskStatement: minorTaskStatement,
    });
    setminorTaskNote("");
    setminorTaskPosition(0);
    setmajorTaskPosition(0);
    setminorTaskStatement("");
    changeCategory(selectedCategory.childClassification);
  };

  const addCategoryHandler = async () => {
    await axios.post("http://localhost:3000/child/create_child_category", {
      childClassification: newCategory,
    });
    setreload(!reload);
    setopenAddCategory(false);
  };

  const changeCategory = async (childClassification) => {
    const response = await axios.post(
      "http://localhost:3000/admin/adoption_flow/curr_flow",
      {
        childClassification: childClassification,
      }
    );
    if (response.data.reponse) {
      setflowDetails(response.data.reponse.majorTask);
    }
  };

  useEffect(async () => {
    if (openConfirmPopUp == 1) {
      await axios.post("http://localhost:3000/child/delete_child_category", {
        childClassification: selectedCategory.childClassification,
      });
      setopenConfirmPopUp(0);
    }
    const response = await axios.get(
      "http://localhost:3000/child/get_child_category"
    );
    setcategory(response.data.response);
  }, [openConfirmPopUp, reload]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      {openEditPopUp ? (
        <EditFlowPopUp
          setopenEditPopUp={setopenEditPopUp}
          editTaskDetails={editTaskDetails}
          changeCategory={changeCategory}
        />
      ) : (
        ""
      )}
      <Header category="Apps" title="Flow Management" />
      {openConfirmPopUp == 3 ? (
        <ConfirmPopUp
          heading={"Delete the category"}
          message={"Are you sure you want to delete the category?"}
          setopenConfirmPopUp={setopenConfirmPopUp}
        />
      ) : (
        ""
      )}
      <ul className="flex flex-wrap items-center justify-center mb-6 text-gray-900 dark:text-white">
        {category &&
          category.length &&
          category.map((category) => (
            <li
              key={category._id}
              className={`mr-4 hover:bg-slate-200 ${
                selectedCategory && selectedCategory._id == category._id
                  ? "bg-sky-400 text-slate-100"
                  : "bg-slate-100"
              } px-7 rounded py-2 md:mr-6 cursor-pointer capitalize flex mb-5 justify-center items-center`}
            >
              <span
                onClick={() => {
                  changeCategory(category.childClassification);
                  setselectedCategory(category);
                }}
              >
                {category.childClassification}
              </span>
              <button
                className="flex justify-center items-center text-red-500 p-2 ml-2 hover:bg-slate-50 rounded hover:text-red-400"
                onClick={() => {
                  changeCategory(category.childClassification);
                  setselectedCategory(category);
                  setopenConfirmPopUp(3);
                }}
              >
                <AiFillDelete size={20} />
              </button>
            </li>
          ))}
        <button
          className="h-12 w-12 flex justify-center items-center mb-5 text-xl rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer"
          onClick={() => setopenAddCategory(true)}
        >
          +
        </button>
      </ul>
      {openAddCategory ? (
        <div className="mb-3">
          <label htmlFor="category">Add Category</label>
          <div className="grid grid-cols-2">
            <input
              type="text"
              name="category"
              id="category"
              className="h-10 border mt-2 rounded px-4 w-full bg-gray-50"
              value={newCategory}
              onChange={(e) => setnewCategory(e.target.value)}
              placeholder=""
            />
            <button
              className="bg-blue-400 hover:bg-blue-500 ml-2 mt-2 h-10 text-white font-bold w-3/4 py-2 px-4 rounded"
              onClick={() => addCategoryHandler()}
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {selectedCategory && selectedCategory.childClassification ? (
        <div>
          <ol className="space-y-4 text-gray-500 list-decimal list-inside dark:text-gray-400 capitalize border-b-2 pb-4 mb-2">
            {flowDetails &&
              flowDetails.length &&
              flowDetails.map((major, majorIndex) => {
                return (
                  <span key={major._id}>
                    <div className="pb-2 mb-2 flex justify-between items-center hover:bg-slate-100 rounded p-1">
                      <span className="flex mb-2 flex justify-between items-center hover:bg-slate-100 rounded p-1">
                        <span className="pr-2 flex justify-center items-center">
                          {majorIndex + 1}.
                        </span>
                        {major.majorTaskStatement}
                      </span>
                      <span
                        className="hover:text-slate-500 cursor-pointer p-1"
                        onClick={() => {
                          seteditTaskDetails({
                            minorTask: false,
                            majorTask: true,
                            statement: major.majorTaskStatement,
                            note: major.majorTaskNote,
                            majorIndex: majorIndex,
                            childClassification:
                              selectedCategory.childClassification,
                          });
                          setopenEditPopUp(true);
                        }}
                      >
                        <FiEdit />
                      </span>
                    </div>
                    {major.minorTask && major.minorTask.length ? (
                      <ul className="pl-5 mt-2 space-y-1 list-disc list-inside">
                        {major.minorTask.map((minor, minorIndex) => {
                          return (
                            <li
                              key={minor._id}
                              className="flex justify-between items-center hover:bg-slate-100 rounded p-1"
                            >
                              <span className="flex">
                                <span className="pr-2 flex justify-center items-center">
                                  <RxDot size={20} />
                                </span>
                                {minor.minorTaskStatement}
                              </span>
                              <span
                                className="hover:text-slate-500 cursor-pointer p-1"
                                onClick={() => {
                                  seteditTaskDetails({
                                    minorTask: true,
                                    majorTask: false,
                                    statement: minor.minorTaskStatement,
                                    note: minor.minorTaskNote,
                                    majorIndex: majorIndex,
                                    minorIndex: minorIndex,
                                    childClassification:
                                      selectedCategory.childClassification,
                                  });
                                  setopenEditPopUp(true);
                                }}
                              >
                                <FiEdit />
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      ""
                    )}
                  </span>
                );
              })}
          </ol>
          <div className="mt-5">
            <div className="text-lg font-bold mb-3">Add new Major Task</div>
            {flowDetails && flowDetails.length ? (
              <div className="md:col-span-5">
                <div className="text-sm py-1">
                  Select before which major task to add
                </div>
                <select
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  onChange={(e) => setmajorTaskPosition(e.target.value)}
                >
                  {flowDetails.map((majorTask, index) => {
                    return (
                      <option key={index} value={index}>
                        {majorTask.majorTaskStatement}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <div className="text-md py-2">Add your first major task</div>
            )}
            <div className="md:col-span-5 mt-3">
              <label htmlFor="full_name" className="text-sm">
                Major Task Statement
              </label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={majorTaskStatement}
                onChange={(e) => setmajorTaskStatement(e.target.value)}
              />
            </div>
            <div className="md:col-span-5 mt-3">
              <label htmlFor="full_name" className="text-sm">
                Major Task Note
              </label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={majorTaskNote}
                onChange={(e) => setmajorTaskNote(e.target.value)}
              />
            </div>
            <div className="md:col-span-5 text-right">
              <div className="inline-flex items-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 mt-3 w-56 text-white font-bold py-2 px-4 rounded"
                  onClick={() => addMajorTaskHandler()}
                >
                  Add Major Task
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-lg font-bold mb-3">Add new Minor Task</div>
            {flowDetails && flowDetails.length ? (
              <div className="md:col-span-5">
                <div className="text-sm py-1">
                  Select major task to add to it
                </div>
                <select
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  onChange={(e) => setmajorTaskPosition(e.target.value)}
                >
                  {flowDetails.map((majorTask, index) => {
                    return (
                      <option key={index} value={index}>
                        {majorTask.majorTaskStatement}
                      </option>
                    );
                  })}
                </select>
                {flowDetails[majorTaskPosition].minorTask &&
                flowDetails[majorTaskPosition].minorTask.length ? (
                  <div className="md:col-span-5">
                    <div className="text-sm py-1">
                      Select before which minor task to add
                    </div>
                    <select
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      onChange={(e) => setminorTaskPosition(e.target.value)}
                    >
                      {flowDetails[majorTaskPosition].minorTask.map(
                        (minorTask, index) => {
                          return (
                            <option key={index} value={index}>
                              {minorTask.minorTaskStatement}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                ) : (
                  <div className="text-md mt-2 py-2">
                    Add your first minor task
                  </div>
                )}
              </div>
            ) : (
              <div className="text-md py-2">Add a major task first</div>
            )}
            <div className="md:col-span-5 mt-3">
              <label htmlFor="full_name" className="text-sm">
                Minor Task Statement
              </label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={minorTaskStatement}
                onChange={(e) => setminorTaskStatement(e.target.value)}
                disabled={!flowDetails || !flowDetails.length}
              />
            </div>
            <div className="md:col-span-5 mt-3">
              <label htmlFor="full_name" className="text-sm">
                Minor Task Note
              </label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={minorTaskNote}
                onChange={(e) => setminorTaskNote(e.target.value)}
                disabled={!flowDetails || !flowDetails.length}
              />
            </div>
            <div className="md:col-span-5 text-right">
              <div className="inline-flex items-end">
                <button
                  className={`bg-blue-500 hover:bg-blue-700 mt-3 w-56 text-white font-bold py-2 px-4 rounded ${
                    !flowDetails || !flowDetails.length
                      ? "cursor-not-allower"
                      : "cursor-pointer"
                  }`}
                  onClick={() => addMinorTaskHandler()}
                  disabled={!flowDetails || !flowDetails.length}
                >
                  Add Minor Task
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FlowManagement;
