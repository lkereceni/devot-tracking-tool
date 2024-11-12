import { HistoryDataTable } from "@/app/(pages)/history/page";
import { TaskDataTable } from "@/app/(pages)/trackers/page";
import { modalType } from "@/constants";
import {
  addNewTask,
  deleteTask,
  stopTask,
  updateTaskDescription,
} from "@/firebase/firestore/firestore";
import { ModalType, Task } from "@/types";
import { timeStringToMilliseconds } from "@/utils";
import { Button } from "primereact/button";
import { Dialog, DialogProps } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { ChangeEvent, FC, useEffect, useState } from "react";

interface ModalProps extends DialogProps {
  type: ModalType;
  task?: TaskDataTable | HistoryDataTable;
}

const Modal: FC<ModalProps> = ({ type, task, visible, onHide }: ModalProps) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const getButtonLabel = (): string => {
    let label = "";

    switch (type) {
      case "CREATE":
        label = "Start new timer";
        break;
      case "EDIT":
        label = "Edit";
        break;
      case "STOP":
        label = "Stop";
        break;
      case "STOP_ALL":
        label = "Stop all";
        break;
      case "DELETE":
        label = "Delete";
        break;
      default:
        break;
    }

    return label;
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    if (type === modalType.edit && task !== undefined) {
      setDescription(task.description);
    }
  }, [setDescription, task, type]);

  const getContent = () => {
    switch (type) {
      case "CREATE":
      case "EDIT":
        return (
          <>
            <InputText
              placeholder="Description"
              className="bg-white"
              type="text"
              value={description}
              required
              onChange={handleOnChange}
            />
            {error && <small className="p-error">{error}</small>}
          </>
        );
      case "STOP":
      case "STOP_ALL":
      case "DELETE":
        return <h2>Are you sure?</h2>;
    }
  };

  const getTextContent = () => {
    switch (type) {
      case "CREATE":
      case "EDIT":
        return null;
      case "DELETE":
        return <p>Are you sure you want to delete task?</p>;
      case "STOP":
        return <p>Are you sure you want to stop task?</p>;
      case "STOP_ALL":
        return <p>Are you sure you want to stop all tasks?</p>;
    }
  };

  return (
    <Dialog
      visible={visible}
      modal
      onHide={() => {
        onHide();
        if (["CREATE", "EDIT"].includes(type)) {
          setError("");
          setDescription("");
        }
      }}
      className="bg-white-lilac border-radius-8px"
      content={({ hide }) => (
        <div
          className="flex flex-column px-8 py-5 gap-4"
          style={{ borderRadius: "3px" }}
        >
          {getContent()}
          {getTextContent()}
          <div className="flex align-items-center gap-2">
            <Button
              label={getButtonLabel()}
              onClick={async (e) => {
                if (["CREATE", "EDIT"].includes(type)) {
                  if (!description) {
                    setError("Description field is empty!");
                    return;
                  }
                }

                switch (type) {
                  case "CREATE":
                    await addNewTask({
                      time: 0,
                      description: description,
                      timestamp: Date.now(),
                      isStopped: false,
                    } as Task);
                    break;
                  case "EDIT":
                    if (task === undefined) return;

                    await updateTaskDescription({
                      id: task.id,
                      description: description,
                    });
                    break;
                  case "STOP":
                    if (task === undefined) return;

                    await stopTask({
                      id: task.id,
                      time: timeStringToMilliseconds(task.time),
                    });
                    break;
                  case "DELETE":
                    if (task === undefined) return;

                    await deleteTask(task.id);
                    break;
                }

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
  );
};

export default Modal;
