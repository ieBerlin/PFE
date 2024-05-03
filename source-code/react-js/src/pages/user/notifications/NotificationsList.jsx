import { setModalType } from "../../../features/modal/modalSlice";
import { useDispatch } from "react-redux";
import styles from "./AllNotifications.module.css";
import closeIcon from "../../../assets/close-svgrepo-com.svg";
import notificationIcon from "../../../assets/payment-svgrepo-com.svg";

export default function NotificationsList({ notifications }) {
  const dispatch = useDispatch();

  if (!notifications || notifications.length === 0) {
    return <h1 className="text-gray-900 font-semibold text-xl text-center">No notifications to display.</h1>;
  }

  return (
    <ul className={styles.notificationList}>
      {notifications.map((notification) => {
        const formattedDate = new Date(notification.created_at).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        return (
          <li key={notification.id} className={styles.notificationItem}>
            <img
              src={notificationIcon}
              alt="Notification Icon"
              className={styles.notificationIcon}
            />
            <div className={styles.notificationDetails}>
              <h3>{notification.title}</h3>
              <p className={`${styles.notificationDescription} text-nowrap text-ellipsis`}>
                {notification.description}
              </p>
            </div>
            <div className={styles.actions}>
              <h2>{formattedDate}</h2>
              <button
                type="button"
                onClick={() => dispatch && dispatch(setModalType("delete-notification"))}
              >
                <img src={closeIcon} alt="Close Icon" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
