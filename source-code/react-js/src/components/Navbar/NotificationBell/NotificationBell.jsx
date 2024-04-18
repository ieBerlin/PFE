import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./NotificationBell.css";
import { useState, useRef, useEffect } from "react";
import NotificationMenu from "./NotificationMenu/NotificationMenu";

function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [notifications, setNotifications] = useState([
    "dasda",
    "this is Berlin here",
  ]);

  const notificationBellRef = useRef(null);
  const notificationMenuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !notificationBellRef.current.contains(event.target) &&
        !notificationMenuRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleNotifications = () => {
    setShowNotifications((prevState) => !prevState);
  };

  return (
    <div className="notifier red">
      <FontAwesomeIcon
        className="bell"
        onClick={toggleNotifications}
        icon={faBell}
        ref={notificationBellRef}
      />
      <span className="badge">5</span>
      <div ref={notificationMenuRef}>
        <NotificationMenu
        onClose={()=>setShowNotifications(false)}
          notifications={notifications}
          notificationMenuClasses={
            showNotifications ? "notification-menu open" : "notification-menu"
          }
        />
      </div>
    </div>
  );
}

export default NotificationBell;
