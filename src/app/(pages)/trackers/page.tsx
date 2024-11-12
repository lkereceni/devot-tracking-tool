"use client";

import StartNewTimerModal from "@/components/modals/start-new-timer-modal";
import StopAllModal from "@/components/modals/stop-all-modal";
import Table from "@/components/table/table";
import { updateTask } from "@/firebase/firestore/firestore";
import { subscribeToTasks } from "@/firebase/firestore/subscribe-to-tasks";
import useStopwatch from "@/hooks/useStopwatch";
import { Task } from "@/types";
import {
  getToday,
  millisecondsToString,
  timeStringToMilliseconds,
} from "@/utils";
import React, { useEffect, useState } from "react";

type TaskDataTable = {
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

  const handlePauseClick = async (rowData: TaskDataTable) => {
    toggleStopwatch(rowData.id);
    await updateTask({
      id: rowData.id,
      time: timeStringToMilliseconds(rowData.time),
      description: rowData.description,
    });
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
      onClick: () => {},
    },
    {
      icon: "pi pi-pencil icon-24px text-lynch",
      onClick: () => {},
    },
    {
      icon: "pi pi-trash icon-24px text-lynch",
      onClick: () => {},
    },
  ];

  return (
    <>
      <div className="flex flex-row align-items-center gap-3">
        <i className="pi pi-calendar icon-25px" />
        <p className="text-ebony text-2xl font-bold">{`Today (${getToday()})`}</p>
      </div>
      <div className="w-full flex flex-row align-items-center justify-content-end gap-15px pt-82px">
        <StartNewTimerModal />
        <StopAllModal />
      </div>
      <Table
        data={data}
        actions={actions}
        headerMapping={headerMapping}
        loading={loading}
      />
    </>
  );
}
