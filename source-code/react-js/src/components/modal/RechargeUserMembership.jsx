import { setModalType } from "../../features/modal/modalSlice";
import { usePost } from "../../hooks/http.js";
import { useDispatch } from "react-redux";
export default function RechargeUserMembership({ remainingDay }) {
  return (
    <div
      className="bg-white px-7 py-5 rounded-md text-start "
      style={{ minWidth: "400px" }}
    >
      <h1 className="text-gray-800 font-bold text-lg">
        User Has {remainingDay ?? 0} Days Left
      </h1>
      <h2 className="text-gray-700 font-semibold text-sm">
        Are you sure you want to recharge it?
      </h2>
      <RechargeForm />
    </div>
  );
}

function RechargeForm() {
  const { isFetching, handlePost } = usePost();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    handlePost(); // Call handlePost to initiate recharge
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="pl-24 pt-3 flex flex-row w-full justify-end">
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
        <button
          disabled={isFetching}
          type="submit"
          className={` ${isFetching ? "bg-gray-200" : "bg-cyan-600"} ${
            isFetching ? "text-gray-500" : "text-white"
          } outline-none inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
            !isFetching && "hover:bg-cyan-500"
          } sm:ml-3 sm:w-auto`}
        >
          {isFetching ? "Processing..." : "Confirm Recharge"}
        </button>
      </div>
    </form>
  );
}
