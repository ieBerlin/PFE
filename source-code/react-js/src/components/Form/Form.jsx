import isValidEmail from "../../utils/validation/emailValidation";
import isValidPassword from "../../utils/validation/passwordValidation";
import FormInput from "./FormInput";
import PasswordFormInput from "./PasswordFormInput";

export default function Form() {
  function handleFormSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <FormInput isNotValidInput="Email is not valid" isValidInputFun={isValidEmail} label="email" type="email" required />
        <PasswordFormInput isValidInputFun={isValidPassword} label="password" required />
        <div className="remember-me">
          <input type="checkbox" name="remember-me" id="remember-me" />
          <p>Remember me</p>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </>
  );
}
