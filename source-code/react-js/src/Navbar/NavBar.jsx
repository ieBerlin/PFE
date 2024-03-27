import "./Navbar.css";
import NotificationBell from "../NotificationBell/NotificationBell.jsx";
import avatar from "../../public/kilter.jpg";
import ProfileDropdownMenu from "../ProfileDropdownMenu/ProfileDropDownMenu.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
function Navbar() {
  return (
    <nav className="navbar-container">
      <Sidebar />
      <div className="greeting">
        <h2>Good Morning, User</h2>
        <p>Welcome again</p>
      </div>
      <div className="user-info">
        <NotificationBell />
        <img className="user-avatar" src={avatar} alt="User Avatar" />
        <div className="user-name">Username</div>
        <ProfileDropdownMenu />
      </div>
    </nav>
  );
}

export default Navbar;
