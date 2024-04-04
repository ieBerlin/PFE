import isValidEmail from "../../../utils/validation/emailValidation.js";
import isValidPassword from "../../../utils/validation/passwordValidation.js";
import FormInput from "./FormInput.jsx";
import PasswordFormInput from "./PasswordFormInput";
import classes from "../Login/Login.module.css";
export default function LoginForm() {
  function handleFormSubmit(e) {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <FormInput
        isNotValidInput="Email is not valid"
        isValidInputFun={isValidEmail}
        label="email"
        id="email"
        name="email"
        type="email"
        required
      />
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
    </form>
  );
}
