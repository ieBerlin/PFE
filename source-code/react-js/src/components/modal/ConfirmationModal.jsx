import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";

export default function ConfirmationModal({
  confirmActionLabel,
  title,
  description,
  onConfirm,
  mutationFn,
}) {
  const dispatch = useDispatch();
  const {
    isError,
    error,
    data,
    isPending: isLoading,
    mutate,
  } = useMutation({
    queryKey: ["modal"],
    mutationFn,
  });
if(isError){
  console.log(error)
}
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
    onConfirm();
  }

  return (
    <div className="bg-white pb-4 pt-5 sm:p-6 sm:pb-4 rounded-md">
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

      {content}
      <div className="px-2 flex justify-start flex-row-reverse items-center mt-3">
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
      </div>
    </div>
  );
}
