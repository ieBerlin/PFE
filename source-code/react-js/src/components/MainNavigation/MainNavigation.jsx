import { useContext } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./MainNavigation.css";
import { SidebarContext } from "../store/sidebar-context";
export default function MainNavigation() {
  // const [isMenuBarOpen, setIsMenuBarOpen] = useState(true);

  // const toggleMenu = () => {
  //   setIsMenuBarOpen((prevState) => !prevState);
  // };
  const { isOpen } = useContext(SidebarContext);
  return (
    <>
      <Sidebar isMenuBarOpen={isOpen} onOpen={isOpen} />
      <Navbar
        width={!isOpen ? "calc(100% - 78px)" : "calc(100% - 250px)"}
      />
    </>
  );
}
