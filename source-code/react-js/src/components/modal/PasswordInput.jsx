import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
export default function PasswordInput({ label, placeholder }) {
  const [isShown, setIsShown] = useState(false);
  const handlePasswordInputShow = () => {
    setIsShown((prevState) => !prevState);
  };
  const eyeStyle =
    "w-5 h-5 absolute bottom-1/2 right-2 translate-y-1/2 text-gray-400 cursor-pointer";
  return (
    <>
      <label className="block text-sm font-medium my-2">{label}</label>
      <div className="relative ">
        <input
          required
          type={isShown ? "text" : "password"}
          className="py-3 px-4 block border-gray-200 border-2  w-96 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          placeholder={placeholder}
        />
        {isShown ? (
          <EyeSlashIcon
            onClick={handlePasswordInputShow}
            className={eyeStyle}
          />
        ) : (
          <EyeIcon onClick={handlePasswordInputShow} className={eyeStyle} />
        )}
      </div>
    </>
  );
}
