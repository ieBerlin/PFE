import { Suspense } from "react";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import FallbackText from "../FallbackText";
import UserPage from "./UserPage.jsx";
import Modal from "../modal/Modal.jsx";
export default function UserDetailsPage() {
  const { timeOut: userTimeOut } = useRouteLoaderData("user-detail-id");
  return (
    <>
      <Modal />
      <Suspense
        fallback={
          <div className="px-5 py-7">
            <FallbackText title="Fetching user data" />
          </div>
        }
      >
        <Await resolve={userTimeOut}>
          {(resolvedData) => <UserPage userData={resolvedData} />}
        </Await>
      </Suspense>
    </>
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
    }, 1000);
  });
}
export async function action() {
  return new Promise(
    (resolve) =>
      setTimeout(() => {
        resolve(userData);
      }, 0),
    4000
  );
}
const userData = {
  name: "User Name",
  location: "Berlin, Germany",
  phoneNumber: "+213 687-456-6456",
  email: "aeourmassi@gmail.com",
  avatarSrc:
    "https://i1.sndcdn.com/avatars-l1naSpQtTriIecnJ-Rf6eyQ-t240x240.jpg",
  userRole: "Coach",
  membershipInfo: {
    membershipDaysLeft: 12,
  },
};
