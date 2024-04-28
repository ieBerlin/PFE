import { useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import RelatedUserField from "./RelatedUsers";
import { useDispatch } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice.js";
import PriceInput from "../PriceInput.jsx";
import DatePicker from "../DatePicker.jsx";
export default function AddTransactionModal() {
  const dispatch = useDispatch();
  const submitButtonRef = useRef();
  const { Form, state, data } = useFetcher({ key: "payments-loader" });
  const isSubmitting = state === "submitting";
  const submitHandler = (e) => {
    // e.preventDefault();
    console.log(data);
  };
  return (
    <div className="px-8 pb-4 pt-5 rounded-md bg-white">
      <h1 className="font-bold text-xl text-start">Add Transaction</h1>
      <Form
        onSubmit={submitHandler}
        method="POST"
        className="border border-gray-300 pr-12 pl-3 py-6 mx-3 my-5 rounded-md flex flex-col gap-6 w-full"
      >
        <input name="payment-action" defaultValue="add-transaction" hidden />
        <RelatedUserField label="Related User" />
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
        <DatePicker label="Transaction Date and Time" />
        <TransactionNotes />
        <button type="submit" hidden ref={submitButtonRef} />
      </Form>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          disabled={isSubmitting}
          type="button"
          className={`${isSubmitting ? "bg-gray-200" : "bg-blue-600 "}   ${
            isSubmitting ? "text-gray-500 " : "text-white"
          } outline-none inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
            !isSubmitting && "hover:bg-blue-500"
          } sm:ml-3 sm:w-auto`}
          onClick={() => {
            if (submitButtonRef) {
              submitButtonRef.current.click();
            }
          }}
        >
          {isSubmitting ? "Loading..." : "Add Transaction"}
        </button>
        <button
          disabled={isSubmitting}
          type="button"
          className={` outline-none  mt-3 inline-flex w-full justify-center rounded-md ${
            isSubmitting ? "bg-gray-100" : "bg-white"
          } px-3 py-2 text-sm font-semibold ${
            isSubmitting ? "text-gray-400" : "text-gray-900"
          } shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
          onClick={() => dispatch(setModalType())}
        >
          Cancel
        </button>
      </div>
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
