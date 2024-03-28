import "./Sidebar.css";
import { useState } from "react";
import menuSvg from "../../assets/menu-svgrepo-com.svg";
import menuAltRight from "../../assets/menu-alt-right-svgrepo-com.svg";
import Navbar from "../Navbar/Navbar.jsx";
import rocketSvg from "../../assets/rocket-svgrepo-com.svg";
import SidebarNavList from "./SidebarNavList.jsx";
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
    <>
      <div className={sideBarClasses}>
        <div className="logo-details">
          <img src={rocketSvg} alt="menu svg" className="icon icon-i" />
          <div className="logo_name">HousesGym</div>
          <div id="btn">
            {!isMenuBarOpen ? (
              <img
                src={menuSvg}
                className="icon-i"
                alt="menu svg"
                onClick={toggleMenu}
              />
            ) : (
              <img
                src={menuAltRight}
                className="icon-i"
                alt="menu svg"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
        <SidebarNavList />
      </div>
      <Navbar
        width={!isMenuBarOpen ? "calc(100% - 78px)" : "calc(100% - 250px)"}
      />
    </>
  );
};

export default Sidebar;
