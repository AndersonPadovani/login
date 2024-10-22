"use client";
import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./inputForm.css";

interface InputFormType extends InputHTMLAttributes<HTMLInputElement> {
  valueName: string;
  valueInput?: string;
  className?: string;
  divClassName?: string;
  type?: HTMLInputTypeAttribute;
}

const InputForm = ({
  valueName,
  valueInput,
  className,
  divClassName,
  type,
  ...rest
}: InputFormType) => {
  const [inpText, setInpText] = useState("");
  const [eye, setEye] = useState(false);

  const getEyeType = () => {
    return eye ? (
      <EyeOff
        className="absolute right-3 text-color-text"
        onClick={() => setEye((e) => !e)}
      />
    ) : (
      <Eye
        className="absolute right-3 text-color-text"
        onClick={() => setEye((e) => !e)}
      />
    );
  };

  return (
    <div className={`${divClassName} flex items-center w-full h-max relative`}>
      <input
        className={`inpType ${
          inpText || valueInput ? "inpHasText" : ""
        } w-full h-14 pl-3 text-color-text font-bold text-lg bg-transparent/30 rounded-xl border-color-orange border-[1px] outline-none ${
          className || ""
        }`}
        id={valueName}
        minLength={4}
        type={type != "password" || eye ? "text" : "password"}
        {...rest}
        value={valueInput}
        onChange={(event) => setInpText(event.currentTarget.value)}
      />

      {type === "password" ? getEyeType() : ""}

      <label htmlFor={valueName} className="absolute ml-3 px-2 text-color-text">
        {valueName}
      </label>
    </div>
  );
};

export default InputForm;
