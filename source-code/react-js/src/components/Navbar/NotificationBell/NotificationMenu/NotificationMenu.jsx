import "./NotificationMenu.css";
import NotificationItem from "./NotificationItem";
import { Link } from "react-router-dom";

const NotificationMenu = ({
  notifications,
  notificationMenuClasses,
  onClose,
}) => {
  return (
    <div className={notificationMenuClasses}>
      <div className="notifications-header">
        <h1>Notifications</h1>
        <p className="new-notification">3 New</p>
      </div>
      {notifications && notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            title="Delivery successful to Tool"
            description="Order #9534 has been placed."
            duration="9 min"
          />
        ))
      ) : (
        <div className="no-notification">No new notifications</div>
      )}
      <div className="all-notifications">
        <Link to="/user/all-notifications" onClick={onClose}>
          All Notifications
        </Link>
      </div>
    </div>
  );
};

export default NotificationMenu;
