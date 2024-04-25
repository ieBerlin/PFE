import { useState } from "react";
import { Menu } from "@headlessui/react";
import { setModalType } from "../../features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
import FilterDropdown from "../FilterDropdown.jsx";

const initialSelectedTransactions = {
  options: {
    income: true,
    expense: true,
  },
};

export default function Transactions({ transactionsData }) {
  const dispatch = useDispatch();
  const [selectedTransactions, setSelectedTransactions] = useState(
    initialSelectedTransactions
  );

  const filteredTransactions = filterTransactions(
    transactionsData,
    selectedTransactions
  );
  return (
    <section className="bg-white shadow-2xl p-4 rounded-md mt-10">
      <div className="flex justify-between items-center mb-4 px-3">
        <h1 className="text-black font-semibold text-xl">All Transactions</h1>
        <Menu as="div" className="relative inline-block text-left">
          <div className="flex items-center gap-3">
            <FilterDropdown
              currentSelectedData={selectedTransactions}
              filterOptionsData={[
                {
                  title: "options",
                  options: ["income", "expense"],
                },
              ]}
              setData={setSelectedTransactions}
            />
            <button
              onClick={() => dispatch(setModalType("add-transaction"))}
              className="font-semibold bg-emerald-700 text-white px-4 py-2 text-nowrap rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-teal-600"
            >
              Add Transaction
            </button>
          </div>
        </Menu>
      </div>
      {!filteredTransactions || filteredTransactions.length === 0 ? (
        <p className="text-black text-center text-xl font-semibold my-16">
          Nothing to show
        </p>
      ) : (
        filteredTransactions.map((transaction) => (
          <div
            key={`transaction-${transaction.id}`}
            className="grid grid-cols-2 mt-3 transition-opacity duration-300"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
                className={`w-10 h-10 ${
                  transaction.type === "income" ? "bg-green-300" : "bg-red-300"
                } p-2 rounded-xl ${
                  transaction.type === "income"
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
                  {transaction.title}
                </h1>
                <p className="text-sm text-stone-500 font-semibold">
                  {transaction.date}
                </p>
              </div>
            </div>
            <div className="flex flex-column justify-between items-center">
              <div className="flex items-center gap-5">
                <img
                  className="w-14 h-14 fill object-cover rounded-full"
                  src="https://www.wikihow.com/images/9/90/What_type_of_person_are_you_quiz_pic.png"
                  alt=""
                />
                <h1 className="text-sm font-semibold">
                  {transaction.username}
                </h1>
              </div>
              <h1
                className={`text-2xl ${
                  transaction.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                } font-bold`}
              >
                {transaction.amount}
              </h1>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

const filterTransactions = (transactions, selectedOptions) => {
  const { income, expense } = selectedOptions.options;
  return transactions.filter((transaction) => {
    if (income && expense) {
      return true;
    } else if (income) {
      return transaction.type === "income";
    } else if (expense) {
      return transaction.type === "expense";
    } else {
      return false;
    }
  });
};
