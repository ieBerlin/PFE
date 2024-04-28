import { setModalType } from "../../../features/modal/modalSlice";
import classes from "./AllNotifications.module.css";
import closeSvg from "../../../assets/close-svgrepo-com.svg";
import notificationItemSvg from "../../../assets/payment-svgrepo-com.svg";
import { useDispatch } from "react-redux";
import IBasePlugin from "@preline/remove-element";
export default function NotificationsList({ data }) {
  const dispatch = useDispatch();
  return (
    <ul className={classes.notificationList}>
      <IBasePlugin />
      {/* {data.map((notificationItem) => (
        <li key={notificationItem.id} className={classes.notificationItem}>
          <img
            src={notificationItemSvg}
            alt="Notification"
            className={classes.notificationIcon}
          />
          <div className={classes.notificationItemDetails}>
            <h3>{notificationItem.title}</h3>
            <p className=" text-nowrap text-ellipsis">
              {notificationItem.description}
            </p>
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
      ))} */}
    </ul>
  );
}
