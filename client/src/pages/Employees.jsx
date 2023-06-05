import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import AddWorkerPopUp from "../Components/Modal/AddWorkerPopUp";
import axios from "axios";
import { Header } from "../Components";
import WorkerDetails from "../Components/Modal/WorkerDetails";

const Employees = () => {
  const [workerData, setworkerData] = useState([]);
  const [openAddWorker, setopenAddWorker] = useState(false);
  const [workerDetails, setworkerDetails] = useState({});
  const [openworkerDetails, setopenworkerDetails] = useState(false);

  useEffect(async () => {
    const response = await axios.get("http://localhost:3000/admin/all_admin");
    setworkerData(response.data.response);
    const response2 = await axios.get(
      "http://localhost:3000/admin/all_workers"
    );
    setworkerData(response.data.response.concat(response2.data.response));
  }, [openAddWorker]);

  let grid;
  const rowSelected = () => {
    if (grid) {
      const selectedrowindex = grid.getSelectedRowIndexes();
      const selectedrecords = grid.getSelectedRecords();
      console.log(selectedrecords);
      setworkerDetails(selectedrecords[0]);
      setopenworkerDetails(true);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl capitalize">
      {openAddWorker ? (
        <AddWorkerPopUp setopenAddWorker={setopenAddWorker} />
      ) : (
        ""
      )}
      {openworkerDetails ? (
        <WorkerDetails
          workerDetails={workerDetails}
          setopenworkerDetails={setopenworkerDetails}
        />
      ) : (
        ""
      )}
      <Header category="Page" title="Employees" />
      <button
        className="p-2 mb-2 font-light text-sm rounded px-5 hover:bg-slate-100 cursor-pointer w-32 flex justify-center items-center"
        onClick={() => setopenAddWorker(true)}
      >
        Add New +
      </button>
      <GridComponent
        dataSource={workerData}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        width="auto"
        rowSelected={rowSelected}
        ref={(g) => (grid = g)}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="user_id"
            headerText="User Id"
            format="C2"
            isPrimaryKey={true}
            width="100"
          ></ColumnDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="120"
            textAlign="Left"
          ></ColumnDirective>
          <ColumnDirective
            field="category"
            headerText="Category"
            width="120"
          ></ColumnDirective>
          <ColumnDirective
            field="email"
            headerText="Email"
            width="120"
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
    </div>
  );
};
export default Employees;
