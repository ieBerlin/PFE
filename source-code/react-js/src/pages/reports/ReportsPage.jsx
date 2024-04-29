import { Suspense } from "react";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import ChartBar from "../../components/ChartBar.jsx";
import FallbackText from "../../components/FallbackText.jsx";
import { dummy_reports_users } from "../../dummy_data/dummy_users.js";
import {
  DUMMY_DAILY_INCOME,
  DUMMY_DAILY_EXPENSES,
  dates,
} from "../../dummy_data/dummy_reports.js";
import ReportCard from "./ReportCard.jsx";
import ChartComponent from "../payments/ChartComponent.jsx";

export default function ReportsPage() {
  const { transactionsLoaderTimeout: transactionsLoader, usersLoaderTime } =
    useRouteLoaderData("reports-loader");
  return (
    <div className="bg-gray-50 w-full px-5 pt-4 pb-10">
      <h1 className="text-4xl mb-3">Reports</h1>
      <div className="my-4 px-5 ">
        <Suspense
          fallback={<FallbackText title="Fetching availables users data" />}
        >
          <Await resolve={usersLoaderTime}>
            {(resolvedData) => (
              <div>
                <h1 className="font-semibold text-gray-700 text-xl my-2">
                  General Club Stats
                </h1>
                <ReportCard {...resolvedData} />
              </div>
            )}
          </Await>
        </Suspense>
        <Suspense
          fallback={
            <FallbackText title="Fetching available transactions data" />
          }
        >
          <Await resolve={transactionsLoader}>
            {(resolvedData) => {
              const { incomes, expenses } = resolvedData;
              return (
                <div>
                  <h1 className="my-2 font-semibold text-gray-700 text-xl">
                    Financials
                  </h1>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2  gap-4">
                      <ChartBar
                        label="Income"
                        dates={dates}
                        data={incomes}
                        maxYValue={findMaxIncome(incomes)}
                        color="green-500"
                      />
                      <ChartBar
                        label="Expense"
                        dates={dates}
                        data={expenses}
                        maxYValue={findMaxIncome(expenses)}
                        color="red-500"
                      />
                    </div>
                    <ChartComponent
                      incomeData={incomes}
                      expenseData={expenses}
                      dates={dates}
                      color
                    />
                  </div>
                </div>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
export function loader() {
  return defer({
    transactionsLoaderTimeout: transactionsLoaderTimeout(),
    usersLoaderTime: usersLoaderTimeout(),
  });
}
async function usersLoaderTimeout() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(dummy_reports_users);
    }, 1000)
  );
}
async function transactionsLoaderTimeout() {
  const incomes = await incomeTimeOut();
  const expenses = await expenseTimeOut();
  return {
    incomes,
    expenses,
  };
}
function incomeTimeOut() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(DUMMY_DAILY_INCOME);
    }, 1000)
  );
}
function expenseTimeOut() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(DUMMY_DAILY_EXPENSES);
    }, 1000)
  );
}
function findMaxIncome(data) {
  return Math.max(...data.map((item) => item.value), 1000);
}
