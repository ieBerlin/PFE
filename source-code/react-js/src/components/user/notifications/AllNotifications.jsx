import classes from "./AllNotifications.module.css";
import closeSvg from "../../../assets/close-svgrepo-com.svg";
import notificationItemSvg from "../../../assets/payment-svgrepo-com.svg";
import { setModalType } from "../../../features/modal/modalSlice";
import { useDispatch } from "react-redux";
const DUMMY_NOTIFICATIONS = [
  {
    id: 1,
    userId: 100,
    message: "Your order has been shipped!",
    created_at: "2024-04-05 10:00:00",
    isRead: 0,
    title: "Order Shipped",
  },
  {
    id: 2,
    userId: 101,
    message:
      "New message from support: Please contact us for further assistance.",
    created_at: "2024-04-05 11:30:00",
    isRead: 1,
    title: "Support Message",
  },
  {
    id: 3,
    userId: 102,
    message: "Reminder: Your subscription will expire soon. Renew now!",
    created_at: "2024-04-05 12:45:00",
    isRead: 0,
    title: "Subscription Expiry",
  },
  {
    id: 4,
    userId: 103,
    message: "You have a new friend request.",
    created_at: "2024-04-05 14:15:00",
    isRead: 0,
    title: "New Friend Request",
  },
  {
    id: 5,
    userId: 104,
    message: "Congratulations! You've earned a new badge.",
    created_at: "2024-04-05 15:30:00",
    isRead: 1,
    title: "New Badge Earned",
  },
  {
    id: 6,
    userId: 105,
    message: "Reminder: Your appointment is scheduled for tomorrow.",
    created_at: "2024-04-06 09:00:00",
    isRead: 0,
    title: "Appointment Reminder",
  },
  {
    id: 7,
    userId: 106,
    message: "There's a sale happening! Don't miss out on our exclusive deals.",
    created_at: "2024-04-06 10:30:00",
    isRead: 0,
    title: "Sale Alert",
  },
  {
    id: 8,
    userId: 107,
    message: "Your article has been published. Check it out!",
    created_at: "2024-04-06 12:00:00",
    isRead: 1,
    title: "Article Published",
  },
  {
    id: 9,
    userId: 108,
    message: "You have a new message from a friend.",
    created_at: "2024-04-06 14:45:00",
    isRead: 0,
    title: "New Message",
  },
  {
    id: 10,
    userId: 109,
    message:
      "Reminder: Don't forget to complete your profile for better recommendations.",
    created_at: "2024-04-06 16:00:00",
    isRead: 0,
    title: "Profile Completion Reminder",
  },
];

export default function AllNotifications() {
  const dispatch = useDispatch();
  return (
    <section className={classes.allNotificationsSection}>
      <h1>All notifications</h1>
      <ul className={classes.notificationList}>
        {DUMMY_NOTIFICATIONS.map((notificationItem) => (
          <li key={notificationItem.id} className={classes.notificationItem}>
            <img
              src={notificationItemSvg}
              alt="Notification"
              className={classes.notificationIcon}
            />
            <div className={classes.notificationItemDetails}>
              <h3>{notificationItem.title}</h3>
              <p>{notificationItem.message}</p>
            </div>
            <div className={classes.actions}>
              <h2>2024-10-21</h2>
              <button
                type="button"
                onClick={() => dispatch(setModalType("delete-notification"))}
              >
                <img src={closeSvg} alt="Close" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
