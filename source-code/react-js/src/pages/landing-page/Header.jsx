import { Link } from "react-router-dom";
import imgLogo from "../../assets/logoImage.png";
import classes from "./Header.module.css";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
export default function Header({ isValidLogin }) {
  const isAdmin = useSelector(
    (state) => state?.userRole?.userRole?.toLowerCase() === "admin"
  );
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={imgLogo} alt="image logo" />
      </div>
      
      <div className={classes.authentication}>
        {!isValidLogin ? (
          <Link to="/auth">
            <button>Login</button>
          </Link>
        ) : (
          <a href={isAdmin ? "/dashboard" : "/overview"}>
            <HomeIcon className="text-white w-7 h-7" />
          </a>
        )}
      </div>
    </header>
  );
}
