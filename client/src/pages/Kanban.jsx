import React from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import { kanbanData, kanbanGrid } from "../Data/dummy";
import { Header } from "../components";

const Kanban = () => {
  let grid;
  const getData = () => {
    if (grid) {
      console.log(grid.kanbanData);
      // const selectedrowindex = grid.getSelectedRowIndexes();
      // const selectedrecords = grid.getSelectedRecords();
      // console.log(selectedrecords);
      // setworkerDetails(selectedrecords[0]);
      // setopenworkerDetails(true);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <Header category="App" title="Progress" />
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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => getData()}
      >
        Submit
      </button>
    </div>
  );
};

export default Kanban;
