import { useDispatch, useSelector } from "react-redux";
import MainNavigation from "../../MainNavigation/MainNavigation";
import { Outlet, json, useLoaderData } from "react-router-dom";
import classes from "./RootLayout.module.css";
import { changeUserRole } from "../../../features/userRole/userRoleSlice";
export default function RootLayout() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const userRole = useLoaderData("root");
  const dispatch = useDispatch();
  dispatch(changeUserRole(userRole));
  let mainContentPadding = "60px 0 0";
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
export function loader() {
  const userRole = localStorage.getItem("user-role") || undefined;
  const isValidUser =
    userRole && ["admin", "member", "coach"].includes(userRole);
  if (!isValidUser) {
    throw json({ message: "Forbidden", status: 403 });
  }
  return userRole;
}
