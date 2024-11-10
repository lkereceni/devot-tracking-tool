"use client";

import StartNewTimerModal from "@/components/modals/start-new-timer-modal";
import StopAllModal from "@/components/modals/stop-all-modal";
import Table from "@/components/table/table";
import { subscribeToTasks } from "@/firebase/firestore/subscribe-to-tasks";
import { TaskInProgress } from "@/types";
import { getToday } from "@/utils";
import { Button } from "primereact/button";
import React, { ReactElement, useEffect, useState } from "react";

const headerMapping: Record<string, string> = {
  time: "Time logged",
};

export default function TrackersPage() {
  const [tasks, setTasks] = useState<TaskInProgress[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToTasks((newTasks) => {
      setTasks(newTasks);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const actionsButtons: ReactElement<typeof Button>[] = [
    <Button
      key="start"
      icon="pi pi-play-circle icon-24px text-orange-500"
      className="text-lynch"
    />,
    <Button
      key="stop"
      icon="pi pi-stop-circle icon-24px"
      className="text-lynch"
    />,
    <Button key="edit" icon="pi pi-pencil icon-24px" className="text-lynch" />,
    <Button key="delete" icon="pi pi-trash icon-24px" className="text-lynch" />,
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
        data={tasks}
        headerMapping={headerMapping}
        actionsButtons={actionsButtons}
        loading={loading}
      />
    </>
  );
}
