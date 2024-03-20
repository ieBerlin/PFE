import logoImage from "../../../assets/logoImage.png";
import gymImage from "../../../assets/gymImage.jpg";
import LoginForm from "../../Form/LoginForm";

export default function LoginInterface() {
  return (
    <div className="main-background">
      <div className="form-wrapper">
        <div className="form-section">
          <header>
            <img src={logoImage} alt="Logo" />
            <div className="sign-up-wrapper">
              <p>New here?</p>
              <button type="button" className="enroll-now">
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
