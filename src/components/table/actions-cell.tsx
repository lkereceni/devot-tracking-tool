import { Button } from "primereact/button";
import React, { FC } from "react";

export interface Action {
  icon: string;
  className?: string;
  onClick: () => void;
}

interface ActionsCellProps {
  actions: Action[];
}

const ActionsCell: FC<ActionsCellProps> = ({ actions }) => {
  return (
    <div className="flex flex-row align-items-center justify-content-center gap-15px">
      {actions.map((action, index) => (
        <Button
          key={index}
          icon={action.icon}
          className={action.className}
          onClick={action.onClick}
        />
      ))}
    </div>
  );
};

export default ActionsCell;
