import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLoaderData } from "react-router-dom";
import MainNavigation from "../../MainNavigation/MainNavigation";
import { changeUserRole } from "../../../features/userRole/userRoleSlice";
import classes from "./RootLayout.module.css";
import { useEffect } from "react";

export default function RootLayout() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const loaderData = useLoaderData("root");

  // Dispatch action to change user role once loader data is available
  useEffect(() => {
    if (loaderData) {
      dispatch(changeUserRole(loaderData));
    }
  }, [loaderData, dispatch]);

  // Calculate main content padding based on sidebar open/closed state
  const mainContentPadding = `60px 0 0 ${isOpen ? "250px" : "78px"}`;

  return (
    <nav className={classes.nav} style={{ padding: mainContentPadding }}>
      <MainNavigation />
      <Outlet />
    </nav>
  );
}

export async function loader() {
  try {
    const data = await fetchUserRole();

    if (!data || !data.userRole || !["admin", "member", "coach"].includes(data.userRole)) {
      throw new Error("Invalid user role");
    }

    return data.userRole;
  } catch (error) {
    console.error("Error fetching user role:", error.message);
    throw new Error("Unauthorized");
  }
}

async function fetchUserRole() {
  const token = localStorage.getItem("user-token");

  if (!token) {
    throw new Error("User token not found");
  }

  try {
    const response = await fetch("http://localhost:8081/user/auth/user-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user role");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching user role:", error.message);
    throw new Error("Failed to fetch user role");
  }
}
