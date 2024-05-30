import Modal from "../../components/modal/Modal";
import { Await, defer, json, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import {
  fetchFun,
  fetchFunction,
  getToken,
  processSignUpForm,
} from "../../hooks/http.js";
import AllUsersList from "./AllUsersList.jsx";
import FallbackText from "../../components/FallbackText.jsx";
export default function AllUserPage() {
  return (
    <>
      <Modal />
      <div className="bg-gray-50 w-full px-5 pt-4 pb-10">
        <h1 className="text-4xl mb-3">Users</h1>
        <div className="my-4">
          <Suspense
            fallback={<FallbackText title={"Fetching Users data..."} />}
          >
            <Await resolve={loader()}>
              {(resolvedData) => <AllUsersList users={resolvedData} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
}
export async function loader() {
  try {
    return await fetchFun({
      url: "http://localhost:8081/user/profile/all-users",
      options: {
        method: "GET",
        headers: {
          "x-access-token": getToken(),
        },
      },
    });
  } catch (error) {
    return [];
  }
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
