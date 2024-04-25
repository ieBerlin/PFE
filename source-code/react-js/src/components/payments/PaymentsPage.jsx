import Transactions from "./Transactions.jsx";
import { Await, defer, json, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { DUMMY_TRANSACTIONS } from "../../dummy_data/dummy_payments_data.js";
import FallbackText from "../FallbackText.jsx";
import Modal from "../modal/Modal.jsx";
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PaymentsPage() {
  const { transactionTimeout: transactionLoader } =
    useRouteLoaderData("payments-loader");
  return (
    <>
      <Modal />
      <main className="bg-gray-50 w-full px-5 pt-4 pb-10">
        <h1 className="text-4xl mb-1">Payments</h1>

        <Suspense
          fallback={
            <FallbackText title="Fetching available transactions data" />
          }
        >
          <Await resolve={transactionLoader}>
            {(resolvedData) => <Transactions transactionsData={resolvedData} />}
          </Await>
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
export function loader() {
  return defer({
    transactionTimeout: transactionsTimeOut(),
  });
}

function transactionsTimeOut() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(DUMMY_TRANSACTIONS);
    }, 1000)
  );
}

async function timeoutPromise() {
  // console.log("called");
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve("Hello World");
    }, 5000)
  );
}
