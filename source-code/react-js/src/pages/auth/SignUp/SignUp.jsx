import logoImage from "../../../assets/logoImage.png";
import gymImage from "../../../assets/gymImage.jpg";
import loginClasses from "../Login/Login.module.css";
// import SignUpForm from "../Form/SignUpForm.jsx";
import { Link } from "react-router-dom";
export default function SignUpPage() {
  function handleEnrollNowClick() {}
  return (
    <div className={loginClasses.mainBackground}>
      <div className={loginClasses.formWrapper}>
        <div className={loginClasses.formSection}>
          <section className={loginClasses.signUpSection}>
            <Link to="/">
              <img src={logoImage} alt="Logo" />
            </Link>
            <div className={loginClasses.signUpWrapper}>
              <p>Already have an account?</p>
              <Link
                to="/login"
                className={loginClasses.enrollNow}
                onClick={handleEnrollNowClick}
              >
                Login
              </Link>
            </div>
          </section>
          <section className={loginClasses.mainSection}>
            <h1>Register</h1>
            <h4>{"Hello there! Ready to join us?"}</h4>
            {/* <SignUpForm /> */}
          </section>
        </div>
        <div className={loginClasses.gymPicture}>
          <img src={gymImage} alt="Gym" />
        </div>
      </div>
    </div>
  );
}
