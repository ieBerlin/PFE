import { useDispatch, useSelector } from "react-redux";
import MainNavigation from "../../MainNavigation/MainNavigation";
import { Outlet, json, useLoaderData } from "react-router-dom";
import classes from "./RootLayout.module.css";
import { changeUserRole } from "../../../features/userRole/userRoleSlice";
export default function RootLayout() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const loaderData = useLoaderData("root");

  dispatch(changeUserRole(loaderData));
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
export async function loader() {
  try {
    const data = await fetchUserRole();
    if (data && data.userRole) {
      const userRole = data.userRole;
      const isValidUser = ["admin", "member", "coach"].includes(userRole);
      if (!isValidUser) {
        throw json({ status: 403 });
      }
      return userRole;
    } else {
      throw json({ status: 403 });
    }
  } catch (error) {
    throw json({ status: 403 });
  }
}

async function fetchUserRole() {
  const userToken = localStorage.getItem("user-token");
  if (!userToken) {
    throw json({ status: 403 });
  }

  try {
    const response = await fetch("http://localhost:8081/user/auth/user-role", {
      method: "POST",
      body: JSON.stringify({ token: userToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw json({ status: 403 });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw json({ status: 403 });
  }
}
