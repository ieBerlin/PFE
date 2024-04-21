import { Suspense } from "react";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import IncomeSide from "../payments/IncomeSide.jsx";
import ExpenseSide from "../payments/ExpenseSide.jsx";
import FallbackText from "../FallbackText.jsx";
import {
  DUMMY_DAILY_INCOME,
  DUMMY_DAILY_EXPENSES,
} from "../../dummy_data/dummy_reports.js";
export default function ReportsPage() {
  const { expenseTimeOut: expenseLoader, incomeTimeOut: incomeLoader } =
    useRouteLoaderData("reports-loader");
  return (
    <div className="bg-gray-50 w-full px-5 pt-4 pb-10">
      <h1 className="text-4xl mb-3">Reports</h1>
      <div className="grid grid-cols-2 gap-9">
        <Suspense
          fallback={<FallbackText title="Fetching available income data" />}
        >
          <Await resolve={incomeLoader}>
            <IncomeSide />
          </Await>
        </Suspense>
        <Suspense
          fallback={<FallbackText title="Fetching available expense data" />}
        >
          <Await resolve={expenseLoader}>
            <ExpenseSide />
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
export function loader() {
  return defer({
    expenseTimeOut: expenseTimeOut(),
    incomeTimeOut: incomeTimeOut(),
  });
}
function incomeTimeOut() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(DUMMY_DAILY_INCOME);
    }, 2000)
  );
}
function expenseTimeOut() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(DUMMY_DAILY_EXPENSES);
    }, 5000)
  );
}
