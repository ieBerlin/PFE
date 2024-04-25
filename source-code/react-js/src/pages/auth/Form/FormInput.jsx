import { useState } from "react";
import classes from "../Login/Login.module.css";
export default function FormInput({
  isValidInputFun,
  isNotValidInput,
  label,
  Icon,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const isValidInput = isValidInputFun(inputValue);

  const formInputStyle =
    isFocused && isValidInput
      ? "border-green-400"
      : isFocused && !isValidInput
      ? "border-red-400"
      : undefined;
  const iconStyle = ` text-gray-500 flex-shrink-0 size-4  ${
    isFocused && isValidInput
      ? "text-green-400"
      : isFocused && !isValidInput
      ? "text-red-400"
      : undefined
  }`;
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <div className="relative">
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          className={`border-2 peer py-3 px-4 ps-11 w-full bg-gray-100 rounded-lg text-smdisabled:opacity-50 disabled:pointer-events-none outline-none ${formInputStyle} focus:bg-white`}
          placeholder={`Enter ${label}`}
          {...props}
        />
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none ">
          {<Icon className={iconStyle} />}
        </div>
      </div>
    </>
  );
}
