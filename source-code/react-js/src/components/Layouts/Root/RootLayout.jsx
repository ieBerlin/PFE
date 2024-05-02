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
export async function loader() {
  try {
      const data = await fetchUserRole();
      if (data && data.userRole) {
          const userRole = data.userRole;
          console.log(userRole);
          const isValidUser = ["admin", "member", "coach"].includes(userRole);
          if (!isValidUser) {
              throw new Error("Forbidden");
          }
          return userRole;
      } else {
          throw new Error("Forbidden");
      }
  } catch (error) {
      console.error("An error occurred while fetching user role:", error);
      throw error; // Rethrow the error for the caller to handle if needed
  }
}

async function fetchUserRole() {
  const userToken = localStorage.getItem("user-token");
  if (!userToken) {
      return null;
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
          throw new Error("Failed to fetch user role");
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error("An error occurred while fetching user role:", error);
      throw error; // Rethrow the error for the caller to handle if needed
  }
}
