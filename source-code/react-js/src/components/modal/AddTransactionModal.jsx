import { useState } from "react";
import { Form } from "react-router-dom";

export default function AddTransactionModal() {
  return (
    <div className="px-8 pb-4 pt-5 rounded-md bg-white">
      <h1 className="font-bold text-xl text-start">Add Transaction</h1>
      <Form className="border border-gray-300 pr-12 pl-3 py-6 mx-3 my-5 rounded-md flex flex-col gap-6 w-full">
        <RelatedUserField />
        <SelectInput
          label="Transaction Type"
          options={[
            "Membership Fee",
            "Personal Training",
            "Session Payment",
            "Merchandise Purchase",
            "Other",
          ]}
          placeholder="Select transaction type"
        />
        <SelectInput
          label="Transaction Method"
          options={[
            "Cash",
            "Credit Card",
            "Debit Card",
            "Online Payment",
            "Other",
          ]}
          placeholder="Select transaction method"
        />
        <PriceInput />
        <PaymentType />
        <SelectInput
          label="Transaction Status"
          options={["Paid", "Pending", "Refunded", "Cancelled", "Other"]}
          placeholder="Select transaction status"
        />
        <DatePicker />
        <TransactionNotes />
      </Form>
    </div>
  );
}

function SelectInput({ label, options, placeholder }) {
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const handleSelectChange = (event) => {
    setIsOtherSelected(event.target.value === "Other");
  };

  return (
    <div>
      <label
        htmlFor="hs-select-label"
        className="block text-sm font-medium mb-2 dark:text-black capitalize"
      >
        {label}
      </label>
      <select
        id="hs-select-label"
        className="outline-none py-3 px-4 pe-9 flex w-full border border-gray-300 rounded-lg text-sm"
        onChange={handleSelectChange}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option
            value={option.trim()}
            className="capitalize text-black"
            key={index}
          >
            {option}
          </option>
        ))}
      </select>
      <div>
        {isOtherSelected && (
          <input
            type="text"
            className="flex w-full py-3 px-4 border-gray-300 rounded-lg text-sm border mt-2"
            placeholder={`Type the other ${label.toLowerCase()}`}
          />
        )}
      </div>
    </div>
  );
}

