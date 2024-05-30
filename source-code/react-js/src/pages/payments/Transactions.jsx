import { useState } from "react";
import { Menu } from "@headlessui/react";
import { setModalType } from "../../features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
import FilterDropdown from "../../components/FilterDropdown.jsx";
import { Link } from "react-router-dom";

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
    <section className="bg-white  shadow-md p-4 rounded-md mt-10">
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
        filteredTransactions.map((transaction) => {
          const formattedDate = new Date(
            `${transaction.transactionDate}`
          ).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
          return (
            <div
              key={`${transaction.transactionId}`}
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
                    transaction.paymentType === "income"
                      ? "bg-green-300"
                      : "bg-red-300"
                  } p-2 rounded-xl ${
                    transaction.paymentType === "income"
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
                    {transaction.transactionType}
                  </h1>
                  <p className="text-sm text-stone-500 font-semibold">
                    {formattedDate}
                  </p>
                </div>
              </div>
              <div className="flex flex-column justify-between items-center">
                {transaction.userId ? (
                  <>
                    {transaction.userEmail !== null &&
                    transaction.name !== null ? (
                      // If userEmail and name are both empty strings
                      <Link to={`/user/${transaction.userId}`}>
                        <div className="flex items-center gap-5">
                          <img
                            className="w-14 h-14 fill object-cover rounded-full"
                            src={
                              transaction.image ??
                              "http://localhost:8081/uploads/images/profile/default-user-image.webp"
                            }
                            alt=""
                          />
                          <div>
                            <h1 className="text-sm font-semibold text-gray-600">
                              {transaction.userEmail}
                            </h1>
                            <h1 className="text-sm font-semibold text-black">
                              {transaction.name}
                            </h1>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      // If either userEmail or name is not empty
                      <h1 className="text-center text-sm font-medium text-black bg-gray-100 px-4 py-2 rounded-md">
                        This transaction seems to be from a deleted user!
                      </h1>
                    )}
                  </>
                ) : (
                  // If transaction.userId does not exist
                  <h3 className="font-semibold p-2 text-center text-red-500 bg-red-50 rounded-md">
                    Non-User Related
                  </h3>
                )}

                <h1
                  className={`text-2xl ${
                    transaction.paymentType === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  } font-bold`}
                >
                  ${transaction.price}
                </h1>
              </div>
            </div>
          );
        })
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
      return transaction.paymentType === "income";
    } else if (expense) {
      return transaction.paymentType === "expense";
    } else {
      return false;
    }
  });
};
