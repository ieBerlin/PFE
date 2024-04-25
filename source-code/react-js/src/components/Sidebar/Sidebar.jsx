import "./Sidebar.css";
import SidebarNavList from "./SidebarNavList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../features/sidebar/sidebarSlice.js";
import { AcademicCapIcon, Bars3Icon } from "@heroicons/react/24/solid";
export default function Sidebar() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  let sideBarClasses = "sidebar shadow-xl";
  if (isOpen) {
    sideBarClasses += " open";
  }
  return (
    <>
      <div className={sideBarClasses}>
        <div className="logo-details">
          <a href="/" className="go-to-home-page">
            <AcademicCapIcon className="text-gray-600 w-8 h-8" />
            <div className="logo_name">HousesGym</div>
          </a>
          <div id="btn">
            {!isOpen ? (
              <button
                onClick={() => dispatch(toggleMenu())}
                className=" flex w-full items-center justify-center"
              >
                <Bars3Icon className="text-gray-600 w-8 h-8" />
              </button>
            ) : (
              <button
                onClick={() => dispatch(toggleMenu())}
                className=" flex w-full items-center justify-center"
              >
                <Bars3Icon className="text-gray-600 w-8 h-8" />
              </button>
            )}
          </div>
        </div>
        <SidebarNavList />
      </div>
    </>
  );
}
