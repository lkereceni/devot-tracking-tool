"use client";

import Table from "@/components/table/table";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { ChangeEvent, useEffect, useState } from "react";
import { Task } from "@/types";
import {
  millisecondsToString,
  timestampToDate,
  timestampToDateString,
} from "@/utils";
import Modal from "@/components/modals/modal";
import { modalType } from "@/constants";
import { subscribeToTasksHistory } from "@/firebase/firestore/subscribe";
import useModal from "@/hooks/useModal";

export type HistoryDataTable = {
  id: string;
  description: string;
  date: string;
  time: string;
};

export default function HistoryPage() {
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedTask, setSelectedTask] = useState<HistoryDataTable | null>(
    null
  );
  const [filteredData, setFilteredData] = useState<Task[] | null>(tasks);

  const editModal = useModal();
  const deleteModal = useModal();

  useEffect(() => {
    const unsubscribe = subscribeToTasksHistory((newTasks) => {
      setTasks(newTasks);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (startDate && endDate && tasks) {
      endDate.setHours(23, 59, 59, 999);

      setFilteredData(
        tasks.filter(
          (task) =>
            timestampToDate(task.timestamp) >= startDate &&
            timestampToDate(task.timestamp) <= endDate
        )
      );
    } else if (startDate && tasks) {
      setFilteredData(
        tasks.filter((task) => timestampToDate(task.timestamp)! >= startDate)
      );
    } else if (endDate && tasks) {
      endDate.setHours(23, 59, 59, 999);

      setFilteredData(
        tasks.filter((task) => timestampToDate(task.timestamp)! <= endDate)
      );
    } else {
      setFilteredData(tasks!);
    }
  }, [startDate, endDate, tasks]);

  const handleEditClick = (rowData: HistoryDataTable) => {
    editModal.show();
    setSelectedTask(rowData);
  };

  const handleDeleteClick = (rowData: HistoryDataTable) => {
    deleteModal.show();
    setSelectedTask(rowData);
  };

  const headerMapping: Record<string, string> = {
    time: "Time tracked",
    timestamp: "Date",
  };

  const actions = (rowData: HistoryDataTable) => [
    {
      icon: "pi pi-pencil icon-24px text-lynch",
      onClick: () => handleEditClick(rowData),
    },
    {
      icon: "pi pi-trash icon-24px text-lynch",
      onClick: () => handleDeleteClick(rowData),
    },
  ];

  const data: HistoryDataTable[] = !filteredData
    ? []
    : filteredData.map(
        (task) =>
          ({
            date: timestampToDateString(task.timestamp),
            id: task.id,
            description: task.description,
            time: millisecondsToString(task.time),
          } as HistoryDataTable)
      );

  const today: Date = new Date();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    const filteredData = !tasks
      ? []
      : tasks.filter((row) =>
          row.description.toLowerCase().includes(value.toLowerCase())
        );
    setFilteredData(filteredData);
  };

  return (
    <>
      <p className="text-ebony text-2xl font-bold">Trackers history</p>
      <div className="w-full bg-white-lilac flex flex-row align-items-center justify-content-center gap-8 border-radius-8px my-7 py-6 px-6">
        <div className="flex flex-column">
          <label htmlFor="startDate" className="text-lynch">
            Start date
          </label>
          <Calendar
            id="startDate"
            value={startDate}
            dateFormat="dd.mm.yy."
            maxDate={today}
            showIcon
            onChange={(e) => {
              setStartDate(e.value as Date);

              if (endDate && e.value && e.value > endDate) {
                setEndDate(null);
              }
            }}
          />
        </div>
        <div className="flex flex-column">
          <label htmlFor="endDate" className="text-lynch">
            End date
          </label>
          <Calendar
            id="endDate"
            value={endDate}
            dateFormat="dd.mm.yy."
            minDate={startDate || undefined}
            maxDate={today}
            showIcon
            onChange={(e) => setEndDate(e.value as Date)}
          />
        </div>
        <div className="flex flex-column">
          <label htmlFor="search" className="text-lynch">
            Description contains
          </label>
          <InputText
            id="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <Table
        data={data}
        loading={loading}
        headerMapping={headerMapping}
        actions={actions}
      />
      <Modal
        type={modalType.edit}
        task={{
          id: selectedTask?.id || "",
          time: selectedTask?.time || "",
          description: selectedTask?.description || "",
        }}
        visible={editModal.isVisible}
        onHide={editModal.hide}
      />
      <Modal
        type={modalType.delete}
        task={{
          id: selectedTask?.id || "",
          time: selectedTask?.time || "",
          description: selectedTask?.description || "",
        }}
        visible={deleteModal.isVisible}
        onHide={deleteModal.hide}
      />
    </>
  );
}
