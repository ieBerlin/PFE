import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLoaderData } from "react-router-dom";
import MainNavigation from "../../MainNavigation/MainNavigation";
import classes from "./RootLayout.module.css";
import { fetchFun } from "../../../hooks/http";
import { changeUserRole } from "../../../features/userRole/userRoleSlice";

export default function RootLayout() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const loaderData = useLoaderData("root");
  if (!loaderData || loaderData.unauthenticatezUser || !loaderData.userRole) {
    throw { status: 403 };
  }
  dispatch(changeUserRole(loaderData.userRole));
  const mainContentPadding = `50px 0 0 ${isOpen ? "250px" : "78px"}`;

  return (
    <nav className={classes.nav} style={{ padding: mainContentPadding }}>
      <MainNavigation />
      <Outlet />
    </nav>
  );
}

export async function loader() {
  const token = localStorage.getItem("user-token");

  if (!token) {
    return { unauthenticatezUser: true };
  }

  try {
    const data = await fetchFun({
      url: "http://localhost:8081/user/auth/user-role",
      options: {
        method: "POST",
        headers: {
          "x-access-token": token,
        },
      },
    });
    return data;
  } catch (error) {
    return { unauthenticatezUser: true };
  }
}
