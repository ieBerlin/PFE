import { useDispatch } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice";
import { usePost } from "../../hooks/http";

export default function SendCustomMessage() {
  return (
    <div
      className="bg-white px-7 py-5 rounded-md text-start"
      style={{ minWidth: "400px" }}
    >
      <h1 className="text-gray-800 font-bold text-lg">
        Notify User of Custom Message
      </h1>

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
      <Input />
      <TextAreaInput />
      <div className="flex justify-end pt-3 gap-3">
        <CancelButton
          disabled={isFetching}
          onClick={() => dispatch(setModalType())}
        />
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
      className={`outline-none inline-flex justify-center rounded-md ${
        disabled
          ? "bg-gray-100 text-gray-400"
          : "bg-white text-gray-900 hover:bg-gray-50 ring-gray-300 ring-1 ring-inset"
      } px-3 py-2 text-sm font-semibold sm:w-auto`}
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
      className={`inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold ${
        isFetching
          ? "bg-gray-200 text-gray-500"
          : "bg-amber-500 text-white hover:bg-amber-400"
      } shadow-sm sm:w-auto`}
    >
      {isFetching ? "Processing..." : "Send Message"}
    </button>
  );
}
function TextAreaInput() {
  return (
    <>
      <label className="block text-sm font-medium my-2">Description</label>
      <textarea
        name="description"
        required
        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm border-2 focus:border-amber-400 focus:ring-amber-400 focus:outline-none"
        rows="3"
        placeholder="Enter Message Description"
      ></textarea>
    </>
  );
}
function Input() {
  return (
    <>
      <label className="block text-sm font-medium my-2">Title</label>
      <input
        name="title"
        required
        type="text"
        className="py-3 px-4 block border-gray-200 border-2  w-96 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-400 focus:outline-none"
        placeholder="Enter Message Title"
      />
    </>
  );
}
