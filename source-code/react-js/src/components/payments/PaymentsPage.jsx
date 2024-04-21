import Transactions from "./Transactions.jsx";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { DUMMY_TRANSACTIONS } from "../../dummy_data/dummy_payments_data.js";
import FallbackText from "../FallbackText.jsx";
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PaymentsPage() {
  const { transactionTimeout: transactionLoader } =
    useRouteLoaderData("payments-loader");
  return (
    <main className="bg-gray-50 w-full px-5 pt-4 pb-10">
      <h1 className="text-4xl mb-3">Payments</h1>

      <Suspense
        fallback={<FallbackText title="Fetching available transactions data" />}
      >
        <Await resolve={transactionLoader}>
          <Transactions />
        </Await>
      </Suspense>
    </main>
  );
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
