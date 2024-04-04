import { useState } from "react";import classes from "../Login/Login.module.css";
export default function FormInput({
  isValidInputFun,
  isNotValidInput,
  label,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
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
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className={classes.formInput} style={formInputStyle}>
        <label htmlFor={label} style={labelStyle} className={classes.label}>
          {label}
        </label>
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          {...props}
        />
      </div>
      {isFocused && !isValidInput && (
        <p className={classes.inputNotValid}>{isNotValidInput}</p>
      )}
    </>
  );
}
