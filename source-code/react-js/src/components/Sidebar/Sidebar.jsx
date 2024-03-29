import "./Sidebar.css";
import menuSvg from "../../assets/menu-svgrepo-com.svg";
import menuAltRight from "../../assets/menu-alt-right-svgrepo-com.svg";
import rocketSvg from "../../assets/rocket-svgrepo-com.svg";
import SidebarNavList from "./SidebarNavList.jsx";
import { useContext } from "react";
import { SidebarContext } from "../store/sidebar-context.jsx";
export default function Sidebar() {
  const { isOpen, onToggleMenu } = useContext(SidebarContext);
  let sideBarClasses = "sidebar";
  if (isOpen) {
    sideBarClasses += " open";
  }
  return (
    <>
      <div className={sideBarClasses}>
        <div className="logo-details">
          <img src={rocketSvg} alt="menu svg" className="icon icon-i" />
          <div className="logo_name">HousesGym</div>
          <div id="btn">
            {!isOpen ? (
              <img
                src={menuSvg}
                className="icon-i"
                alt="menu svg"
                onClick={onToggleMenu}
              />
            ) : (
              <img
                src={menuAltRight}
                className="icon-i"
                alt="menu svg"
                onClick={onToggleMenu}
              />
            )}
          </div>
        </div>
        <SidebarNavList />
      </div>
    </>
  );
}
