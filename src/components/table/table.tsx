import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

const Table = () => {
  const data = [
    {
      time: "01:23:33",
      description: "Task 123 Jira lorem ipsum dolor sit amet",
    },
    {
      time: "01:23:33",
      description: "Task 123 Jira lorem ipsum is simply dummy text of the",
    },
    {
      time: "01:23:33",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since",
    },
    {
      time: "01:23:33",
      description: "Task 123 Jira lorem ipsum dolor sit amet",
    },
    {
      time: "01:23:33",
      description: "Task 123 Jira lorem ipsum is simply dummy text of the",
    },
    {
      time: "01:23:33",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since",
    },
    {
      time: "01:23:33",
      description: "Task 123 Jira lorem ipsum dolor sit amet",
    },
    {
      time: "01:23:33",
      description: "Task 123 Jira lorem ipsum is simply dummy text of the",
    },
    {
      time: "01:23:33",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since",
    },
  ];

  const actionsIcons = (
    <div className="flex flex-row align-items-center justify-content-center gap-30px">
      <i className="pi pi-pause-circle" />
      <i className="pi pi-stop-circle" />
      <i className="pi pi-pencil" />
      <i className="pi pi-trash" />
    </div>
  );

  return (
    <DataTable value={data} paginator rows={5}>
      <Column field="time" header="Time logged" />
      <Column field="description" header="Description" />
      <Column body={actionsIcons} header="Actions" />
    </DataTable>
  );
};

export default Table;
