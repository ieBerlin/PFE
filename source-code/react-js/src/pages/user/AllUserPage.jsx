import Modal from "../../components/modal/Modal";
import { DUMMY_USERS } from "../../dummy_data/dummy_users.js";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import AllUsersList from "./AllUsersList.jsx";
import { Suspense } from "react";
export default function AllUserPage() {
  const { timeOut } = useRouteLoaderData("all-users-id");
  return (
    <>
      <Modal />
      <Suspense fallback={<FallbackText />}>
        <Await resolve={timeOut}>
          {(resolvedData) => <AllUsersList users={resolvedData} />}
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
const timeOut = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(DUMMY_USERS);
    }, 500)
  );
};
function FallbackText() {
  return (
    <section className=" flex h-full w-full flex-col">
      <p className="text-gray-700 text-xl font-semibold text-center mt-7">
        Fetching Users data...
      </p>
    </section>
  );
}
export async function action({ request }) {
  console.log("calling all users page action")
  const fd = await request.formData();
  console.log(fd);
  return null;
}
