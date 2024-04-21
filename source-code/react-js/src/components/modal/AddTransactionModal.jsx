import { useState } from "react";
import { Form } from "react-router-dom";

export default function AddTransactionModal() {
  return (
    <div className="px-8 pb-4 pt-5 rounded-md bg-white">
      <h1 className="font-bold text-xl text-start">Add Transaction</h1>
      <Form className="border border-gray-300 pr-12 pl-3 py-6 mx-3 my-5 rounded-md flex w-full flex-col gap-6 w-full">
        <SelectInput
          label="Transaction Type"
          options={[
            "Membership Fee",
            "Personal Training",
            "Session Payment",
            "Merchandise Purchase",
            "Other",
          ]}
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
        />
        <PriceInput />
        <PaymentType />
      </Form>
    </div>
  );
}

function SelectInput({ label, options }) {
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
        // defaultValue="open-this-select"
        id="hs-select-label"
        className="outline-none py-3 px-4 pe-9 flex w-full border border-gray-300 rounded-lg text-sm"
        onChange={handleSelectChange}
      >
        <option value="open-this-select">Select {label}</option>
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
      <div className="max-w-sm space-y-3">
        {isOtherSelected && (
          <input
            type="text"
            className="py-3 px-4 block w-full border-gray-300 rounded-lg text-sm border mt-2"
            placeholder={`Type the Other ${label}`}
          />
        )}
      </div>
    </div>
  );
}
function PriceInput() {
  return (
    <div className="max-w-sm space-y-3">
      <div>
        <label
          htmlFor="hs-select-label"
          className="block text-sm font-medium mb-2 dark:text-black capitalize"
        >
          Price
        </label>
        <div className="relative">
          <input
            type="text"
            id="hs-input-with-leading-and-trailing-icon"
            name="hs-input-with-leading-and-trailing-icon"
            className="py-3 px-4 ps-9 pe-16 block border w-full border-gray-300 shadow-sm rounded-lg text-sm focus:z-10 "
            placeholder="0.00"
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
          className=" text-sm text-green-500 ms-2 font-bold"
        >
          Income
        </label>
        <input type="radio" value="income" name="payment-type" id="income" />
        <input type="radio" value="expense" name="payment-type" id="expense" />
        <label
          htmlFor="expense"
          className=" text-sm text-red-500 ms-2 font-bold"
        >Expense</label>
      </div>
    </div>
  );
}
