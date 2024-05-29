import { useRef } from "react";
import { Form } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { setModalType } from "../../features/modal/modalSlice.js";
import ErrorMessage from "../ErrorMessage.jsx";
import { useMutation } from "@tanstack/react-query";
import { processSignUpForm, fetchFun } from "../../hooks/http.js";
import SignUpForm from "../../pages/auth/Form/SignUpForm.jsx";
export default function AddUserModal() {
  const errorsRef = useRef();

  const dispatch = useDispatch();
  const isAdmin = useSelector(
    (state) => state.userRole.userRole?.toLowerCase() === "admin"
  );
  const { isError, error, data, mutate, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (userData) =>
      await fetchFun({
        url: "http://localhost:8081/user/auth/signup",
        options: {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        },
      }),
      onSuccess:()=>{
        window.location.reload();
      }
  });

  const submitButtonRef = useRef();

  const scrollToRef = () => {
    if (errorsRef.current) {
      errorsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  async function handleSubmitForm(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const userData = await processSignUpForm(fd);
    mutate(userData);
  }
  return (
    <div className="px-8 pb-4 pt-5 rounded-md bg-white">
      <Form
        onSubmit={handleSubmitForm}
        className=""
      >
        <input name="form-type" defaultValue="sign-up-form" hidden />
        <h3 className="text-black font-semibold text-xl mb-4">
          User information
        </h3>
        <SignUpForm submitButtonRef={submitButtonRef} />
      </Form>
      {!isPending &&
        isError &&
        Object.entries(error.info).map(([key, value]) => (
          <li key={key}>
            <ErrorMessage key={key} title={key} message={value} />
          </li>
        ))}
      {/*  {!isPending && isError && (
        <ul className="bg-white px-8 flex flex-col gap-2" ref={errorsRef}>
          {typeof errors === "object" ? (
            Object.entries(error.info).map(([key, value]) => (
              <li key={key}>
                <ErrorMessage key={key} title={key} message={value} />
              </li>
            ))
          ) : (
            <li>
              <div
                className="bg-red-100 border-s-4 border-red-500 p-4 "
                role="alert"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 ">
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </span>
                  </div>
                  <div className="ms-3">
                    <h3 className="text-gray-800 font-semibold capitalize">
                      Error
                    </h3>
                    <p className="text-sm text-gray-700 capitalize">
                      {data.errors ||
                        "An error occurred while processing your request."}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          )}
        </ul>
      )} */}
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          disabled={isPending}
          type="button"
          className={`${isPending ? "bg-gray-200" : "bg-blue-600 "}   ${
            isPending ? "text-gray-500 " : "text-white"
          } outline-none inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
            !isPending && "hover:bg-blue-500"
          } sm:ml-3 sm:w-auto`}
          onClick={() => {
            if (submitButtonRef) {
              submitButtonRef.current.click();
              scrollToRef();
            }
          }}
        >
          {isPending ? "Loading..." : isAdmin ? "Add user" : "Sign Up"}
        </button>
        <button
          disabled={isPending}
          type="button"
          className={` outline-none  mt-3 inline-flex w-full justify-center rounded-md ${
            isPending ? "bg-gray-100" : "bg-white"
          } px-3 py-2 text-sm font-semibold ${
            isPending ? "text-gray-400" : "text-gray-900"
          } shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
          onClick={() => dispatch(setModalType())}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
