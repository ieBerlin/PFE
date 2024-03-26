import "./NavBar.css";
import NotificationBell from "../NotificationBell/NotificationBell";
import avatar from "../../public/kilter.jpg";
import DropdownMenu from "../DropDownMenu/DropDownMenu";
function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="greeting">
        <h2>Good Morning, User</h2>
        <p>Welcome again</p>
      </div>
      <div className="user-info">
        <NotificationBell />
        <img className="user-avatar" src={avatar} alt="User Avatar" />
        <div className="user-name">Username</div>
        <DropdownMenu />
      </div>
    </nav>
  );
}

export default Navbar;
