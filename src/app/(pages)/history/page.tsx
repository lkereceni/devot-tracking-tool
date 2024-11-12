"use client";

import Table from "@/components/table/table";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Task } from "@/types";
import { millisecondsToString, timestampToDate } from "@/utils";
import Modal from "@/components/modals/modal";
import { modalType } from "@/constants";
import { subscribeToTasksHistory } from "@/firebase/firestore/subscribe";

export type HistoryDataTable = {
  id: string;
  description: string;
  date: string;
  time: string;
};

export default function HistoryPage() {
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date | null | undefined>(null);
  const [endDate, setEndDate] = useState<Date | null | undefined>(null);
  const [search, setSearch] = useState("");

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [selectedTask, setSelectedTask] = useState<HistoryDataTable | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = subscribeToTasksHistory((newTasks) => {
      setTasks(newTasks);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleEditClick = (rowData: HistoryDataTable) => {
    setIsEditModalVisible(true);
    setSelectedTask(rowData);
  };

  const handleDeleteClick = (rowData: HistoryDataTable) => {
    setIsDeleteModalVisible(true);
    setSelectedTask(rowData);
  };

  const handleEditModalHide = () => {
    if (!isEditModalVisible) return;
    setIsEditModalVisible(false);
  };

  const handleDeleteModalHide = () => {
    if (!isDeleteModalVisible) return;
    setIsDeleteModalVisible(false);
  };

  const headerMapping: Record<string, string> = {
    time: "Time tracked",
    timestamp: "Date",
  };

  const data: HistoryDataTable[] = !tasks
    ? []
    : tasks.map(
        (task) =>
          ({
            date: timestampToDate(task.timestamp),
            id: task.id,
            description: task.description,
            time: millisecondsToString(task.time),
          } as HistoryDataTable)
      );
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
        visible={isEditModalVisible}
        onHide={handleEditModalHide}
      />
      <Modal
        type={modalType.delete}
        task={{
          id: selectedTask?.id || "",
          time: selectedTask?.time || "",
          description: selectedTask?.description || "",
        }}
        visible={isDeleteModalVisible}
        onHide={handleDeleteModalHide}
      />
    </>
  );
}
