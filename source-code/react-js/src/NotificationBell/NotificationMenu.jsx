import { Link } from "react-router-dom";
import "./NotificationMenu.css";

const NotificationMenu = ({ notifications ,notificationMenuClasses}) => {
  return (
    <div className={notificationMenuClasses}>
      <div className="notifications-header">
       <strong>Notifications</strong>
        <a to="/">See All</a>
      </div>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <div className="notification-item-info">
              <div className="title"><p>Delivery successful to Tool</p></div>
              <div className="description"><p>Order #9534 has been placed.</p></div>
            </div>
            <span className="duration">5 min</span>
          </div>
        ))
      ) : (
        <div className="no-notification">No new notifications</div>
      )}
      <div className="all-notifications">
        <a>All Notifications</a>
      </div>
    </div>
  );
};

export default NotificationMenu;
