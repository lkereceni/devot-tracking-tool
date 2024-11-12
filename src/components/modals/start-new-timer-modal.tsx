"use client";

import { addNewTask } from "@/firebase/firestore/firestore";
import { Task } from "@/types";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { ChangeEvent, useState } from "react";

const StartNewTimerModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <Button
        label="Start new timer"
        icon="pi pi-stopwatch icon-24px"
        className="flex flex-row align-items-center gap-10px bg-orange-500 text-white pr-20px cursor-pointer hover:bg-orange-700"
        style={{ paddingLeft: 10 }}
        onClick={() => setIsModalVisible(true)}
      />
      <Dialog
        visible={isModalVisible}
        modal
        onHide={() => {
          if (!isModalVisible) return;
          setIsModalVisible(false);
        }}
        className="bg-white-lilac border-radius-8px"
        content={({ hide }) => (
          <div
            className="flex flex-column px-8 py-5 gap-4"
            style={{ borderRadius: "3px" }}
          >
            <InputText
              id="description"
              placeholder="Description"
              className="bg-white"
              type="text"
              value={description}
              onChange={handleOnChange}
            />
            <div className="flex align-items-center gap-2">
              <Button
                label="Save"
                onClick={async (e) => {
                  await addNewTask({
                    time: 0,
                    description: description,
                    date: new Date(),
                  } as Task);
                  hide(e);
                }}
                text
                className="p-3 w-full bg-orange-500 text-white"
              />
              <Button
                label="Cancel"
                onClick={(e) => {
                  hide(e);
                }}
                text
                className="p-3 w-full bg-white-lilac border-lynch text-lynch"
              />
            </div>
          </div>
        )}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      />
    </>
  );
};

export default StartNewTimerModal;
