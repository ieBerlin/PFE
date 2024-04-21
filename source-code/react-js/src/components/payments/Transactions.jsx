import { Fragment, useState } from "react";
import { DUMMY_TRANSACTIONS } from "../../dummy_data/dummy_payments_data";
import { Menu } from "@headlessui/react";
import { Transition } from "react-transition-group";
import { classNames } from "./PaymentsPage";
import { Transition as ItemTransition } from "react-transition-group";
import { setModalType } from "../../features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
export default function Transactions() {
  const dispatch = useDispatch();
  const [selectedTransactions, setSelectedTransactions] = useState({
    income: true,
    expense: true,
  });

  const handleTransactionsChecksChange = (type) => {
    setSelectedTransactions((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };
  let FILTERED_DUMMY_TRANSACTIONS;
  if (selectedTransactions.income && selectedTransactions.expense) {
    FILTERED_DUMMY_TRANSACTIONS = DUMMY_TRANSACTIONS;
  } else if (selectedTransactions.income) {
    FILTERED_DUMMY_TRANSACTIONS = DUMMY_TRANSACTIONS.filter(
      (transaction) => transaction.type === "income"
    );
  } else if (selectedTransactions.expense) {
    FILTERED_DUMMY_TRANSACTIONS = DUMMY_TRANSACTIONS.filter(
      (transaction) => transaction.type === "expense"
    );
  }
  return (
    <section className="bg-white shadow-2xl p-4 rounded-md mt-10  ">
      <div className="flex flex-row justify-between items-center  mb-4 px-3">
        <h1 className="text-black font-semibold text-xl">All Transactions</h1>
        <Menu as="div" className="relative inline-block text-left">
          <div className="flex items-center flex-row gap-3">
            {/* this must be a menu button : */}
            <button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
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
            </button>
            <button
              onClick={() => dispatch(setModalType("add-transaction"))}
              className="font-semibold bg-emerald-700 text-white px-4 py-2 text-nowrap rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-teal-600"
            >
              Add Transaction
            </button>
          </div>

          <Transition
            as={Fragment}
            // enter="transition ease-out duration-100"
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
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "px-4 py-2 text-sm flex flex-row items-center justify-between"
                      )}
                    >
                      <h3>Income</h3>
                      <input
                        onChange={() =>
                          handleTransactionsChecksChange("income")
                        }
                        checked={selectedTransactions.income}
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
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "px-4 py-2 text-sm flex flex-row items-center justify-between"
                      )}
                    >
                      <h3>Expense</h3>
                      <input
                        checked={selectedTransactions.expense}
                        onChange={() =>
                          handleTransactionsChecksChange("expense")
                        }
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
      {!FILTERED_DUMMY_TRANSACTIONS ? (
        <Transition
          show
          // enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {(ref) => (
            <p
              ref={ref}
              className="text-black text-center text-xl font-semibold my-16"
            >
              Nothing to show
            </p>
          )}
        </Transition>
      ) : (
        FILTERED_DUMMY_TRANSACTIONS.map((transactionItem) => (
          <ItemTransition
            key={`transaction-${transactionItem.id}`}
            in={true}
            // timeout={300}
            mountOnEnter
            unmountOnExit
          >
            {(state) => (
              <div
                className={`grid grid-cols-2 mt-3 transition-opacity duration-300 ${
                  state === "entered" ? "opacity-100" : "opacity-0"
                }`}
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
                    <p className="text-sm text-stone-500">
                      {transactionItem.date}
                    </p>
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
            )}
          </ItemTransition>
        ))
      )}
    </section>
  );
}
