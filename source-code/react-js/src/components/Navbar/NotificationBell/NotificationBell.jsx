import "./NotificationBell.css";
import "./NotificationMenu.css";
import { useState, useRef, useEffect } from "react";
import { BellIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import NotificationItem from "./NotificationItem.jsx";
import { fetchFun, getToken, queryClient } from "../../../hooks/http.js";
import LoadingIndicator from "../../LoadingIndicator.jsx";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

const token = getToken();

const NotificationBell = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["notifications"],
        queryFn: async () => {
          try {
            const data = await fetchFun({
              url: "http://localhost:8081/notification/get-latest-notifications",
              options: {
                method: "GET",
                headers: {
                  "x-access-token": token,
                },
              },
            });
            return data || [];
          } catch (error) {
            return [];
          }
        },
      },
    ],
  });
  const { data, isError, isFetching } = results[0];
  const { mutate, error } = useMutation({
    mutationKey: ["notification"],
    mutationFn: async () =>
      await fetchFun({
        url: "http://localhost:8081/notification/mark-as-read",
        options: {
          method: "PUT",
          headers: {
            "x-access-token": getToken(),
          },
        },
      }),
    onMutate: () => console.log("mutated"),
    onSuccess: () => queryClient.invalidateQueries(["notifications"]),
  });
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  useEffect(() => {
    if (isNotificationsVisible) {
      return () => {
        if (data) {
          mutate();
        }
      };
    }
  }, [data, isNotificationsVisible, mutate]);
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

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const toggleNotifications = () => {
    setIsNotificationsVisible(
      (prevIsNotificationsVisible) => !prevIsNotificationsVisible
    );
  };
  let notificationsContent;
  if (isFetching) {
    notificationsContent = (
      <div className="py-3 items-center justify-center flex">
        <LoadingIndicator />
      </div>
    );
  } else if (!isError && data && data.length > 0) {
    notificationsContent = data
      .slice(0, 3)
      .map((notification, index) => (
        <NotificationItem
          key={index}
          title={notification.title}
          description={notification.description}
          date={notification.date}
        />
      ));
  } else {
    notificationsContent = (
      <div className="no-notification">
        <h1 className="font-semibold text-black">No New Notifications</h1>
      </div>
    );
  }

  return (
    <div className="notifier red">
      <button
        ref={notificationBellRef}
        className="bell"
        onClick={toggleNotifications}
      >
        <BellIcon className="text-white w-7 h-7" />
      </button>

      {data && !isError && (
        <span className="badge">{data.length > 100 ? "+99" : data.length}</span>
      )}

      <div ref={notificationsMenuRef}>
        <div
          className={`notification-menu ${
            isNotificationsVisible ? "open" : ""
          }`}
        >
          <div className="notifications-header">
            <h1>Notifications</h1>
            {data && !isFetching && !isError && (
              <p className="new-notification">{data.length} New</p>
            )}
          </div>
          {notificationsContent}
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
};

export default NotificationBell;
