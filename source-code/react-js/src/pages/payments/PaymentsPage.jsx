import { Suspense } from "react";
import Modal from "../../components/modal/Modal.jsx";
import Transactions from "./Transactions.jsx";
import FallbackText from "../../components/FallbackText.jsx";
import { defer, json, useRouteLoaderData } from "react-router-dom";
import { fetchFunction, getToken } from "../../hooks/http.js";
// import { classNames } from "../../utils/helpers.js"; // Assuming helpers.js contains utility functions

export default function PaymentsPage() {
  const {
    data: transactionLoader,
    isLoading,
    error,
  } = useRouteLoaderData("payments-loader");

  if (error) {
    // Handle error case
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Modal />
      <main className="bg-gray-100 w-full px-5 pt-4 pb-10">
        <h1 className="text-4xl mb-1">Payments</h1>
        <Suspense
          fallback={
            <FallbackText title="Fetching available transactions data" />
          }
        >
          {isLoading ? (
            <FallbackText title="Loading transactions..." />
          ) : (
            <Transactions transactionsData={transactionLoader?.data || []} />
          )}
        </Suspense>
      </main>
    </>
  );
}

export async function action({ params, request }) {
  let formData = await request.formData();
  const actionType = formData.get("payment-action") || null;
  if (actionType && actionType === "add-transaction") {
    await timeoutPromise();
    return json({
      message: "",
      success: true,
    });
  }
  return 12;
}

export async function loader() {
  const token = getToken();
  if (!token) {
    throw json({ status: 403 });
  }

  return defer({
    data: await fetchFunction({
      url: "http://localhost:8081/payments",
      options: {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      },
    }),
  });
}

async function timeoutPromise() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve("Hello World");
    }, 5000)
  );
}
