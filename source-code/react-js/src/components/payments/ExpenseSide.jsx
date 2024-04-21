import { Menu } from "@headlessui/react";
import { DUMMY_DATES } from "../../dummy_data/dummy_payments";
import { DUMMY_DAILY_EXPENSES } from "../../dummy_data/dummy_reports.js";
import { classNames } from "./PaymentsPage";
import {  useState } from "react";
export default function ExpenseSide() {
  const [currentSelectedDate, setCurrentSelectedDate] = useState(
    DUMMY_DATES[0].time
  );
  const handleCurrentDateSelect = (value) => {
    setCurrentSelectedDate(value);
  };
  return (
    <div className="bg-white shadow-xl px-5 py-4  rounded-lg">
      <div className="flex flex-row justify-between  items-center mb-3">
        <strong className="font-bold text-xl">Expense</strong>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {currentSelectedDate.expenseDate}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`h-5 w-5 text-gray-400 transition-transform ${
                  !open ? "rotate-90" : "rotate-0"
                }`}
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
                {DUMMY_DATES.map((date) => (
                  <Menu.Item key={date.id}>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          handleCurrentDateSelect("expense", date.time)
                        }
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          " px-4 py-2 text-sm flex w-full"
                        )}
                      >
                        {date.time}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </div>
        </Menu>
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className=" text-stone-400">
          last updated 1m ago
          <button
          // onClick={() => handleCurrentDateSelect("expense", date.time)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 inline ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </p>
        <h1 className="text-2xl font-bold">$1500,30</h1>
      </div>
      <div>
        <div className="flex flex-row mt-2 text-stone-500 font-medium text-sm">
          <div className="grid grid-rows-5 w-14 text-center">
            <h1>$1000</h1>
            <h1>$800</h1>
            <h1>$600</h1>
            <h1>$400</h1>
            <h1>$200</h1>
          </div>
          <div
            className="grid grid-cols-4 items-end w-full "
            style={{
              minHeight: "250px",
            }}
          >
            {DUMMY_DAILY_EXPENSES.map((dailyExpense) => (
              <div
                key={`expense-${dailyExpense.id}`}
                className=" w-10 bg bg-red-500 mx-auto my-0 rounded-t-md text-center text-sm text-white font-semibold "
                style={{
                  height: `${Math.round(dailyExpense.expense * 0.25)}px`,
                  verticalAlign: "middle",
                  lineHeight: `${Math.round(dailyExpense.expense * 0.25)}px`,
                }}
              >
                ${dailyExpense.expense}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 text-center py-2 text-black font-medium text-sm ml-14">
        <h1>Day 1</h1>
        <h1>Day 2</h1>
        <h1>Day 3</h1>
        <h1>Day 4</h1>
      </div>
    </div>
  );
}
