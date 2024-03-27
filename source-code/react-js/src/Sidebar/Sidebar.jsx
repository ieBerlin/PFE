import "./Sidebar.css";
import { useState } from "react";
import menuSvg from "../assets/menu-svgrepo-com.svg";
const Sidebar = () => {
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(true);
  const toggleMenu = () => {
    setIsMenuBarOpen((prevState) => !prevState);
  };
  let sideBarClasses = "sidebar";
  if (isMenuBarOpen) {
    sideBarClasses += " open";
  }
  return (
    <div className={sideBarClasses}>
      <div className="logo-details">
        <img src={menuSvg} alt="menu svg" className="icon icon-i" />
        <div className="logo_name">HousesGym</div>
        <div id="btn">
          <img src={menuSvg} alt="menu svg" onClick={toggleMenu} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