function PriceInput() {
  return (
    <div>
      <div className="flex w-full flex-col">
        <label
          htmlFor="hs-select-label"
          className="block text-sm font-medium mb-2 dark:text-black capitalize"
        >
          Price
        </label>
        <div className="relative flex w-full ">
          <input
            type="text"
            id="hs-input-with-leading-and-trailing-icon"
            name="hs-input-with-leading-and-trailing-icon"
            className="flex w-full  py-3 px-4 ps-9 pe-16 border border-gray-300 shadow-sm rounded-lg text-sm focus:z-10 "
            placeholder="Enter price"
          />
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4 text-gray-500">
            $
          </div>
          <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4 text-gray-500">
            DZD
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentType() {
  return (
    <div>
      <label
        htmlFor="hs-select-label"
        className="block text-sm font-medium mb-2 dark:text-black capitalize"
      >
        Payment Type
      </label>
      <div className="flex justify-center gap-3">
        <label
          htmlFor="income"
          className="text-sm text-green-500 ms-2 font-bold"
        >
          Income
        </label>
        <input
          type="radio"
          defaultChecked
          value="income"
          name="payment-type"
          id="income"
        />
        <input type="radio" value="expense" name="payment-type" id="expense" />
        <label
          htmlFor="expense"
          className="text-sm text-red-500 ms-2 font-bold"
        >
          Expense
        </label>
      </div>
    </div>
  );
}

function DatePicker() {
  return (
    <div>
      <label
        htmlFor="hs-select-label"
        className="block text-sm font-medium mb-2 dark:text-black capitalize"
      >
        Transaction Date and Time
      </label>
      <div className="flex flex-row w-full justify-center items-center">
        <input
          type="date"
          className="outline-none text-gray-500  py-3 px-4 ps-9 pe-16 block border w-full border-gray-300 shadow-sm rounded-s-lg text-sm "
          name=""
          id=""
        />
        <input
          type="time"
          id="time"
          className=" outline-none text-gray-500 py-3 px-4 ps-9 pe-16 block border items-center w-full border-gray-300 shadow-sm rounded-e-lg text-sm "
          required
        />
      </div>
    </div>
  );
}

function TransactionNotes() {
  return (
    <div>
      <label
        htmlFor="hs-select-label"
        className="block text-sm font-medium mb-2 dark:text-black capitalize"
      >
        Transaction Notes
      </label>
      <textarea
        type="text"
        id="hs-input-with-leading-and-trailing-icon"
        name="hs-input-with-leading-and-trailing-icon"
        className="outline-none flex w-full  py-3 px-4 ps-9 pe-16 border border-gray-300 shadow-sm rounded-lg text-sm focus:z-10 "
        placeholder="Type transaction notes"
      />
    </div>
  );
}
function RelatedUserField() {
  return (
    <div>
      <label
        htmlFor="hs-select-label"
        className="block text-sm font-medium mb-2 dark:text-black capitalize"
      >
        Related User
      </label>
      <div className="relative ">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="outline-none block w-full p-4 ps-10  py-3 px-4 pe-16 border border-gray-300 shadow-sm rounded-lg text-sm focus:z-10 "
          placeholder="Search Mockups, Logos..."
          required
        />
        <button
          type="button"
          className="text-white absolute top-1 right-1 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 "
        >
          Search
        </button>
      </div>
      {
        <div className=" pl-3">
          <h4 className="text-gray-400 uppercase font-medium text-sm mt-3">
            Users
          </h4>
          <ul className="flex flex-col w-full gap-2 mt-3 px-3 h-[100px] overflow-y-scroll shadow-sm">
            {dummy_users.map((user, index) => (
              <li key={index}>
                <div className="flex gap-2 items-center hover:bg-gray-100 cursor-pointer">
                  <input
                    type="radio"
                    name="related-user"
                    className="cursor"
                    htmlFor={user.email}
                  />
                  <img
                    className="w-8 h-8 rounded-full"
                    src="data:image/jpeg;base64,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"
                    alt=""
                  />
                  <h4 className="text-gray-600 text-sm">{user.email}</h4>
                </div>
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

const dummy_users = [
  {
    fullName: "John Doe",
    email: "john.doe@example.com",
    imageSrc:
      "https://i1.sndcdn.com/avatars-l1naSpQtTriIecnJ-Rf6eyQ-t240x240.jpg",
  },
  {
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    imageSrc:
      "https://i1.sndcdn.com/avatars-l1naSpQtTriIecnJ-Rf6eyQ-t240x240.jpg",
  },
  {
    fullName: "Michael Johnson",
    email: "michael.johnson@example.com",
    imageSrc:
      "https://i1.sndcdn.com/avatars-l1naSpQtTriIecnJ-Rf6eyQ-t240x240.jpg",
  },
  {
    fullName: "Emily Davis",
    email: "emily.davis@example.com",
    imageSrc:
      "https://i1.sndcdn.com/avatars-l1naSpQtTriIecnJ-Rf6eyQ-t240x240.jpg",
  },
  {
    fullName: "Christopher Wilson",
    email: "christopher.wilson@example.com",
    imageSrc:
      "https://i1.sndcdn.com/avatars-l1naSpQtTriIecnJ-Rf6eyQ-t240x240.jpg",
  },
  {
    fullName: "Jessica Martinez",
    email: "jessica.martinez@example.com",
    imageSrc:
      "https://i1.sndcdn.com/avatars-l1naSpQtTriIecnJ-Rf6eyQ-t240x240.jpg",
  },
  {
    fullName: "Daniel Anderson",
    email: "daniel.anderson@example.com",
    imageSrc:
      "https://i1.sndcdn.com/avatars-l1naSpQtTriIecnJ-Rf6eyQ-t240x240.jpg",
  },
];
