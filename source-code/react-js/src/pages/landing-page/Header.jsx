import imgLogo from "../../assets/logoImage.png";
import classes from "./Header.module.css";
export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={imgLogo} alt="image logo" />
        <h2>GYM</h2>
      </div>
      <nav className={classes.navbar}>
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/about" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="/services" className="nav-link">
              Services
            </a>
          </li>
          <li className="nav-item">
            <a href="/portfolio" className="nav-link">
              Portfolio
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <div className={classes.authentication}>
        <a href="">
          <button>Login</button>
        </a>
        <a href="">
          <button>Sign Up</button>
        </a>
      </div>
    </header>
  );
}
