import React from "react";
import "Assets/Styles/ComponentsStyle/iconButton.scss";

type Props = {
  iconName: string;
  color:
    | "red"
    | "blue"
    | "green"
    | "red-border"
    | "blue-border"
    | "green-border";
  exClass?: string;
  action?: any;
};

const IconButton: React.FC<Props> = ({
  iconName,
  color,
  exClass = "",
  action,
}) => {
  return (
    <div
      className={`base-icon-button ${color} ${exClass}`}
      onClick={() => {
        action();
      }}
    >
      <span className="material-symbols-rounded">{iconName}</span>
    </div>
  );
};

export default IconButton;
