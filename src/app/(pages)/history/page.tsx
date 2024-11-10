"use client";

import Table from "@/components/table/table";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { ReactElement, useState } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button } from "primereact/button";

export default function HistoryPage() {
  const [startDate, setStartDate] = useState<Date | null | undefined>(null);
  const [endDate, setEndDate] = useState<Date | null | undefined>(null);
  const [search, setSearch] = useState("");

  const data = [
    {
      date: "15.08.2021.",
      description: "Jira-123",
      timeTracked: "05:02:23",
    },
    {
      date: "15.08.2021.",
      description: "Jira-123",
      timeTracked: "01:12:28",
    },
    {
      date: "15.08.2021.",
      description: "Jira-123",
      timeTracked: "05:02:23",
    },
  ];

  const headerMapping: Record<string, string> = {
    timeTracked: "Time tracked",
  };

  const actionsButtons: ReactElement<typeof Button>[] = [
    <Button key="edit" icon="pi pi-pencil icon-24px" className="text-lynch" />,
    <Button key="delete" icon="pi pi-trash icon-24px" className="text-lynch" />,
  ];

  return (
    <>
      <p className="text-ebony text-2xl font-bold">{"Trackers history"}</p>
      <div className="w-full bg-white-lilac flex flex-row align-items-center justify-content-center gap-40px border-radius-8px mt-50px py-22px">
        <div className="flex flex-column">
          <label htmlFor="startDate" className="text-lynch">
            Start date
          </label>
          <Calendar
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.value)}
            showIcon
          />
        </div>
        <div className="flex flex-column">
          <label htmlFor="endDate" className="text-lynch">
            End date
          </label>
          <Calendar
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.value)}
            showIcon
          />
        </div>
        <div className="flex flex-column">
          <label htmlFor="search" className="text-lynch">
            Description contains
          </label>
          <IconField id="search" iconPosition="right">
            <InputIcon className="pi pi-times" />
            <InputText placeholder="Search" />
          </IconField>
        </div>
      </div>
      <Table
        data={data}
        headerMapping={headerMapping}
        actionsButtons={actionsButtons}
      />
    </>
  );
}
