import React from "react";
import "Assets/Styles/componentsStyle/button.scss";

type Props = {
  text: string;
  iconName?: string;
  exClass?: string;
  color: string;
  size?: string;
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
