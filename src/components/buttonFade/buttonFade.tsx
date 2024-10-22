import { ButtonHTMLAttributes } from "react";
import "./buttonFade.css";

interface FadeButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  css?: string;
}

const FadeButton = ({ title, css, ...rest }: FadeButtonType) => {
  return (
    <button className={`fadeButton ${css}`} {...rest}>
      {title}
    </button>
  );
};

export default FadeButton;
