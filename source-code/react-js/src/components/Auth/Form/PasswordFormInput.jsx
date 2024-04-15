import { useState } from "react";
import {
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
export default function PasswordFormInput({
  isValidInputFun,
  label,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [isShown, setIsShown] = useState(false);

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
  const handlePasswordInputShow = () => {
    setIsShown((prevState) => !prevState);
  };
  const eyeStyle =
    "w-5 h-5 absolute bottom-1/2 right-2 translate-y-1/2 text-gray-400 cursor-pointer";
  return (
    <>
      <div className="relative ">
        <input
          type={isShown ? "text" : "password"}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          className={`  relative border-2 peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-smdisabled:opacity-50 disabled:pointer-events-none outline-none ${formInputStyle} focus:bg-white`}
          placeholder={`Enter ${label}`}
          {...props}
        />
        {isShown ? (
          <EyeSlashIcon
            onClick={handlePasswordInputShow}
            className={eyeStyle}
          />
        ) : (
          <EyeIcon onClick={handlePasswordInputShow} className={eyeStyle} />
        )}

        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none ">
          <LockClosedIcon className={iconStyle} />
        </div>
      </div>
    </>
  );
}
/*
   

}
*/
