import React from "react";
import "Assets/Styles/ComponentsStyle/badge.scss";

type Props = {
  text?: string | number;
  color?: "blue" | "red";
  exClass?: string;
};

const Badge: React.FC<Props> = ({ text, color, exClass = "" }) => {
  return <div className={`base-badge ${color} ${exClass}`}>{text}</div>;
};

export default Badge;
