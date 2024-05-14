import { Suspense } from "react";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import ChartBar from "../../components/ChartBar.jsx";
import FallbackText from "../../components/FallbackText.jsx";
import {
  DUMMY_DAILY_INCOME,
  DUMMY_DAILY_EXPENSES,
} from "../../dummy_data/dummy_reports.js";
import ReportCard from "./ReportCard.jsx";
import { useQuery } from "@tanstack/react-query";
import ChartComponent from "../payments/ChartComponent.jsx";
import { fetchFun, getToken } from "../../hooks/http.js";
export default function ReportsPage() {
  const {
    isPending: usersLoaderIndicator,
    data: usersData,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetchFun({
        url: "http://localhost:8081/users/all-users-number",
        options: {
          method: "GET",
          headers: {
            "x-access-token": getToken(),
          },
        },
      });
      return response;
    },
  });
  const { isPending: paymentsLoaderIndicator, data: paymentsData } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = await fetchFun({
        url: "http://localhost:8081/payments/last-7-payments",
        options: {
          method: "GET",
          headers: {
            "x-access-token": getToken(),
          },
        },
      });
      return response;
    },
  });

  let incomes = [];
  let expenses = [];
  let dates = [];
  if (paymentsData && paymentsData.incomePayments) {
    incomes = paymentsData.incomePayments;
  }
  if (paymentsData && paymentsData.expensePayments) {
    expenses = paymentsData.expensePayments;
  }
  if (paymentsData && paymentsData.dates) {
    dates = paymentsData.dates;
  }
  return (
    <div className="bg-gray-50 w-full px-5 pt-4 pb-10">
      <h1 className="text-4xl mb-3">Reports</h1>
      <div className="my-4 px-5 ">
        {usersLoaderIndicator && (
          <FallbackText title="Fetching availables users data" />
        )}

        {usersData && (
          <>
            <div>
              <h1 className="font-semibold text-gray-700 text-xl my-2">
                General Club Stats
              </h1>
              <ReportCard {...usersData} />
            </div>
          </>
        )}

        {
          !paymentsLoaderIndicator &&
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
      }
      </div>
    </div>
  );
}
export function loader() {
  return defer({
    transactionsLoaderTimeout: transactionsLoaderTimeout(),
  });
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
  return Math.max(...data.map((item) => item.amount), 1000);
}
