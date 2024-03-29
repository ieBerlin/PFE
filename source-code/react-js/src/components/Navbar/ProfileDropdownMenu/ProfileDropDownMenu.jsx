import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import logoutSvg from "../../../assets/logout-svgrepo-com-black.svg";
import userAvatar from "/kilter.jpg";
import "./ProfileDropDownMenu.css";
function ProfileDropDownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="dropdown-menu">
      <FontAwesomeIcon
        className="angle-down"
        icon={faAngleDown}
        onClick={toggleMenu}
        style={{
          transform: `rotate(${isOpen ? 0 : 90}deg)`,
          transition: "transform 0.3s ease",
        }}
      />
      {isOpen && (
        <div className="profile-dropdown-menu">
          <div className="profile-details">
            <img
              src={userAvatar}
              className="user-avatar-dropdown-menu"
              alt="user avatar"
            />
            <div className="profile-name-email">
              <p>Annette Black</p>
              <span>annette@example.com</span>
            </div>
          </div>
          <hr />
          <ul>
            <li>
              <img src={logoutSvg} alt="" />
              <p>Sign out</p>
            </li>
            <li>
              <img src={logoutSvg} alt="" />
              <p>Sign out</p>
            </li>
            <li>
              <img src={logoutSvg} alt="" />
              <p>Sign out</p>
            </li>
          </ul>

          <div className="logout">
            <hr />
            <div className="logout-wrapper">
              <img src={logoutSvg} alt="" />
              <p>Sign out</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropDownMenu;
