import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./NotificationBell.css";
// import { useState } from "react";
function NotificationBell() {
  // const [showNotifications, setShowNotifications] = useState(false);
  // const [notifications, setNotifications] = useState(["dasda"]);

  // const toggleNotifications = () => {
  //   setShowNotifications((prevState) => !prevState);
  // };
  return (
    <div className="notifier red">
      <FontAwesomeIcon className="bell" icon={faBell} />
      <span className="badge">5</span>
    </div>
  );
}

export default NotificationBell;
