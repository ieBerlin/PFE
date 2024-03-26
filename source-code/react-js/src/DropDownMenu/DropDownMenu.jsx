import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./DropDownMenu.css"
function DropdownMenu() {
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
          transform: `rotate(${isOpen ? -180 : 0}deg)`,
          transition: "transform 0.3s ease", // Apply transition to the transform property
        }}
      />
    </div>
  );
}

export default DropdownMenu;
