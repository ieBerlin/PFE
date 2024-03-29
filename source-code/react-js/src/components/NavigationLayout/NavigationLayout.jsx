import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./MainNavigation.css";
export default function MainNavigation() {
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuBarOpen((prevState) => !prevState);
  };

  const MainNavigationPadding = isMenuBarOpen
    ? "100px 0px 0px 250px"
    : "100px 0px 0px 78px";

  return (
    <div
      className="navigation-layout"
      style={{
        padding: MainNavigationPadding,
      }}
    >
      <Sidebar isMenuBarOpen={isMenuBarOpen} onOpen={toggleMenu} />
      <Navbar
        width={!isMenuBarOpen ? "calc(100% - 78px)" : "calc(100% - 250px)"}
      />
    </div>
  );
}
