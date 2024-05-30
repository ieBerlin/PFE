import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
export default function ChartComponent({ incomeData, expenseData, dates }) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  useEffect(() => {
    const incomeTotal = incomeData?.reduce((acc, curr) => {
      return acc + +curr;
    }, 0);
    const expenseTotal = expenseData?.reduce((acc, curr) => acc + +curr, 0);
    setTotalIncome(incomeTotal);
    setTotalExpense(expenseTotal);
  }, [incomeData, expenseData]);

  const formattedDates = dates.map((item) =>
    new Date(item).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  );
  useEffect(() => {
    if (
      document.getElementById("line-chart") &&
      typeof ApexCharts !== "undefined"
    ) {
      const chart = new ApexCharts(
        document.getElementById("line-chart"),
        options
      );
      chart.render();
    }
  }, []);

  const options = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "line",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
      curve: "smooth",
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -26,
      },
    },
    series: [
      {
        name: "Income",
        data: incomeData,
        color: "#22C55E",
      },
      {
        name: "Expense",
        data: expenseData,
        color: "#ef4444",
      },
    ],
    legend: {
      show: false,
    },

    xaxis: {
      categories: formattedDates,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Income and Expense Overview
      </h3>
      <div className="flex justify-between mb-5">
        <div className="grid gap-4 grid-cols-2">
          <div>
            <h5 className="inline-flex items-center text-gray-700 leading-none font-normal mb-2">
              Expense
              {/* Expense popover */}
            </h5>
            <p className="text-gray-900 text-2xl leading-none font-bold">
              ${totalExpense ?? 0}
            </p>
          </div>
          <div>
            <h5 className="inline-flex items-center text-gray-700 leading-none font-normal mb-2">
              Income
              {/* Income popover */}
            </h5>
            <p className="text-gray-900 text-2xl leading-none font-bold">
              ${totalIncome}
            </p>
          </div>
        </div>
        <div>
          {/* <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {"selectedDate"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-gray-400 transition-transform rotate-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </Menu.Button>
          </div>
          <div>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {dates.map((date) => (
                  <Menu.Item key={date}>
                    {({ active }) => (
                      <button
                        // onClick={() => handleDateSelect(date)}
                        href="#"
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } px-4 py-2 text-sm flex w-full`}
                      >
                        {date}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </div>
        </Menu> */}
        </div>
      </div>
      <div id="line-chart" />
    </div>
  );
}
