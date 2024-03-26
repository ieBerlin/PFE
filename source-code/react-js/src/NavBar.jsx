import "./NavBar.css";
import NotificationIcon from "./NotificationIcon";
import avatar from "../public/kilter.jpg";
import DropdownMenu from "./DropDownMenu";
function Navbar() {
  return (
    <div className="navbar-container">
      <div className="greeting">
        <h2>
          Good Morning, User
        </h2>
        <p>Welcome again</p>
      </div>
      <div className="user-info">
        <NotificationIcon className="notification-bell" />
        <img className="user-avatar" src={avatar} alt="User Avatar" />
        <div className="user-name">Username</div>
        <DropdownMenu />
      </div>
    </div>
  );
}

export default Navbar;

{
  /* <div className="dropdown-menu"> */
  /* <div className="dropdown-menu-item">Profile</div>
          <div className="dropdown-menu-item">Settings</div>
          <div className="dropdown-menu-item">Logout</div> */
  /* </div> */
}
