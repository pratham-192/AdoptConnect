import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Toolbar,
  Sort,
  Filter,
  Search,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../Components";
import axios from "axios";
import { FaMale, FaFemale } from "react-icons/fa";
import AddChildPopUp from "../Components/Modal/AddChildPopUp";
import ChildDetails from "../Components/Modal/ChildDetails";

const childGenderTemplate = (props) => (
  <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
    <p>
      {props.gender == "male" ? (
        <span className="text-blue-600">
          <FaMale size={15} />
        </span>
      ) : (
        <span className="text-pink-500">
          <FaFemale size={15} />
        </span>
      )}
    </p>
    <p>{props.gender}</p>
  </div>
);

const Customers = () => {
  const [childData, setchildData] = useState([]);
  const [openAddChild, setopenAddChild] = useState(true);
  const [childDetails, setchildDetails] = useState({});
  const [openchildDetails, setopenchildDetails] = useState(false);

  useEffect(async () => {
    const response = await axios.get("http://localhost:3000/admin/all_child");
    console.log(response.data);
    setchildData(response.data.response);
  }, [openAddChild]);

  let grid;
  const rowSelected = () => {
    if (grid) {
      const selectedrecords = grid.getSelectedRecords();
      console.log(selectedrecords);
      setchildDetails(selectedrecords[0]);
      setopenchildDetails(true);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl capitalize">
      {openAddChild ? <AddChildPopUp setopenAddchild={setopenAddChild} /> : ""}
      {openchildDetails ? (
        <ChildDetails
          childDetails={childDetails}
          setopenchildDetails={setopenchildDetails}
        />
      ) : (
        ""
      )}
      <Header category="Page" title="Cases" />
      <button
        className="p-2 mb-2 font-light text-sm rounded px-5 hover:bg-slate-100 cursor-pointer w-32 flex justify-center items-center"
        onClick={() => setopenAddChild(true)}
      >
        Add New +
      </button>
      <GridComponent
        dataSource={childData}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
        rowSelected={rowSelected}
        ref={(g) => (grid = g)}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="child_id"
            headerText="Child ID"
            format="C2"
            width="100"
          ></ColumnDirective>
          <ColumnDirective
            field="childName"
            headerText="Name"
            width="120"
            textAlign="Left"
          ></ColumnDirective>
          <ColumnDirective
            field="childClassification"
            headerText="Category"
            width="120"
          ></ColumnDirective>
          <ColumnDirective
            field="status"
            headerText="Status"
            width="120"
          ></ColumnDirective>
          <ColumnDirective
            field="shelterHome"
            headerText="Shelter Home"
            width="180"
          ></ColumnDirective>
          <ColumnDirective
            field="gender"
            headerText="Gender"
            width="120"
            textAlign="Left"
            template={childGenderTemplate}
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Search, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
