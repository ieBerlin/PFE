import { Navigate, useSearchParams } from "react-router-dom";
import LoginInterface from "./Login/LoginInterface.jsx";
import SignUpInterface from "./Login/SignUpInterface.jsx";

export default function Authentication() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode");
  if (isLogin && isLogin.toLocaleLowerCase() === "login") {
    return <LoginInterface />;
  }
  if (isLogin && isLogin.toLocaleLowerCase() === "signup") {
    return <SignUpInterface />;
  }

  return <Navigate to={`/authentication?mode=login`} />;
}
