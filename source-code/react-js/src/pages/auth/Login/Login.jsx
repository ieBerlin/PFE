import logoImage from "../../../assets/logoImage.png";
import LoginForm from "../Form/LoginForm";
import gymImage from "../../../assets/gymImage.jpg";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
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
  // const data = await request.formData();
  // const formType = data.get("form-type");
  // console.log("formType : " + formType);
  // const formData = {
  //   email: data.get("email"),
  //   password: data.get("password"),
  // };
  // // console.log(formData);
 await timeoutPromise();
  return null;
}

async function timeoutPromise() {
  return new Promise((resolve) => setTimeout(() => {
    resolve('Hello World');
  }, 5000));
}