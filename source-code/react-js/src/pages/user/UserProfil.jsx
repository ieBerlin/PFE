import { Await, defer, useRouteLoaderData } from "react-router-dom";
import UserProfileDetails from "./UserProfileDetails.jsx";
import { Suspense } from "react";
import FallbackText from "../../components/FallbackText.jsx"

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

export default function UserProfil() {
  const { timeOut: timeOutLoader } = useRouteLoaderData("user-profile-id");
  return (
    <Suspense
      fallback={
        <div className="px-5 py-7">
          <FallbackText title="Fetching user profile data" />
        </div>
      }
    >
      <Await resolve={timeOutLoader}>
        {(resolvedData) => <UserProfileDetails data={resolvedData} />}
      </Await>
    </Suspense>
  );
}

function timeOut() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userData);
    }, 2000);
  });
}
export function loader() {
  return defer({
    timeOut: timeOut(),
  });
}
