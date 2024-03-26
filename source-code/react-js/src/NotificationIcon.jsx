// import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function NotificationIcon({...props}) {
  //   const [showNotification, setShowNotification] = useState(false);

  //   const handleClick = () => {
  //     // Toggle the state to show or hide the notification
  //     setShowNotification(!showNotification);
  //   };

  return (
    <div className="notification-icon-container">
      <FontAwesomeIcon {...props}
        icon={faBell}
        //   onClick={handleClick}
      />
      {/* {showNotification && (
        <div className="notification">You have a new notification!</div>
      )} */}
    </div>
  );
}

export default NotificationIcon;
