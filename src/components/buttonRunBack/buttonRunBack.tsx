import { ButtonHTMLAttributes } from "react";
import "./buttonRunBack.css";

interface FadeButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
}

const ButtonRunBack = ({ title }: FadeButtonType) => {
  return <button className="buttonRunBack">{title}</button>;
};

export default ButtonRunBack;
