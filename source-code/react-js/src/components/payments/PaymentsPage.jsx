export default function PaymentsPage() {
  const DUMMY_TRANSACTIONS = [
    {
      id: 12,
      type: "income",
      title: "Payment Received",
      date: "2024-04-11",
      avatar: "https://example.com/avatar.jpg",
      username: "John Doe",
      amount: "$100",
    },
    {
      id: 10,
      type: "expense",
      title: "Purchase",
      date: "2024-04-10",
      avatar: "https://example.com/avatar.jpg",
      username: "Jane Smith",
      amount: "$50",
    },
  ];

  return (
    <main className="bg-white w-full px-5 py-4">
      <h1 className="text-4xl">Payments</h1>
      {/* Analytics */}
      <div className="grid grid-cols-2 gap-9">
              {/* Income */}

        <div className="bg-white shadow-xl px-5 py-4  rounded-lg">
          <div className="flex flex-row justify-between  items-center mb-3">
            <strong className="font-bold text-xl">Income</strong>
            <button className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6 text-green-500 inline mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
              fev 2023
            </button>
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
        </div>
              {/* Expense */}

      </div>
      {/*Transactions */}
      <section className="bg-white shadow-xl p-4 rounded-md">
        <h1 className="text-black font-semibold text-xl mb-4">
          All Transactions
        </h1>
        {DUMMY_TRANSACTIONS.map((transactionItem) => (
          <div className=" grid grid-cols-2 mt-3" key={transactionItem.id}>
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
