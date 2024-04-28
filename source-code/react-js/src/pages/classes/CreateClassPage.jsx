import { useRef } from "react";
import Input from "../../components/Input.jsx";
import TextAreaInput from "../../components/TextAreaInput.jsx";
import RelatedUsers from "../../components/modal/RelatedUsers.jsx";
import DatePicker from "../../components/DatePicker.jsx";
import PriceInput from "../../components/PriceInput.jsx";
import { Link, useFetcher } from "react-router-dom";

export default function CreateClassPage() {
  const submitButtonRef = useRef();
  const { Form, state, data } = useFetcher({
    key: "create-class-id",
  });
  console.log(data);
  const isLoading = state === "submitting";

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
        <Form method="POST" className="p-2">
          <Input label="Class Name" placeholder="Enter Class Name" />
          <TextAreaInput label="Class Description" />
          <CategorySelect />
          <RelatedUsers
            label=" Who will be coaching this class?"
            userType="coach"
          />
          <DateTimePicker label="Start Date and Time" />
          <DateTimePicker label="End Date and Time" />
          <AdditionalInformation />
          <input type="submit" value="" hidden ref={submitButtonRef} />
        </Form>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            disabled={isLoading}
            type="button"
            className={`${
              isLoading ? "bg-gray-200" : "bg-blue-600"
            } text-white outline-none inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
              !isLoading && "hover:bg-blue-500"
            } sm:ml-3 sm:w-auto`}
            onClick={() => {
              if (submitButtonRef.current) {
                submitButtonRef.current.click();
              }
            }}
          >
            {isLoading ? "Loading..." : "Add Class"}
          </button>
          <Link
            disabled={isLoading}
            to="/classes"
            className={`outline-none mt-3 inline-flex w-full justify-center rounded-md ${
              isLoading ? "bg-gray-100" : "bg-white"
            } px-3 py-2 text-sm font-semibold ${
              isLoading ? "text-gray-400" : "text-gray-900"
            } shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

function CategorySelect() {
  return (
    <div>
      <label className="block text-sm font-medium my-2">Category</label>
      <div className="relative">
        <select className="border-2 p-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 outline-none ">
          <option value="kickboxing">Kickboxing</option>
          <option value="fitness">Fitness</option>
          <option value="cardio">Cardio</option>
          <option value="bodybuilding">Bodybuilding</option>
        </select>
      </div>
    </div>
  );
}

function AdditionalInformation() {
  return (
    <div className="grid grid-cols-2 items-center justify-center">
      <div>
        <Input label="Maximum Class Size" type="number" />
      </div>
      <div>
        <PriceInput />
      </div>
    </div>
  );
}

function DateTimePicker({ label }) {
  return <DatePicker label={label} />;
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
