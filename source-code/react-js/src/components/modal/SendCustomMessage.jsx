import { useDispatch } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice";
import { fetchFun, getToken, usePost } from "../../hooks/http";
import { useMutation } from "@tanstack/react-query";
import { Form, useParams } from "react-router-dom";
import SuccessMessage from "../SuccessMessage";
import ErrorMessage from "../ErrorMessage";

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
  const dispatch = useDispatch();
  const { userId } = useParams();
  const {
    isPending: isFetching,
    mutate,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["recharge"],
    mutationFn: async (data) =>
      await fetchFun({
        url: `${"http://localhost:8081/notification"}`,
        options: {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "x-access-token": getToken(),
            "Content-Type": "application/json",
          },
        },
      }),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fd = {
      userId: userId,
      title: formData.get("title"),
      message: formData.get("description"),
    };
    mutate(fd);
  };
  let content;
  content = !isFetching && isError && (
    <div className="">
      <h1 className="font-medium text-lg text-red-500">Errors </h1>
      {error
        ? Object.entries(error.info).map(([key, value]) => {
            console.log(error.info);
            return <ErrorMessage key={key} title={key} message={value} />;
          })
        : "An error occured!"}
    </div>
  );

  if (data && !isFetching) {
    content = (
      <div className="">
        <h1 className="font-medium text-lg text-emerald-500">
          Server feedback{" "}
        </h1>
        <SuccessMessage
          title="Request Successful"
          message="Your request has been processed successfully."
        />
      </div>
    );
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Input />
      <TextAreaInput />
      <div className="flex justify-end pt-3 gap-3">
        <CancelButton
          disabled={isFetching}
          onClick={() => dispatch(setModalType())}
        />
        <SubmitButton isFetching={isFetching} />
      </div>
      {content}
    </Form>
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
