import React, { FC, ReactNode } from "react";

type CardWrapperProps = {
  children: ReactNode[];
};

const CardWrapper: FC<CardWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-column justify-content-center bg-white-lilac border-05px border-whisper gap-49px pb-60px border-round-lg">
      {children}
    </div>
  );
};

export default CardWrapper;
