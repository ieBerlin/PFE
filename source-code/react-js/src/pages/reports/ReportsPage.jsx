import ChartBar from "../../components/ChartBar.jsx";
import FallbackText from "../../components/FallbackText.jsx";
import ReportCard from "./ReportCard.jsx";
import { useQueries } from "@tanstack/react-query";
import ChartComponent from "../payments/ChartComponent.jsx";
import { fetchFun, getToken } from "../../hooks/http.js";
export default function ReportsPage() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["transactions"],
        queryFn: async () =>
          await fetchFun({
            url: "http://localhost:8081/transactions/last-7-payments",
            options: {
              method: "GET",
              headers: {
                "x-access-token": getToken(),
              },
            },
          }),
      },
      {
        queryKey: ["users"],
        queryFn: async () =>
          await fetchFun({
            url: "http://localhost:8081/users/all-users-number",
            options: {
              method: "GET",
              headers: {
                "x-access-token": getToken(),
              },
            },
          }),
      },
    ],
  });

  const { isPending: paymentsLoaderIndicator, data: paymentsData } = results[0];
  const {
    isPending: usersLoaderIndicator,
    data: usersData,
    isError,
    error,
  } = results[1];

  let incomes = [];
  let expenses = [];
  const dates = [];

  if (paymentsData && paymentsData.length > 0) {
    paymentsData.forEach((payment) => {
      dates.push(payment.date);

      const incomesInDay = [];
      const expensesInDay = [];

      if (payment.transactions && payment.transactions.length > 0) {
        payment.transactions.forEach((item) => {
          if (item.paymentType === "expense") {
            expensesInDay.push(item);
          } else {
            incomesInDay.push(item);
          }
        });
      }

      incomes.push(incomesInDay);
      expenses.push(expensesInDay);
    });
  } else {
    incomes.push([]);
    expenses.push([]);
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

        {!paymentsLoaderIndicator && (
          <div>
            <h1 className="my-2 font-semibold text-gray-700 text-xl">
              Financials, Latest 7 Days
            </h1>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2  gap-4">
                <ChartBar
                  label="Income"
                  dates={dates}
                  data={incomes}
                  maxYValue={findMaxValue(incomes)}
                  color="green-500"
                />
                <ChartBar
                  label="Expense"
                  dates={dates}
                  data={expenses}
                  maxYValue={findMaxValue(expenses)}
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
        )}
      </div>
    </div>
  );
}

function findMaxValue(data) {
  const flattenedData = data.flat();
  if (flattenedData.length === 0) {
    return 1000;
  }
  const prices = flattenedData.map((item) => +item.price);

  // Calculate the maximum value among the prices, considering 1000 as the default minimum
 return Math.max(...prices, 1000);
}
