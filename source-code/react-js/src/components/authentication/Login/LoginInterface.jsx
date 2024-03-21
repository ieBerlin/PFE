import logoImage from "../../../assets/logoImage.png";
import gymImage from "../../../assets/gymImage.jpg";
import LoginForm from "../../form/LoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginInterface() {
  const navigate = useNavigate();
  function handleEnrollNowClick() {
    navigate("/authentication?mode=signup");
  }
  return (
    <div className="main-background">
      <div className="form-wrapper">
        <div className="form-section">
          <header>
            <img src={logoImage} alt="Logo" />
            <div className="sign-up-wrapper">
              <p>New here?</p>
              <button
                type="button"
                className="enroll-now"
                onClick={handleEnrollNowClick}
              >
                Enroll now
              </button>
            </div>
          </header>
          <main>
            <h1>Welcome back</h1>
            <h4>{"Let's get started on your fitness journey."}</h4>
            <LoginForm />
          </main>
        </div>
        <div className="gym-picture">
          <img src={gymImage} alt="Gym" />
        </div>
      </div>
    </div>
  );
}
