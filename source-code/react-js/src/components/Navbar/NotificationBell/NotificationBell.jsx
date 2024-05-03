import "./NotificationBell.css";
import "./NotificationMenu.css";
import { useState, useRef, useEffect, Suspense } from "react";
import { BellIcon } from "@heroicons/react/24/solid";
import { Await, Link } from "react-router-dom";
import NotificationItem from "./NotificationItem.jsx";
import { getToken } from "../../../hooks/http.js";
import LoadingIndicator from "../../LoadingIndicator.jsx";
const token = getToken();

export default function NotificationBell() {
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  const [isNotificationsBoxAlreadyOpen, setIsNotificationsBoxAlreadyOpen] =
    useState(false);
  const notificationBellRef = useRef(null);
  const notificationsMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !notificationBellRef.current.contains(event.target) &&
        !notificationsMenuRef.current.contains(event.target)
      ) {
        setIsNotificationsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationsBoxAlreadyOpen]);

  const toggleNotifications = () => {
    setIsNotificationsVisible(
      (prevIsNotificationsVisible) => !prevIsNotificationsVisible
    );
    setIsNotificationsBoxAlreadyOpen(true);
  };

  return (
    <div className="notifier red">
      <button
        ref={notificationBellRef}
        className="bell"
        onClick={toggleNotifications}
      >
        <BellIcon className="text-white w-7 h-7" />
      </button>

      {!isNotificationsBoxAlreadyOpen && (
        <Suspense fallback={null}>
          <Await resolve={fetchUnreadNotifications()}>
            {(resolvedData) => (
              <span className="badge">
                {resolvedData.length > 100 ? "+99" : resolvedData.length}
              </span>
            )}
          </Await>
        </Suspense>
      )}

      <div ref={notificationsMenuRef}>
        <div
          className={`notification-menu ${
            isNotificationsVisible ? "open" : ""
          }`}
        >
          <div className="notifications-header">
            <h1>Notifications</h1>
            <Suspense fallback={null}>
              <Await resolve={fetchUnreadNotifications()}>
                {(resolvedData) => (
                  <p className="new-notification">{resolvedData.length} New</p>
                )}
              </Await>
            </Suspense>
          </div>
          <Suspense
            fallback={
              <div className="py-3 items-center justify-center flex">
                <LoadingIndicator />
              </div>
            }
          >
            <Await resolve={fetchUnreadNotifications()}>
              {(resolvedData) => {
                return resolvedData && resolvedData.length > 0 ? (
                  resolvedData
                    .slice(0, 3)
                    .map((notification, index) => (
                      <NotificationItem
                        key={index}
                        title={notification.title}
                        description={notification.description}
                        date={notification.date}
                      />
                    ))
                ) : (
                  <div className="no-notification">No new notifications</div>
                );
              }}
            </Await>
          </Suspense>
          <div className="all-notifications">
            <Link
              to="/user/all-notifications"
              onClick={() => setIsNotificationsVisible(false)}
            >
              All Notifications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

async function fetchUnreadNotifications() {
  try {
    const response = await fetch(
      "http://localhost:8081/notification/get-latest-notifications",
      {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}
