import logoImage from "../../../assets/logoImage.png";
import LoginForm from "../Form/LoginForm";
import gymImage from "../../../assets/gymImage.jpg";
import classes from "./Login.module.css";
import { json, Link } from "react-router-dom";
import { setModalType } from "../../../features/modal/modalSlice.js";
import Modal from "../../../components/modal/Modal.jsx";
import { useDispatch } from "react-redux";
export default function LoginPage() {
  const dispatch = useDispatch();
  function handleEnrollNowClick() {
    dispatch(setModalType("create-user"));
  }

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
      case "sign-up-form":
        return processSignUpForm(data);
      case "login-form":
        return processLoginForm(data);
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

function processSignUpForm(formData) {
  const fd = Object.fromEntries(formData.entries());
  return {
    email: fd.email,
    password: fd.password,
    confirmPassword: fd["confirm-password"],
    username: fd.username,
    phoneNumber: fd["phone-number"],
    dateOfBirth: fd["birthday-date"],
    firstName: fd["first-name"],
    lastName: fd["last-name"],
    address: fd.address,
    gender: fd.gender,
    role: fd["user-role"],
  };
}

function processLoginForm(formData) {
  const fd = Object.fromEntries(formData.entries());
  return {
    email: fd.email,
    password: fd.password,
  };
}
