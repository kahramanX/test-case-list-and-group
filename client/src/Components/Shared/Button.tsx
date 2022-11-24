import React from "react";
import "Assets/Styles/ComponentsStyle/button.scss";

type Props = {
  text: string;
  iconName?: string;
  exClass?: string;
  color: string;
  action?: any;
};

const Button: React.FC<Props> = ({
  text,
  iconName,
  exClass = "",
  color,
  action,
}) => {
  return (
    <button className={`base-button ${color} ${exClass}`} onClick={action()}>
      {iconName && <span className="material-symbols-rounded">{iconName}</span>}
      {text}
    </button>
  );
};

export default Button;
