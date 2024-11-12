"use client";

import Modal from "@/components/modals/modal";
import Table from "@/components/table/table";
import { modalType } from "@/constants";
import { updateTaskTime } from "@/firebase/firestore/firestore";
import { subscribeToTasks } from "@/firebase/firestore/subscribe";
import useStopwatch from "@/hooks/useStopwatch";
import { Task } from "@/types";
import {
  getToday,
  millisecondsToString,
  timeStringToMilliseconds,
} from "@/utils";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";

export type TaskDataTable = {
  id: string;
  time: string;
  description: string;
};

const headerMapping: Record<string, string> = {
  time: "Time logged",
};

export default function TrackersPage() {
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [isStartNewTimerModalVisible, setIsStartNewTimerModalVisible] =
    useState(false);
  const [isStopAllModalVisible, setIsStopAllModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isStopModalVisible, setIsStopModalVisible] = useState(false);

  const [selectedTask, setSelectedTask] = useState<TaskDataTable | null>(null);

  const { toggleStopwatch, stopwatchStates } = useStopwatch(setTasks);

  useEffect(() => {
    const unsubscribe = subscribeToTasks((newTasks) => {
      setTasks(newTasks);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const data: TaskDataTable[] = !tasks
    ? []
    : tasks.map(
        (task) =>
          ({
            id: task.id,
            time: millisecondsToString(task.time),
            description: task.description,
          } as TaskDataTable)
      );

  const handleStartNewTimerModalHide = () => {
    if (!isStartNewTimerModalVisible) return;
    setIsStartNewTimerModalVisible(false);
  };

  const handleStopAllModalHide = () => {
    if (!isStopAllModalVisible) return;
    setIsStopAllModalVisible(false);
  };

  const handleEditModalHide = () => {
    if (!isEditModalVisible) return;
    setIsEditModalVisible(false);
  };

  const handleDeleteModalHide = () => {
    if (!isDeleteModalVisible) return;
    setIsDeleteModalVisible(false);
  };

  const handleStopModalHide = () => {
    if (!isStopModalVisible) return;
    setIsStopModalVisible(false);
  };

  const handlePauseClick = async (rowData: TaskDataTable) => {
    toggleStopwatch(rowData.id);
    await updateTaskTime({
      id: rowData.id,
      time: timeStringToMilliseconds(rowData.time),
    });
  };

  const handleEditClick = (rowData: TaskDataTable) => {
    setIsEditModalVisible(true);
    setSelectedTask(rowData);
  };

  const handleStopClick = (rowData: TaskDataTable) => {
    setIsStopModalVisible(true);
    setSelectedTask(rowData);
  };

  const handleDeleteClick = (rowData: TaskDataTable) => {
    setIsDeleteModalVisible(true);
    setSelectedTask(rowData);
  };

  const actions = (rowData: TaskDataTable) => [
    stopwatchStates[rowData.id]
      ? {
          key: `pause-${rowData.id}`,
          icon: "pi pi-pause-circle icon-24px text-orange-500",
          onClick: () => handlePauseClick(rowData),
        }
      : {
          key: `start-${rowData.id}`,
          icon: "pi pi-play-circle icon-24px text-orange-500",
          onClick: () => toggleStopwatch(rowData.id),
        },

    {
      icon: "pi pi-stop-circle icon-24px text-lynch",
      onClick: () => handleStopClick(rowData),
    },
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
      <div className="flex flex-row align-items-center gap-3">
        <i className="pi pi-calendar icon-25px" />
        <p className="text-ebony text-2xl font-bold">{`Today (${getToday()})`}</p>
      </div>
      <div className="w-full flex flex-row align-items-center justify-content-end gap-15px pt-82px">
        <Button
          label="Start new timer"
          icon="pi pi-stopwatch icon-24px"
          className="flex flex-row align-items-center gap-10px bg-orange-500 text-white pr-20px cursor-pointer hover:bg-orange-700"
          style={{ paddingLeft: 10 }}
          onClick={() => setIsStartNewTimerModalVisible(true)}
        />
        <Button
          label="Stop all"
          icon="pi pi-stop-circle icon-24px"
          className="flex flex-row align-items-center gap-10px bg-port-gore text-white pr-20px cursor-pointer hover:bg-port-gore-700"
          style={{ paddingLeft: 10 }}
          onClick={() => setIsStopAllModalVisible(true)}
        />
      </div>
      <Table
        data={data}
        actions={actions}
        headerMapping={headerMapping}
        loading={loading}
      />
      <Modal
        type={modalType.create}
        visible={isStartNewTimerModalVisible}
        onHide={handleStartNewTimerModalHide}
      />
      <Modal
        type={modalType.stopAll}
        visible={isStopAllModalVisible}
        onHide={handleStopAllModalHide}
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
      <Modal
        type={modalType.stop}
        task={{
          id: selectedTask?.id || "",
          time: selectedTask?.time || "",
          description: selectedTask?.description || "",
        }}
        visible={isStopModalVisible}
        onHide={handleStopModalHide}
      />
    </>
  );
}
