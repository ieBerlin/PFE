import logoImage from "../../../assets/logoImage.png";
import gymImage from "../../../assets/gymImage.jpg";
import SignUpForm from "../../form/SignUpForm";
import { useNavigate } from "react-router-dom";

export default function SignUpInterface() {
  const navigate = useNavigate();
  function handleEnrollNowClick() {
    navigate("/authentication?mode=login");
  }
  return (
    <div className="main-background">
      <div className="form-wrapper">
        <div className="form-section">
          <header>
            <img src={logoImage} alt="Logo" />
            <div className="sign-up-wrapper">
              <p>Already have an account?</p>
              <button
                type="button"
                className="enroll-now"
                onClick={handleEnrollNowClick}
              >
                Login
              </button>
            </div>
          </header>
          <main>
            <h1>Register</h1>
            <h4>{"Hello there! Ready to join us?"}</h4>
            <SignUpForm />
          </main>
        </div>
        <div className="gym-picture">
          <img src={gymImage} alt="Gym" />
        </div>
      </div>
    </div>
  );
}
