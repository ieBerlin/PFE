import { Link } from "react-router-dom";
import imgLogo from "../../assets/logoImage.png";
import classes from "./Header.module.css";
import { HomeIcon } from "@heroicons/react/24/solid";
export default function Header() {
  const userRole = localStorage.getItem("user-role") || undefined;
  const isValidUser =
    userRole && ["admin", "member", "coach"].includes(userRole);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={imgLogo} alt="image logo" />
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
            <a href="/contact" className={classes.headerAnchor}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <div className={classes.authentication}>
        {!isValidUser ? (
          <Link to="/auth">
            <button>Login</button>
          </Link>
        ) : (
          <a href="/dashboard">
            <HomeIcon className="text-white w-7 h-7" />
          </a>
        )}
      </div>
    </header>
  );
}
