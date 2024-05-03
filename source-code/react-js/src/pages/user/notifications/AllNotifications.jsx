import { Suspense } from "react";
import { useRouteLoaderData } from "react-router-dom";
import FallbackText from "../../../components/FallbackText.jsx";
import NotificationsList from "./NotificationsList.jsx";
import { getToken } from "../../../hooks/http.js";
const token = getToken();
export default function AllNotifications() {
  const loaderData = useRouteLoaderData("notifications-id");
  return (
    <div className="py-5 px-[200px] bg-gray-100">
      <div className="font-semibold text-2xl py-5 pl-5">All Notifications </div>
      <Suspense
        fallback={<FallbackText title="Fetch available notifications" />}
      >
        {/* <Await resolve={timeOut}> */}
        {/* {(resolvedData) => */}
        <NotificationsList notifications={loaderData} />
        {/* } */}
        {/* </Await> */}
      </Suspense>
    </div>
  );
}
export async function loader() {
  try {
    const response = await fetch(
      "http://localhost:8081/notification/get-all-notifications",
      {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      }
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return false;
  }
}
