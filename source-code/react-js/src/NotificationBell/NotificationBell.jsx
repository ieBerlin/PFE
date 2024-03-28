import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./NotificationBell.css";
import { useState } from "react";
import NotificationMenu from "./NotificationMenu";
// import { useState } from "react";
function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    "dasda",
    "this is Berlin here",
  ]);
  let notificationMenuClasses = "notification-menu";
  if(showNotifications){
    notificationMenuClasses+=' open'
  }
  const toggleNotifications = () => {
    setShowNotifications((prevState) => !prevState);
  };
  return (
    <div className="notifier red">
      <FontAwesomeIcon
        className="bell"
        onClick={toggleNotifications}
        icon={faBell}
      />
      <span className="badge">5</span>
      <NotificationMenu
        notifications={notifications}
        notificationMenuClasses={notificationMenuClasses}
      />
    </div>
  );
}

export default NotificationBell;
