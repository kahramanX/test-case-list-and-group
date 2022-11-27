import React from "react";
import "Assets/Styles/ComponentsStyle/button.scss";

type Props = {
  text: string;
  iconName?: string;
  exClass?: string;
  color:
    | "red"
    | "blue"
    | "green"
    | "red-border"
    | "blue-border"
    | "green-border";
  size?: "md" | "xl";
  action?: any;
  btnType?: "button" | "submit";
};

const Button: React.FC<Props> = ({
  text,
  iconName,
  exClass = "",
  size = "",
  color,
  action,
  btnType = "button",
}) => {
  return (
    <button
      type={btnType}
      className={`base-button ${color} ${size}  ${exClass}`}
      onClick={() => action()}
    >
      {iconName && <span className="material-symbols-rounded">{iconName}</span>}
      {text}
    </button>
  );
};

export default Button;
