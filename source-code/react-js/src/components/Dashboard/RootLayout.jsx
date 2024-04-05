import { useSelector } from "react-redux";
import MainNavigation from "../MainNavigation/MainNavigation";
import { Outlet } from "react-router-dom";
import classes from "./Dashboard.module.css";
export default function DashboardLayout() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  let mainContentPadding = "70px 0 0";
  if (isOpen) {
    mainContentPadding += " 250px";
  } else {
    mainContentPadding += " 78px";
  }
  return (
    <nav
      className={classes.nav}
      style={{
        padding: mainContentPadding,
      }}
    >
      <MainNavigation />
      <Outlet />
    </nav>
  );
}
