import { json, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NotificationBell from "./NotificationBell/NotificationBell.jsx";
import ProfileDropdownMenu from "./ProfileDropdownMenu/ProfileDropDownMenu.jsx";
import { fetchFun, getToken } from "../../hooks/http.js";

import "./Navbar.css";
import avatar from "/kilter.jpg";

function Navbar({ width }) {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserCredentials,
  });
  const greetingMessage =
    new Date().getHours() > 12 ? "Good Evening" : "Good Morning";
  return (
    <nav className="navbar-container" style={{ width: width }}>
      <div className="greeting">
        <h2 className="inline-block">
          {greetingMessage + " "}
          <span className="text-gray-800 inline-block font-semibold capitalize">
            {data?.first_name ?? "user"}
          </span>
        </h2>
      </div>

      <div className="user-info">
        <NotificationBell />
        <Link to="/profile">
          <img className="user-avatar" src={avatar} alt="User Avatar" />
        </Link>
        <div className="user-name text-gray-800 ">
          {data?.username ?? "user"}
        </div>
        <ProfileDropdownMenu />
      </div>
    </nav>
  );
}

export default Navbar;

async function fetchUserCredentials() {
  return await fetchFun({
    url: "http://localhost:8081/user/auth/user-basic-informations",
    options: {
      method: "GET",
      headers: {
        "x-access-token": getToken(),
      },
    },
  });
}
