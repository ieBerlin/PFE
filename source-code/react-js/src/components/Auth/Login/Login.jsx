import logoImage from "../../../assets/logoImage.png";
import LoginForm from "../Form/LoginForm";
import gymImage from "../../../assets/gymImage.jpg";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
export default function LoginPage() {
  function handleEnrollNowClick() {}

  return (
    <div className={classes.mainBackground}>
      <div className={classes.formWrapper}>
        <div className={classes.formSection}>
          <section className={classes.signUpSection}>
            <img src={logoImage} alt="Logo" />
            <div className={classes.signUpWrapper}>
              <p>New here?</p>
              <Link
                to="/signup"
                className={classes.enrollNow}
                onClick={handleEnrollNowClick}
              >
                Enroll now
              </Link>
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
  );
}
