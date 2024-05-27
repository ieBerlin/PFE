import { useRef, useState } from "react";
import RelatedUserField from "./related-user/RelatedUsers.jsx";
import { useDispatch } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice.js";
import PriceInput from "../PriceInput.jsx";
import DatePicker from "../DatePicker.jsx";
import SelectInputComponent from "../SelectInput.jsx";
import { fetchFun, getToken } from "../../hooks/http.js";
import { useMutation } from "@tanstack/react-query";
import { Form } from "react-router-dom";
import Input from "../Input.jsx";
import SuccessMessage from "../SuccessMessage.jsx";
import ErrorMessage from "../ErrorMessage.jsx";
export default function AddTransactionModal() {
  const dispatch = useDispatch();
  const submitButtonRef = useRef();

  const {
    isError,
    data,
    error,
    isPending: isSubmitting,
    mutate,
  } = useMutation({
    mutationKey: ["transactions"],
    mutationFn: async (transactionData) => {
      const response = await fetchFun({
        url: "http://localhost:8081/transactions",
        options: {
          method: "POST",
          body: JSON.stringify(transactionData),
          headers: {
            "x-access-token": getToken(),
            "Content-Type": "application/json",
          },
        },
      });
      return response;
    },
  });
  let content;
  content = !isSubmitting && isError && (
    <div className="">
      <h1 className="font-medium text-lg text-red-500">Errors </h1>
      {error
        ? Object.entries(error.info).map(([key, value]) => {
            return <ErrorMessage key={key} title={key} message={value} />;
          })
        : "An error occured!"}
    </div>
  );

  if (data && !isSubmitting) {
    dispatch(setModalType("confirm-add-transaction"));
  }
  const submitHandler = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const transactionData = {
      relatedUser: fd.get("related-user"),
      transactionType: fd.get("transaction-type"),
      method: fd.get("transaction-method"),
      price: fd.get("transaction-price"),
      paymentType: fd.get("payment-type"),
      status: fd.get("transaction-status"),
      date: fd.get("transaction-date"),
      time: fd.get("transaction-time"),
      notes: fd.get("transaction-notes"),
    };
    mutate(transactionData);
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
          name="transaction-type"
          label="Transaction Type"
          data={[
            { value: "Membership Fee", label: "Membership Fee" },
            { value: "Personal Training", label: "Personal Training" },
            { value: "Session Payment", label: "Session Payment" },
            { value: "Merchandise Purchase", label: "Merchandise Purchase" },
            { value: "other", label: "Other" },
          ]}
          placeholder="Select transaction type"
        />
        <SelectInput
          name="transaction-method"
          label="Transaction Method"
          data={[
            { value: "cash", label: "Cash" },
            { value: "credit_card", label: "Credit Card" },
            { value: "debit_card", label: "Debit Card" },
            { value: "online_payment", label: "Online Payment" },
            { value: "other", label: "Other" },
          ]}
          placeholder="Select transaction Method"
        />
        <PriceInput required name="transaction-price" />
        <PaymentType name="payment-type" />
        <SelectInput
          name="transaction-status"
          label="Transaction Status"
          data={[
            { value: "paid", label: "Paid" },
            { value: "pending", label: "Pending" },
            { value: "refunded", label: "Refunded" },
            { value: "cancelled", label: "Cancelled" },
            { value: "other", label: "Other" },
          ]}
          placeholder="Select transaction status"
        />

        <DatePicker
          required
          dateName="transaction-date"
          timeName="transaction-time"
          label="Transaction Date and Time"
        />
        <TransactionNotes name="transaction-notes" />
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
      {content}
    </div>
  );
}

function SelectInput({ label, data, name, selectedField, ...props }) {
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const handleSelectChange = (event) => {
    setIsOtherSelected(event.target.value === "other");
  };

  return (
    <div>
      <div className="relative">
        <SelectInputComponent
          label={label}
          data={data}
          name={!isOtherSelected && name}
          selectedField={selectedField}
          onChange={handleSelectChange}
          {...props}
        />
        {isOtherSelected && (
          <Input
            name={name}
            label="Other"
            placeholder={`Type the other ${label.toLowerCase()}`}
          />
        )}
      </div>
    </div>
  );
}
function PaymentType({ ...props }) {
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

function TransactionNotes({ ...props }) {
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
        className="outline-none flex w-full  py-3 px-4 ps-9 pe-16 border border-gray-300 shadow-sm rounded-lg text-sm focus:z-10 "
        placeholder="Type transaction notes"
        {...props}
      />
    </div>
  );
}
