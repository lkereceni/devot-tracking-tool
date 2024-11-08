import { classNames } from "primereact/utils";
import React, { FC, ReactNode } from "react";

type CardWrapperProps = {
  className?: string;
  children: ReactNode;
};

const CardWrapper: FC<CardWrapperProps> = ({ className, children }) => {
  return (
    <div
      className={classNames(
        "bg-white-lilac border-05px border-whisper border-round-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardWrapper;