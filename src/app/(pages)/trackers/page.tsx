import Table from "@/components/table/table";
import { getToday } from "@/utils";
import { Button } from "primereact/button";
import React from "react";

export default function TrackersPage() {
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
        />
        <Button
          label="Stop all"
          icon="pi pi-stop-circle icon-24px"
          className="flex flex-row align-items-center gap-10px bg-port-gore text-white pr-20px cursor-pointer hover:bg-port-gore-700"
          style={{ paddingLeft: 10 }}
        />
      </div>
      <Table />
    </>
  );
}
