import "./NotificationMenu.css";
import NotificationItem from "./NotificationItem";

const NotificationMenu = ({ notifications, notificationMenuClasses }) => {
  return (
    <div className={notificationMenuClasses}>
      <div className="notifications-header">
        <strong>Notifications</strong>
        <a to="/" className="new-notification">
          3 New
        </a>
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
        <a>All Notifications</a>
      </div>
    </div>
  );
};

export default NotificationMenu;
