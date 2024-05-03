import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NotificationBell from "./NotificationBell/NotificationBell.jsx";
import ProfileDropdownMenu from "./ProfileDropdownMenu/ProfileDropDownMenu.jsx";
import { getToken } from "../../hooks/http.js";

import "./Navbar.css";
import avatar from "/kilter.jpg";

const token = getToken();

function Navbar({ width }) {
  const { data, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserCredentials(),
  });
console.log(data)
  const greetingMessage =
    new Date().getHours() > 12 ? "Good evening" : "Good morning";
  return (
    <nav className="navbar-container" style={{ width: width }}>
      <div className="greeting">
        <h2>
          {greetingMessage}
          {data && data.first_name && `, ${data.first_name}`}
        </h2>
        <p>Welcome again</p>
      </div>
      <div className="user-info">
        <NotificationBell />
        <Link to="/profile">
          <img className="user-avatar" src={avatar} alt="User Avatar" />
        </Link>
        <div className="user-name">{data && data.username}</div>
        <ProfileDropdownMenu />
      </div>
    </nav>
  );
}

export default Navbar;

async function fetchUserCredentials() {
  try {
    const response = await fetch(
      "http://localhost:8081/user/auth/user-basic-informations",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Couldn't fetch user credentials.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user credentials:", error.message);
    throw error;
  }
}
