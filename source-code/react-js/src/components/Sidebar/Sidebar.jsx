import "./Sidebar.css"
import menuSvg from "../../assets/menu-svgrepo-com.svg";
import menuAltRight from "../../assets/menu-alt-right-svgrepo-com.svg";
import rocketSvg from "../../assets/rocket-svgrepo-com.svg";
import SidebarNavList from "./SidebarNavList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../features/sidebar/sidebarSlice.js";
export default function Sidebar() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
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
                onClick={() => dispatch(toggleMenu())}
              />
            ) : (
              <img
                src={menuAltRight}
                className="icon-i"
                alt="menu svg"
                onClick={() => dispatch(toggleMenu())}
              />
            )}
          </div>
        </div>
        <SidebarNavList />
      </div>
    </>
  );
}
