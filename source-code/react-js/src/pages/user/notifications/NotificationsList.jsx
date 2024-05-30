import { setModalType } from "../../../features/modal/modalSlice";
import { useDispatch } from "react-redux";
import styles from "./AllNotifications.module.css";
import closeIcon from "../../../assets/close-svgrepo-com.svg";
import notificationIcon from "../../../assets/payment-svgrepo-com.svg";

export default function NotificationsList({ notifications }) {
  const dispatch = useDispatch();

  if (!notifications || notifications.length === 0) {
    return (
      <div className="mt-5 bg-white px-6 py-4 shadow-md mx-2 rounde-md">
        <h1 className="text-gray-800 text-center font-semibold text-xl">
          No notifications to display.
        </h1>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2 px-4 py-3 bg-white rounded-md">
      {notifications.map((notification) => {
        const formattedDate = new Date(
          notification.created_at
        ).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        console.log(notification.created_at);
        return (
          <>
            <div className="space-y-5">
              <div
                className="bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 "
                role="alert"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    {/* Icon */}
                    <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800">
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                    </span>
                    {/* End Icon */}
                  </div>
                  <div className="ms-3 ">
                    <>
                      <h3 className="text-gray-800 font-semibold ">
                        {notification?.title}
                      </h3>
                      <p className="text-sm text-gray-700   ">
                        {notification?.message}
                      </p>
                    </>
                  </div>
                </div>
                <div className=" flex w-full justify-end">
                  <h3 className=" text-gray-600 font-semibold text-sm">
                    {formattedDate}
                  </h3>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </ul>
  );
}
