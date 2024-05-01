import isValidEmail from "../../../utils/validation/emailValidation.js";
import isValidPassword from "../../../utils/validation/passwordValidation.js";
import FormInput from "./FormInput.jsx";
import PasswordFormInput from "./PasswordFormInput";
import classes from "../Login/Login.module.css";
import { useFetcher } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
export default function LoginForm() {
  const fetcher = useFetcher();
  const { Form, state } = fetcher;
  const isSubmitting = state === "submitting";
  const submitButtonStyles = isSubmitting ? classes.submittingLoginButton : classes.loginButton;
  return (
    <Form method="POST" className="flex w-full flex-col px-24">
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
      <input name="form-type" defaultValue="login-form" hidden />

      <div className="mt-2" />
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
      <button
        disabled={isSubmitting}
        type="submit"
        className={submitButtonStyles}
      >
        {isSubmitting ? "Loading..." : "Login"}
      </button>
    </Form>
  );
}
