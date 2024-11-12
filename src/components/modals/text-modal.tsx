"use client";

import { Button } from "primereact/button";
import { Dialog, DialogProps } from "primereact/dialog";

const TextModal = ({ visible, onHide }: DialogProps) => {
  return (
    <Dialog
      visible={visible}
      modal
      onHide={onHide}
      className="bg-white-lilac border-radius-8px"
      content={({ hide }) => (
        <div
          className="flex flex-column px-8 py-5 gap-3"
          style={{ borderRadius: "3px" }}
        >
          <h2>Are you sure?</h2>
          <p>Are you sure you want to stop all timers?</p>
          <div className="flex align-items-center gap-2">
            <Button
              label="Stop all"
              onClick={(e) => {
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

export default TextModal;
