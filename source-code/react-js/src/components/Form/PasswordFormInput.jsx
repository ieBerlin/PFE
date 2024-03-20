import { useState } from "react";
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
      ? {
          border: "1px solid green",
          boxShadow: "2px 2px 4px grey",
        }
      : isFocused && !isValidInput
      ? {
          border: "1px solid red",
        }
      : undefined;
  const labelStyle =
    isFocused && isValidInput
      ? {
          color: "green",
        }
      : isFocused && !isValidInput
      ? {
          color: "red",
        }
      : undefined;
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handlePasswordInputShow = () => {
    setIsShown((prevState) => !prevState);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <div className="form-input" style={formInputStyle}>
        <div className="password-input-wrapper">
          <div className="password-input">
            <label htmlFor={label} style={labelStyle}>
              {label}
            </label>
            <input
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              type={isShown ? "text" : "password"}
              {...props}
            />
          </div>
          <button onClick={handlePasswordInputShow} type="button">
            Show
          </button>
        </div>
      </div>
      {isFocused && !isValidInput && (
        <p className="input-not-valid">Password is not valid</p>
      )}
    </>
  );
}
