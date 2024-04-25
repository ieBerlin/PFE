import { useDispatch } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice";
import { usePost } from "../../hooks/http";

export default function NotifyMembershipEnd() {
  return (
    <div className="bg-white px-7 py-5 rounded-md text-start" style={{ minWidth: "400px" }}>
      <h1 className="text-gray-800 font-bold text-lg">Notify User of Membership End</h1>
      <h2 className="text-gray-700 font-semibold text-sm">
        Are you sure you want to send a membership notification to the user?
      </h2>
      <MembershipNotificationForm />
    </div>
  );
}

function MembershipNotificationForm() {
  const { isFetching, handlePost } = usePost();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    handlePost();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-end pt-3 gap-3">
        <CancelButton disabled={isFetching} onClick={() => dispatch(setModalType())} />
        <SubmitButton isFetching={isFetching} />
      </div>
    </form>
  );
}

function CancelButton({ disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={`outline-none inline-flex justify-center rounded-md ${disabled ? "bg-gray-100 text-gray-400" : "bg-white text-gray-900 hover:bg-gray-50 ring-gray-300 ring-1 ring-inset"} px-3 py-2 text-sm font-semibold sm:w-auto`}
    >
      Cancel
    </button>
  );
}

function SubmitButton({ isFetching }) {
  return (
    <button
      disabled={isFetching}
      type="submit"
      className={`inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold ${isFetching ? "bg-gray-200 text-gray-500" : "bg-green-600 text-white hover:bg-green-500"} shadow-sm sm:w-auto`}
    >
      {isFetching ? "Processing..." : "Send Notification"}
    </button>
  );
}
