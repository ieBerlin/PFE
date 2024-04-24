import { Suspense } from "react";
import { DUMMY_NOTIFICATIONS } from "../../../dummy_data/dummy_notifications.js";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import FallbackText from "../../FallbackText.jsx";
import NotificationsList from "./NotificationsList.jsx";
export default function AllNotifications() {
  const { timeOut } = useRouteLoaderData("notifications-id");
  return (
    <div className="py-5 px-[200px] bg-gray-100">
      <div className="font-semibold text-2xl py-5 pl-5">All Notifications </div>
      <Suspense
        fallback={<FallbackText title="Fetch available notifications" />}
      >
        <Await resolve={timeOut}>
          {(resolvedData) => <NotificationsList data={resolvedData} />}
        </Await>
      </Suspense>
    </div>
  );
}
function timeOut() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_NOTIFICATIONS);
    }, 3000);
  });
}
export function loader() {
  return defer({
    timeOut: timeOut(),
  });
}
