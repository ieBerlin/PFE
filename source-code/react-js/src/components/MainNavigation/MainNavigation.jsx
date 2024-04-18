import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./MainNavigation.css";
import { useSelector } from "react-redux";
export default function MainNavigation() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  return (
    <>
      <Sidebar isMenuBarOpen={isOpen} onOpen={isOpen} />
      <Navbar width={!isOpen ? "calc(100% - 78px)" : "calc(100% - 250px)"} />
    </>
  );
}
