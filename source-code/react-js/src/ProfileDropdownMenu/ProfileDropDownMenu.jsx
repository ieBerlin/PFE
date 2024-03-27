import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
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
          transition: "transform 0.3s ease", // Apply transition to the transform property
        }}
      />
      {isOpen && (
        <div className="profile-dropdown-menu">
          <div className="profile-dropdown-item"></div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropDownMenu;
