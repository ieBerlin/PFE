import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice";
import LoadingIndicator from "../LoadingIndicator";
import { useFetch } from "../../hooks/http";

export default function DeleteUserModal({ onClose, onConfirm }) {
  const dispatch = useDispatch();
  const { isFetching, fetchData } = useFetch(() => {});

  function handleDeleteButtonClick() {
    fetchData().then();
  }

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
              Delete User
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this account? All of the data
                will be permanently removed. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 items-center">
        <button
          disabled={isFetching}
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={handleDeleteButtonClick}
        >
          {isFetching ? <LoadingIndicator fill="gray-500" /> : "Delete"}
        </button>
        <button
          disabled={isFetching}
          type="button"
          className={` outline-none  mt-3 flex h-min rounded-md ${
            isFetching ? "bg-gray-100" : "bg-white"
          } px-3 py-2 text-sm font-semibold ${
            isFetching ? "text-gray-400" : "text-gray-900"
          } shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
          onClick={() => dispatch(setModalType())}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
