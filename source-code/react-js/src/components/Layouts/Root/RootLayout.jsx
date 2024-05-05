import { useDispatch, useSelector } from "react-redux";
import { json, Outlet, useLoaderData } from "react-router-dom";
import MainNavigation from "../../MainNavigation/MainNavigation";
import { changeUserRole } from "../../../features/userRole/userRoleSlice";
import classes from "./RootLayout.module.css";
import { useEffect } from "react";
import { fetchFunction } from "../../../hooks/http";

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
  if (loaderData && loaderData.status === 403) {
    return;
  }
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
  const data = await fetchUserRole();

  if (
    !data ||
    !data.userRole ||
    !["admin", "member", "coach"].includes(data.userRole)
  ) {
    return json({ status: 403 });
  }

  return data.userRole;
}

async function fetchUserRole() {
  const token = localStorage.getItem("user-token");

  if (!token) {
    return json({ status: 403 });
  }

  try {
    const response = await fetchFunction({
      url: "http://localhost:8081/user/auth/user-role",
      options: {
        method: "POST",
        headers: {
          "x-access-token": token,
        },
      },
    });

    if (!response.status > 399) {
      return json({ status: response.status });
    }
    return response.data
  } catch (error) {
    console.error("Error fetching user role:", error.message);
    return json({ status: 403 });
  }
}
