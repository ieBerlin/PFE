import Modal from "../../components/modal/Modal";
import { Await, defer, json, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import {
  fetchFunction,
  getToken,
  processSignUpForm,
} from "../../hooks/http.js";
import AllUsersList from "./AllUsersList.jsx";
export default function AllUserPage() {
  const { timeOut } = useRouteLoaderData("all-users-id");
  return (
    <>
      <Modal />
      <Suspense fallback={<FallbackText />}>
        <Await resolve={timeOut}>
          {(resolvedData) => {
            const { data } = resolvedData;
            return <AllUsersList users={data} />;
          }}
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
  const token = getToken();
  if (!token) {
    throw json({ status: 403 });
  }
  return fetchFunction({
    url: "http://localhost:8081/user/profile/all-users",
    options: {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    },
  });
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
  const data = await request.formData();
  const mode = data.get("form-type");
  if (mode === "sign-up-form") {
    try {
      const password = data.get("password");
      const confirmPassword = data.get(["confirm-password"]);
      if (password !== confirmPassword) {
        const errors = { password: "Passwords do not match." };
        return json({ errors });
      }

      const response = await fetchFunction({
        url: "http://localhost:8081/user/auth/signup",
        options: {
          method: "POST",
          body: JSON.stringify(await processSignUpForm(data)),
          headers: {
            "Content-Type": "application/json",
          },
        },
      });
      if (response.status === 200 || response.status === 201) {
        console.log("success");
        return json({ status: 200, success: true });
      }
      if (response.status === 422 || response.status === 409) {
        const errors = response.data.message ?? "Error occurred";
        return json({ errors });
      } else {
        const message = response.message || "Error occurred";
        return json({
          status: response.status,
          success: false,
          message,
        });
      }

      // Success
    } catch (error) {
      console.error("An error occurred during signup:", error.message);
      return json({
        status: 500,
        success: false,
        message: "Internal Server Error",
      });
    }
  }

  return null;
}
