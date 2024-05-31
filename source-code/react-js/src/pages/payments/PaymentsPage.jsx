import { Suspense } from "react";
import Modal from "../../components/modal/Modal.jsx";
import Transactions from "./Transactions.jsx";
import FallbackText from "../../components/FallbackText.jsx";
import { fetchFun, getToken } from "../../hooks/http.js";
import { Await } from "react-router-dom";
import ForbiddenPage from "../../components/ForbiddenPage.jsx";
import { useSelector } from "react-redux";
// import { classNames } from "../../utils/helpers.js"; // Assuming helpers.js contains utility functions

export default function PaymentsPage() {
  const userRole = useSelector(
    (state) => state.userRole?.userRole?.toLowerCase() === "admin"
  );

  if (!userRole) {
   return <ForbiddenPage title=" Access Denied: Admins Only" message="You do not have the necessary permissions to view this area. Admin access is required."/>
  }
  return (
    <>
      <Modal />
      <main className="bg-gray-100 w-full px-5 pt-4 pb-10">
        <h1 className="text-4xl mb-1">Transactions</h1>
        <Suspense
          fallback={
            <FallbackText title="Fetching available transactions data" />
          }
        >
          <Await resolve={loader()}>
            {(resolvedData) => <Transactions transactionsData={resolvedData} />}
          </Await>
        </Suspense>
      </main>
    </>
  );
}

export async function loader() {
  try {
    return await fetchFun({
      url: "http://localhost:8081/transactions",
      options: {
        method: "GET",
        headers: {
          "x-access-token": getToken(),
        },
      },
    });
  } catch (_) {
    return [];
  }
}

async function timeoutPromise() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve("Hello World");
    }, 5000)
  );
}
