import isValidEmail from "../../../utils/validation/emailValidation.js";
import isValidPassword from "../../../utils/validation/passwordValidation.js";
import FormInput from "./FormInput.jsx";
import PasswordFormInput from "./PasswordFormInput";
import classes from "../Login/Login.module.css";
import { Form, useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
export default function LoginForm() {
  const navigate = useNavigate();
  function handleFormSubmit(e) {
    e.preventDefault();
  console.log(e.target)
  }
  return (
    <Form onSubmit={handleFormSubmit} className="flex w-full flex-col px-24">
      <FormInput
        Icon={UserIcon}
        isNotValidInput="Email is not valid"
        isValidInputFun={isValidEmail}
        label="email"
        id="email"
        name="email"
        type="email"
        required
      />
      <div className="mt-2"/>
      <PasswordFormInput
        id="password"
        name="password"
        isValidInputFun={isValidPassword}
        label="password"
        required
      />
      <div className={classes.rememberMe}>
        <input type="checkbox" name="remember-me" id="remember-me" />
        <p>Remember me</p>
      </div>
      <button type="submit" className={classes.loginButton}>
        Login
      </button>
    </Form>
  );
}
