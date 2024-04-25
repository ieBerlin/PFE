import { LockClosedIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Form } from "react-router-dom";
import PasswordInput from  "../../components/modal/PasswordInput.jsx"
import { useRef } from "react";
import { useSubmit } from "../../hooks/http.js";
export default function UpdateUserPasswordPage() {
  const submitButtonRef = useRef();
  const { isFetching, fetchFuncCaller } = useSubmit();

  const submitFormHandler = (e) => {
    e.preventDefault();
    fetchFuncCaller();
  };
  return (
    <section className="py-4 px-6 bg-gray-100 flex h-full w-full flex-col">
      <h1 className="font-bold text-2xl mb-3">Update Password</h1>
      <div className="bg-white shadow-lg flex h-full w-full flex-col px-20 py-24">
        <div className="rounded-full bg-blue-100 p-3 w-min h-min ml-2">
          <LockClosedIcon className="w-8 h-8 text-blue-700" />
        </div>
        <h1 className="text-black font-bold text-2xl mt-2">Change Password</h1>
        <p className="text-gray-400 mt-2">
          To update your password, please fill out the following fields.
        </p>
        <div className="font-semibold flex justify-end w-[600px]">
          <button
            disabled={isFetching}
            onClick={() => submitButtonRef.current.click()}
            className={`${
              isFetching ? "bg-gray-200" : "bg-blue-600 "
            }  flex flex-row items-center gap-2 border border-gray-300 p-2 rounded-lg text-white`}
          >
            {!isFetching && <PencilIcon className="w-4 h-4" />}
            <p
              className={`
                         ${isFetching ? "text-gray-500 " : "text-white"}`}
            >
              {isFetching ? "Loading..." : "Save"}
            </p>
          </button>
        </div>

        <Form className="mt-4 w-[600px]" onSubmit={submitFormHandler}>
          <PasswordInput
            label="Current Password"
            placeholder="Please Enter your Current Password"
          />
          <PasswordInput
            label="New Password"
            placeholder="Enter New Password"
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
          />
          <button type="submit" className="hidden" ref={submitButtonRef} />
        </Form>
      </div>
    </section>
  );
}
