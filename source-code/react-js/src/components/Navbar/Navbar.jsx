import "./Navbar.css";
import NotificationBell from "./NotificationBell/NotificationBell.jsx";
import avatar from "/kilter.jpg";
import ProfileDropdownMenu from "./ProfileDropdownMenu/ProfileDropDownMenu.jsx";
import { Link } from "react-router-dom";
function Navbar({ width }) {
  const greetingMessage =
    new Date().getHours() > 12 ? "Good evening" : "Good morning";
  return (
    <nav
      className="navbar-container"
      style={{
        width: width,
      }}
    >
      <div className="greeting">
        <h2>{greetingMessage}, User</h2>
        <p>Welcome again</p>
      </div>
      <div className="user-info">
        <NotificationBell />
        <Link to="/profile">
          <img className="user-avatar" src={avatar} alt="User Avatar" />
        </Link>
        <div className="user-name">Username</div>
        <ProfileDropdownMenu />
      </div>
    </nav>
  );
}

export default Navbar;
