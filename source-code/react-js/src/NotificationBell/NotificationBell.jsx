import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./NotificationBell.css";
import { useState } from "react";
import NotificationMenu from "./NotificationMenu";
// import { useState } from "react";
function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(["dasda","this is Berlin here"]);

  const toggleNotifications = () => {
    setShowNotifications((prevState) => !prevState);
  };
  return (
    <div className="notifier red">
      <FontAwesomeIcon className="bell" onClick={toggleNotifications} icon={faBell} />
      <span className="badge">5</span>
      {showNotifications && (
        <NotificationMenu notifications={notifications} />
      )}
    </div>
  );
}

export default NotificationBell;
