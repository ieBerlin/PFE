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
            <a href="/about" className={classes.headerAnchor}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="/services" className={classes.headerAnchor}>
              Services
            </a>
          </li>
          <li className="nav-item">
            <a href="/portfolio" className={classes.headerAnchor}>
              Portfolio
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact" className={classes.headerAnchor}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <div className={classes.authentication}>
        <Link to="/auth">
          <button>Login</button>
        </Link>
      </div>
    </header>
  );
}
