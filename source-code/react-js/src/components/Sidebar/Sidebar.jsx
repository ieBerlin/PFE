import "./Sidebar.css";
import SidebarNavList from "./SidebarNavList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../features/sidebar/sidebarSlice.js";
import {
  AcademicCapIcon,
  Bars3Icon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { setModalType } from "../../features/modal/modalSlice.js";
export default function Sidebar() {
  const isOpen = useSelector((state) => state?.sidebar?.isOpen);
  const isMemberOrCoach = useSelector((state) => {
    const userRole = state?.userRole?.userRole?.toLowerCase();
    return ["member", "coach"].some((role) => userRole === role);
  });
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
            <AcademicCapIcon className="text-gray-900 w-8 h-8" />
            <div className="logo_name">Powerhouse</div>
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
        {isMemberOrCoach && (
          <div className="flex justify-center w-full">
            <button
              onClick={() => dispatch(setModalType("send-message-to-admin"))}
            >
              <PlusIcon className="bg-red-100 text-red-500 w-8 h-8 p-2 rounded-full" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
