import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice";
import LoadingIndicator from "../LoadingIndicator";
import { useMutation } from "@tanstack/react-query";
import SuccessMessage from "../SuccessMessage";
import ErrorMessage from "../ErrorMessage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isPending } from "@reduxjs/toolkit";

export default function ConfirmationModal({
  confirmActionLabel,
  title,
  description,
  onConfirm,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5); // countdown starts from 5 seconds

  const {
    isError,
    error,
    data,
    isPending: isLoading,
    mutate,
  } = useMutation({
    queryKey: ["modal"],
    mutationFn: onConfirm,
  });
  useEffect(() => {
    let timer;
    if (data) {
      timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [data]);

  useEffect(() => {
    if (counter < 1 && data) {
      dispatch(setModalType());
      navigate("/classes");
    }
  }, [counter, data, dispatch, navigate]);
  let content;
  if (isError) {
    content = (
      <div className="">
        <h1 className="font-medium text-lg text-red-500">Errors </h1>
        {error
          ? Object.entries(error.info).map(([key, value]) => (
              <ErrorMessage key={key} title={key} message={value} />
            ))
          : "An error occured!"}
      </div>
    );
  } else if (data) {
    content = (
      <div>
        <h1 className="font-medium text-lg text-emerald-500">
          Server feedback{" "}
        </h1>
        <div className="flex flex-row">
          <SuccessMessage
            title="Request Successful"
            message="Your request has been processed successfully."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white pb-4 pt-5 sm:p-6 sm:pb-4 rounded-md">
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              {title}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        </div>
      </div>
      {content}
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 items-center">
        <button
          onClick={() => mutate()}
          disabled={isLoading}
          type="submit"
          className={`${isLoading ? "bg-gray-200" : "bg-red-600"} ${
            isLoading ? "text-gray-500" : "text-white"
          } outline-none inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
            !isLoading && "hover:bg-red-500"
          } sm:ml-3 sm:w-auto`}
        >
          {isLoading ? "Processing..." : confirmActionLabel}
        </button>
        <button
          disabled={isLoading}
          type="button"
          className={`outline-none mt-3 inline-flex w-full justify-center rounded-md ${
            isLoading ? "bg-gray-100" : "bg-white"
          } px-3 py-2 text-sm font-semibold ${
            isLoading ? "text-gray-400" : "text-gray-900"
          } shadow-sm ${
            !isLoading && "hover:bg-gray-50 ring-gray-300 ring-1 ring-inset  "
          } sm:mt-0 sm:w-auto`}
          onClick={() => dispatch(setModalType())}
        >
          Cancel
        </button>
        {data && (
          <h2 className="text-lg mx-3 text-emerald-600 font-bold bg-emerald-100 p-2 rounded-full">
            {counter}
          </h2>
        )}
      </div>
    </div>
  );
}
