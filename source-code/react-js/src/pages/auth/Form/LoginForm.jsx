import classes from "../Login/Login.module.css";
import { Form, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchFun, processLoginForm } from "../../../hooks/http.js";
import ErrorMessage from "../../../components/ErrorMessage.jsx";
import PasswordInput from "../../../components/modal/PasswordInput.jsx";
import Input from "../../../components/Input.jsx"
export default function LoginForm() {
  const navigate = useNavigate();
  const { data, isError, error, mutate, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (userCrendetials) => {
      return await fetchFun({
        url: "http://localhost:8081/user/auth/login",
        options: {
          method: "POST",
          body: JSON.stringify(userCrendetials),
          headers: {
            "x-access-token": "token",
            "Content-Type": "application/json",
          },
        },
      });
    },
  });
  console.log(data);
  useEffect(() => {
    if (data && data.token) {
      localStorage.setItem("user-token", data.token);
      navigate("/dashboard");
    }
  }, [data, navigate]);
  async function handleSubmitForm(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const userCrendetials = processLoginForm(fd);
    mutate(userCrendetials);
  }
  const submitButtonStyles = isPending
    ? classes.submittingLoginButton
    : classes.loginButton;

  return (
    <Form onSubmit={handleSubmitForm} className="flex w-full flex-col px-24">
      {/* <FormInput
        Icon={UserIcon}
        isNotValidInput="Email is not valid"
        isValidInputFun={isValidEmail}
        label="email"
        id="email"
        name="email"
        type="email"
        required
      /> */}
      <Input
        placeholder="Enter Your Email"
        type="email"
        name="email"
      />
      <input name="form-type" defaultValue="login-form" hidden />

      <div className="mt-2" />
      <PasswordInput
        id="password"
        placeholder="Enter Your Password"
        name="password"
        required
      />
      {/* <PasswordFormInput
        id="password"
        name="password"
        isValidInputFun={isValidPassword}
        label="password"
        required
      /> */}
      <div className={classes.rememberMe}>
        {/* <input type="checkbox" name="remember-me" id="remember-me" />
        <p>Remember me</p> */}
      </div>
      <button disabled={isPending} type="submit" className={submitButtonStyles}>
        {isPending ? "Loading..." : "Login"}
      </button>
      {isError &&
        error &&
        Object.entries(error.info).map(([key, value]) => (
          <ErrorMessage key={key} title={key} message={value} />
        ))}
    </Form>
  );
}
