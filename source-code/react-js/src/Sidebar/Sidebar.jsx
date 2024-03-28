import "./Sidebar.css";
import { useState } from "react";
import menuSvg from "../assets/menu-svgrepo-com.svg";
import menuAltRight from "../assets/menu-alt-right-svgrepo-com.svg";
import searchSvg from "../assets/search-alt-2-svgrepo-com.svg";
import Navbar from "../Navbar/Navbar.jsx";
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
          <img src={menuSvg} alt="menu svg" className="icon icon-i" />
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
        <ul className="nav-list">
          <li>
            <div className="bx bx-search">
              <img src={searchSvg} className="icon-i" alt="" />
            </div>
            <input type="text" placeholder="Search..." />
            <span className="tooltip">Search</span>
          </li>
          <li>
            <a href="">
              <div className="img-container">
                <img src={searchSvg} alt="" />
              </div>
              <span className="links_name">User</span>
            </a>
          </li>
          <li>
            <a href="">
              <div className="img-container">
                <img src={searchSvg} alt="" />
              </div>
              <span className="links_name">User</span>
            </a>
          </li> <li>
            <a href="">
              <div className="img-container">
                <img src={searchSvg} alt="" />
              </div>
              <span className="links_name">User</span>
            </a>
          </li> <li>
            <a href="">
              <div className="img-container">
                <img src={searchSvg} alt="" />
              </div>
              <span className="links_name">User</span>
            </a>
          </li> <li>
            <a href="">
              <div className="img-container">
                <img src={searchSvg} alt="" />
              </div>
              <span className="links_name">User</span>
            </a>
          </li>
        </ul>
      </div>
      <Navbar
        margin={!isMenuBarOpen ? "0px 0px 0px 78px" : "0px 0px 0px 250px"}
      />
    </>
  );
};

export default Sidebar;
