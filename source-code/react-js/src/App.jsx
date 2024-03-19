import gymImage from "./assets/gymImage.jpg";
import logoImage from "./assets/logoImage.png";
import Form from "./components/form";
export default function App() {
  return (
    <>
      <div className="main-background">
        <div className="form-wrapper">
          <div className="form-section">
            <header>
              <img src={logoImage} alt="logo image" />
              <div className="sign-up-wrapper">
                <p>Are new here?</p>
                <button type="button" className="enroll-now">
                  Enroll now
                </button>
              </div>
            </header>
            <main>
              <h1>Welcome back</h1>
              <h4>{"Let's get started on your fitness journey."}</h4>
              <Form />
              <div className="remember-me">
                <input type="checkbox" name="" id="" />
                <p>Remember me</p>
              </div>
              <button type="button" className="login-button">
                Login
              </button>
            </main>
          </div>
          <div className="gym-picture">
            <img src={gymImage} alt="gym-image" />
          </div>
        </div>
      </div>
    </>
  );
}
