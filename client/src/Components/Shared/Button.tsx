import React from "react";
import "Assets/Styles/ComponentsStyle/button.scss";

type Props = {
  text: string;
  iconName?: string;
  exClass?: string;
  color: string;
  size?: string;
  action?: any;
};

const Button: React.FC<Props> = ({
  text,
  iconName,
  exClass = "",
  size = "",
  color,
  action,
}) => {
  return (
    <button
      className={`base-button ${color} ${size}  ${exClass}`}
      onClick={action()}
    >
      {iconName && <span className="material-symbols-rounded">{iconName}</span>}
      {text}
    </button>
  );
};

export default Button;
