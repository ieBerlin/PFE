import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice";
import LoadingIndicator from "../LoadingIndicator";
import { usePost } from "../../hooks/http";
export default function ConfirmationModal({
  confirmActionLabel,
  title,
  description,
  onConfirm,
}) {
  const dispatch = useDispatch();
  const { isFetching, handlePost } = usePost();
  return (
    <>
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
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 items-center">
        <button
          onClick={handlePost}
          disabled={isFetching}
          type="submit"
          className={`${isFetching ? "bg-gray-200" : "bg-red-600"} ${
            isFetching ? "text-gray-500" : "text-white"
          } outline-none inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
            !isFetching && "hover:bg-red-500"
          } sm:ml-3 sm:w-auto`}
        >
          {isFetching ? "Processing..." : confirmActionLabel}
        </button>
        <button
          disabled={isFetching}
          type="button"
          className={`outline-none mt-3 inline-flex w-full justify-center rounded-md ${
            isFetching ? "bg-gray-100" : "bg-white"
          } px-3 py-2 text-sm font-semibold ${
            isFetching ? "text-gray-400" : "text-gray-900"
          } shadow-sm ${
            !isFetching && "hover:bg-gray-50 ring-gray-300 ring-1 ring-inset  "
          } sm:mt-0 sm:w-auto`}
          onClick={() => dispatch(setModalType())}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
