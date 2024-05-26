import { useRef } from "react";
import Input from "../../components/Input.jsx";
import TextAreaInput from "../../components/TextAreaInput.jsx";
import RelatedUsers from "../../components/modal/related-user/RelatedUsers.jsx";
import DatePicker from "../../components/DatePicker.jsx";
import PriceInput from "../../components/PriceInput.jsx";
import { Form, Link } from "react-router-dom";
import { categories } from "../../components/modal/AddEquipmentModal.jsx";
import SelectInput from "../../components/SelectInput.jsx";
import { useMutation } from "@tanstack/react-query";
import { fetchFun, getToken } from "../../hooks/http.js";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import { setModalType } from "../../features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
export default function CreateClassPage() {
  const dispatch = useDispatch();
  const submitButtonRef = useRef();
  const { isPending, data, isError, error, mutate } = useMutation({
    mutationKey: ["classes", "create-class"],
    mutationFn: async (data) => {
      return await fetchFun({
        url: "http://localhost:8081/class",
        options: {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": getToken(),
          },
        },
      });
    },
  });
  function handleSubmitForm(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const classData = {
      name: fd.get("class-name"),
      description: fd.get("class-description"),
      category: fd.get("class-category"),
      instructorEmail: fd.get("related-user"),
      startDate: fd.get("class-start-date"),
      endDate: fd.get("class-end-date"),
      startTime: fd.get("class-start-time"),
      endTime: fd.get("class-end-time"),
      price: fd.get("class-price"),
      maxSize: fd.get("class-max-size"),
      
    };
    mutate(classData);
  }
  let content;
  content = !isPending && isError && (
    <div className="">
      <h1 className="font-medium text-lg text-red-500">Errors </h1>
      {error
        ? Object.entries(error.info).map(([key, value]) => {
            return <ErrorMessage key={key} title={key} message={value} />;
          })
        : "An error occured!"}
    </div>
  );

  if (data && !isPending) {
    dispatch(setModalType("create-class"));
  }
  return (
    <div className="bg-gray-100 p-4">
      <h4 className="font-bold text-xl text-gray-700 mb-4">
        Add Basic Class Information
      </h4>
      <div className="flex flex-col w-full bg-white p-4">
        <h3 className="font-medium text-black capitalize text-start">
          Basic Information
        </h3>
        <hr className="w-full h-1 my-4" />
        <Form onSubmit={handleSubmitForm} method="POST" className="p-2">
          <Input
            name="class-name"
            label="Class Name"
            placeholder="Enter Class Name"
          />
          <TextAreaInput name="class-description" label="Class Description" />
          <SelectInput
            label="Category"
            name="class-category"
            data={categories}
          />
          <RelatedUsers
            name="class-related-user"
            label=" Who will be coaching this class?"
            userType="coach"
          />
          <DatePicker
            label="Start Date and Time"
            dateName="class-start-date"
            timeName="class-start-time"
          />
          <DatePicker
            label="End Date and Time"
            dateName="class-end-date"
            timeName="class-end-time"
          />
          <AdditionalInformation />
          <input type="submit" value="" hidden ref={submitButtonRef} />
        </Form>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            disabled={isPending}
            type="button"
            className={`${
              isPending ? "bg-gray-400" : "bg-blue-600"
            } text-white outline-none inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
              !isPending && "hover:bg-blue-500"
            } sm:ml-3 sm:w-auto`}
            onClick={() => {
              if (submitButtonRef.current) {
                submitButtonRef.current.click();
              }
            }}
          >
            {isPending ? "Loading..." : "Add Class"}
          </button>
          <Link
            disabled={isPending}
            to="/classes"
            className={`outline-none mt-3 inline-flex w-full justify-center rounded-md ${
              isPending ? "bg-gray-100" : "bg-white"
            } px-3 py-2 text-sm font-semibold ${
              isPending ? "text-gray-400" : "text-gray-900"
            } shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
          >
            Cancel
          </Link>
        </div>
        {content}
      </div>
    </div>
  );
}

function AdditionalInformation() {
  return (
    <div className="grid grid-cols-2 items-center justify-center">
      <div>
        <Input name="class-max-size" label="Maximum Class Size" type="number" />
      </div>
      <div>
        <PriceInput name="class-price" />
      </div>
    </div>
  );
}

function timeOut() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
}
export async function action() {
  await timeOut();
  return null;
}
