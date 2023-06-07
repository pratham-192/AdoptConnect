import React, { useEffect, useState } from "react";
import { Header } from "../components";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import ConfirmPopUp from "../components/Modal/ConfirmPopUp";

const FlowManagement = () => {
  const [category, setcategory] = useState({});
  const [selectedCategory, setselectedCategory] = useState({});
  const [flowDetails, setflowDetails] = useState();
  const [openConfirmPopUp, setopenConfirmPopUp] = useState(0);
  const [newCategory, setnewCategory] = useState("");
  const [reload, setreload] = useState(false);
  const [openAddCategory, setopenAddCategory] = useState(false);

  const addCategoryHandler = async () => {
    console.log(newCategory);
    const response = await axios.post(
      "http://localhost:3000/child/create_child_category",
      {
        childClassification: newCategory,
      }
    );
    console.log(response.data);
    setreload(!reload);
    setopenAddCategory(false)
  };

  const changeCategory = async (childClassification) => {
    console.log(childClassification);
    const response = await axios.post(
      "http://localhost:3000/admin/adoption_flow/curr_flow",
      {
        childClassification: childClassification,
      }
    );
    if (response.data.reponse) {
      setflowDetails(response.data.reponse.majorTask);
      console.log(response.data.reponse.majorTask);
    }
  };

  useEffect(async () => {
    console.log(openConfirmPopUp);
    console.log(selectedCategory);
    const response = await axios.get(
      "http://localhost:3000/child/get_child_category"
    );
    setcategory(response.data.response);
  }, [openConfirmPopUp, reload]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
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
        <button className="h-12 w-12 flex justify-center items-center mb-5 text-xl rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer" onClick={()=>setopenAddCategory(true)}>
          +
        </button>
      </ul>
      {openAddCategory?
      <div className="">
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
      </div>:""}

      <ol className="space-y-4 text-gray-500 list-decimal list-inside dark:text-gray-400 capitalize">
        {flowDetails &&
          flowDetails.length &&
          flowDetails.map((major) => {
            return (
              <li key={major._id}>
                {major.majorTaskStatement}
                {major.minorTask && major.minorTask.length ? (
                  <ul className="pl-5 mt-2 space-y-1 list-disc list-inside">
                    {major.minorTask.map((minor) => {
                      return (
                        <li key={minor._id}>{minor.minorTaskStatement}</li>
                      );
                    })}
                  </ul>
                ) : (
                  ""
                )}
              </li>
            );
          })}
      </ol>
      <div></div>
    </div>
  );
};

export default FlowManagement;
