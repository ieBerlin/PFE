import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice.js";
import { usePost } from "../../hooks/http.js";
import LoadingIndicator from "../LoadingIndicator.jsx";
export default function ResetPasswordModal() {
  const dispatch = useDispatch();
  const { isFetching, handlePost } = usePost();

  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              className="h-6 w-6 text-emerald-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Reset User Password
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                You're about to reset the password for the user. Confirm your
                action below. Once reset, the user will receive an email guiding
                them through the process of setting up a new password.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 items-center">
        <button
          disabled={isFetching}
          type="button"
          className={` justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 sm:ml-3 sm:w-auto`}
          onClick={handlePost}
        >
          {isFetching ? <LoadingIndicator fill="gray-600" /> : "Reset Password"}
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
