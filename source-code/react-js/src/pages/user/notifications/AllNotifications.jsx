import { Suspense } from "react";
import { useRouteLoaderData } from "react-router-dom";
import FallbackText from "../../../components/FallbackText.jsx";
import NotificationsList from "./NotificationsList.jsx";
import { getToken } from "../../../hooks/http.js";
const token = getToken();
export default function AllNotifications() {
  const loaderData = useRouteLoaderData("notifications-id");
  console.log(loaderData);
  return (
    <div className="bg-gray-100 min-h-[calc(100vh-60px)] px-5  pb-40 pt-4">
      <h1 className="text-4xl text-black">All notifications</h1>
      <Suspense
        fallback={<FallbackText title="Fetching notifications data..." />}
      >
        <NotificationsList notifications={loaderData} />
      </Suspense>
    </div>
  );
}
export async function loader() {
  console.log("loader");

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
