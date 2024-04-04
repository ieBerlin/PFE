import { Link } from "react-router-dom";
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
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </header>
  );
}
