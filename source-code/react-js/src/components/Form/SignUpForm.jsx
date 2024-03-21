import { Form } from "react-router-dom";
import isValidEmail from "../../utils/validation/emailValidation";
import isValidName from "../../utils/validation/nameValidation";
import isValidUsername from "../../utils/validation/usernameValidation";
import isValidPassword from "../../utils/validation/passwordValidation";
import FormInput from "./FormInput";
import PasswordFormInput from "./PasswordFormInput";

export default function SignUpForm() {
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(e.target);
    const fd = new FormData(e.target);
    console.log(Object.fromEntries(fd.entries()));
  }
  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <FormInput
          isNotValidInput="Email is not valid"
          isValidInputFun={isValidEmail}
          label="email"
          type="email"
          id="email"
          name="email"
          required
        />{" "}
        <FormInput
          isNotValidInput="Username is not valid"
          isValidInputFun={isValidUsername}
          label="Username"
          type="name"
          id="username"
          name="username"
          required
        />
        <FormInput
          isNotValidInput="First name is not valid"
          isValidInputFun={isValidName}
          label="First Name"
          type="name"
          id="first-name"
          name="first-name"
          required
        />
        <FormInput
          isNotValidInput="Last name is not valid"
          isValidInputFun={isValidName}
          label="Last Name"
          type="name"
          id="last-name"
          name="last-name"
          required
        />
        <PasswordFormInput
          id="password"
          name="password"
          isValidInputFun={isValidPassword}
          label="password"
          required
        />
        <PasswordFormInput
          isValidInputFun={isValidPassword}
          label="Confirm Password"
          required
        />
        <button type="submit" className="login-button">
          Sign Up
        </button>
      </Form>
    </>
  );
}
