import { Suspense } from "react";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import FallbackText from "../FallbackText";
import UserPage from "./UserPage.jsx"
export default function UserDetailsPage() {
  const { timeOut: userTimeOut } = useRouteLoaderData("user-detail-id");
  return (
    <Suspense
      fallback={
        <div className="px-5 py-7">
          <FallbackText title="Fetching user data" />
        </div>
      }
    >
      <Await resolve={userTimeOut}>{(resolvedData) => <UserPage />}</Await>
    </Suspense>
  );
}
export function loader() {
  return defer({
    timeOut: timeOut(),
  });
}
function timeOut() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userData);
    }, 0);
  });
}
const userData = {
  email: "user@example.com",
  username: "coolUser123",
  password: "securePassword123",
  first_name: "John",
  last_name: "Doe",
  date_of_birth: "1990-01-01",
  gender: "Male",
  address: "123 Main St, Cityville",
  phone_number: "699009900",
  role: "Member",
  image: "",
  bio: "",
};
