import logoImage from "../../../assets/logoImage.png";
import LoginForm from "../Form/LoginForm";
import gymImage from "../../../assets/gymImage.jpg";
import classes from "./Login.module.css";
import {
  defer,
  json,
  Link,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { setModalType } from "../../../features/modal/modalSlice.js";
import Modal from "../../../components/modal/Modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getToken, isAuthenticatedUser } from "../../../hooks/http.js";
import { useEffect } from "react";

export default function LoginPage() {
  const isAdmin = useSelector(
    (state) => state.userRole?.userRole?.toLowerCase() === "admin"
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticatedUser = useRouteLoaderData("login-id");

  function handleEnrollNowClick() {
    dispatch(setModalType("create-user"));
  }
  useEffect(() => {
    if (isAuthenticatedUser) {
      return navigate(isAdmin ? "/dashboard" : "/overview");
    }
  }, [isAdmin, isAuthenticatedUser, navigate]);
  return (
    <>
      <Modal />
      <div className={classes.mainBackground}>
        <div className={classes.formWrapper}>
          <div className={classes.formSection}>
            <section className={classes.signUpSection}>
              <Link to="/">
                <img src={logoImage} alt="Logo" />
              </Link>
              <div className={classes.signUpWrapper}>
                <p className=" font-semibold">New here?</p>
                <button
                  className={classes.enrollNow}
                  onClick={handleEnrollNowClick}
                >
                  Enroll now
                </button>
              </div>
            </section>
            <section className={classes.mainSection}>
              <h1>Welcome back</h1>
              <h4>{"Let's get started on your fitness journey."}</h4>
              <LoginForm />
            </section>
          </div>
          <div className={classes.gymPicture}>
            <img src={gymImage} alt="Gym" />
          </div>
        </div>
      </div>
    </>
  );
}
export async function action({ request }) {
  try {
    const data = await request.formData();
    const mode = data.get("form-type");

    if (!mode) {
      throw new Error("Form type not provided.");
    }
    switch (mode) {
      case "sign-up-form": {
        const password = data.get("password");
        const confirmPassword = data.get(["confirm-password"]);
        if (password !== confirmPassword) {
          const errors = { password: "Passwords do not match." };
          throw errors;
        }

        return;
      }
      case "login-form":
        try {
          const response = await fetch(
            "http://localhost:8081/user/auth/login",
            {
              method: "POST",
              body: JSON.stringify(await processLoginForm(data)),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            return json({
              status: response.status,
              success: false,
              message: response.message || "Error occured",
            });
          }

          const responseData = await response.json();
          localStorage.setItem("user-token", responseData.token);
          return json({ status: 200, success: true });
        } catch (error) {
          console.error("An error occurred during login:", error.message);
          return json({ status: 500, success: false });
        }
      default:
        throw new Error("Unrecognized form type.");
    }
  } catch (error) {
    console.error("Error processing form data:", error.message);
    throw json({
      status: 400,
      message: error.message || "Bad Request",
    });
  }
}

function processLoginForm(formData) {
  const fd = Object.fromEntries(formData.entries());
  return {
    email: fd.email,
    password: fd.password,
  };
}
export async function loader() {
  try {
    const data = await isAuthenticatedUser(getToken())
    return data || false;
  } catch (error) {
    return false;
  }
}
