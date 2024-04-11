import {
  DUMMY_DAILY_INCOME,
  DUMMY_TRANSACTIONS,
  DUMMY_DAILY_EXPENSES,
} from "../../dummy_data/dummy_payments_data.js";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const currentDate = (date, offset = 0) => {
  const currentDate = new Date(date);
  currentDate.setDate(currentDate.getDate() - offset);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const DUMMY_DATES = [
  {
    id: 1,
    time: "Today", // Current date
  },
  {
    id: 2,
    time: currentDate(new Date(), 1), // Subtract 1 day
  },
  {
    id: 3,
    time: currentDate(new Date(), 2), // Subtract 2 days
  },
  {
    id: 4,
    time: currentDate(new Date(), 3), // Subtract 3 days
  },
];
export default function PaymentsPage() {
  const [currentSelectedDate, setCurrentSelectedDate] = useState({
    incomeDate: DUMMY_DATES[0].time,
    expenseDate: DUMMY_DATES[0].time,
  });
  const handleCurrentDateSelect = (type, value) => {
    if (type === "income") {
      setCurrentSelectedDate((prevState) => ({
        ...prevState,
        incomeDate: value,
      }));
    } else {
      setCurrentSelectedDate((prevState) => ({
        ...prevState,
        expenseDate: value,
      }));
    }
  };
  return (
    <main className="bg-white w-full px-5 pt-4 pb-10">
      <h1 className="text-4xl">Payments</h1>
      {/* Analytics */}
      <div className="grid grid-cols-2 gap-9">
        {/* Income */}

        <div className="bg-white shadow-xl px-5 py-4  rounded-lg">
          <div className="flex flex-row justify-between  items-center mb-3">
            <strong className="font-bold text-xl">Income</strong>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {currentSelectedDate.incomeDate}
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

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {DUMMY_DATES.map((date) => (
                      <Menu.Item key={date.id}>
                        {({ active }) => (
                          <button
                            onClick={() =>
                              handleCurrentDateSelect("income", date.time)
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
              </Transition>
            </Menu>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className=" text-stone-400">
              last updated 1m ago
              <button>
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
                {DUMMY_DAILY_INCOME.map((dailyIncome) => (
                  <div
                    key={`income-${dailyIncome.id}`}
                    className=" w-10 bg bg-green-500 mx-auto my-0 rounded-t-md text-center text-sm text-white font-semibold"
                    style={{
                      height: `${Math.round(dailyIncome.income * 0.25)}px`,
                      verticalAlign: "middle",
                      lineHeight: `${Math.round(dailyIncome.income * 0.25)}px`,
                    }}
                  >
                    ${dailyIncome.income}
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
        {/* Expense */}
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

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
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
              </Transition>
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
                      lineHeight: `${Math.round(
                        dailyExpense.expense * 0.25
                      )}px`,
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
      </div>
      {/*Transactions */}
      <section className="bg-white shadow-2xl p-4 rounded-md mt-10  ">
        <div className="flex flex-row justify-between items-center  mb-4 px-3">
          <h1 className="text-black font-semibold text-xl">All Transactions</h1>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Filter
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <h2 className=" text-sm font-medium px-4 py-2">
                    Transaction Type
                  </h2>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "px-4 py-2 text-sm flex flex-row items-center justify-between"
                        )}
                      >
                        <h3>Income</h3>
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "px-4 py-2 text-sm flex flex-row items-center justify-between"
                        )}
                      >
                        <h3>Expense</h3>
                        <input
                          checked
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        {DUMMY_TRANSACTIONS.map((transactionItem) => (
          <div
            className=" grid grid-cols-2 mt-3"
            key={`transaction-${transactionItem.id}`}
          >
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
                className={`w-10 h-10 ${
                  transactionItem.type === "income"
                    ? "bg-green-300"
                    : "bg-red-300"
                } p-2 rounded-xl ${
                  transactionItem.type === "income"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                />
              </svg>
              <div className="pl-4">
                <h1 className="text-blue text-lg font-semibold">
                  {transactionItem.title}
                </h1>
                <p className="text-sm text-stone-500">{transactionItem.date}</p>
              </div>
            </div>
            <div className="flex flex-column justify-between items-center">
              <div className="flex flex-row items-center gap-5">
                <img
                  className=" w-14 h-14 fill object-cover rounded-full"
                  src="https://www.wikihow.com/images/9/90/What_type_of_person_are_you_quiz_pic.png"
                  alt=""
                />
                <h1 className=" text-sm font-semibold">
                  {transactionItem.username}
                </h1>
              </div>
              <h1
                className={`text-2xl   ${
                  transactionItem.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                } font-bold`}
              >
                {transactionItem.amount}
              </h1>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
