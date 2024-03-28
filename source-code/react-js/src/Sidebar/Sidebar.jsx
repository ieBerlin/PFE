import "./Sidebar.css";
import { useState } from "react";
import menuSvg from "../assets/menu-svgrepo-com.svg";
import menuAltRight from "../assets/menu-alt-right-svgrepo-com.svg";
import searchSvg from "../assets/search-alt-2-svgrepo-com.svg";
import Navbar from "../Navbar/Navbar.jsx";
import rocketSvg from "../assets/rocket-svgrepo-com.svg";
import logoutSvg from "../assets/log-out-svgrepo-com.svg"
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
          </li>{" "}
          <li>
            <a href="">
              <div className="img-container">
                <img src={searchSvg} alt="" />
              </div>
              <span className="links_name">User</span>
            </a>
          </li>{" "}
          <li>
            <a href="">
              <div className="img-container">
                <img src={searchSvg} alt="" />
              </div>
              <span className="links_name">User</span>
            </a>
          </li>{" "}
          <li>
            <a href="">
              <div className="img-container">
                <img src={searchSvg} alt="" />
              </div>
              <span className="links_name">User</span>
            </a>
          </li>
          <div className="profile">
            <div className="profile-details">
            <img src={searchSvg} alt="" />
              <div className="name_job">
                <div className="name">Stella Army</div>
                <div className="job">Web designer</div>
              </div>
            </div>
            <img src={logoutSvg} id="log_out" alt="" />
          </div>
        </ul>
      </div>
      <Navbar
        width={!isMenuBarOpen ? "calc(100% - 78px)" : "calc(100% - 250px)"}
      />
    </>
  );
};

export default Sidebar;
