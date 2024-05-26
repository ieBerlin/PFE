import { useDispatch } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice";
import { fetchFun, getToken, usePost } from "../../hooks/http";
import { useMutation } from "@tanstack/react-query";
import { Form, useParams } from "react-router-dom";
import SuccessMessage from "../SuccessMessage";
import ErrorMessage from "../ErrorMessage";
export default function NotifyMembershipEnd() {
  return (
    <div
      className="bg-white px-7 py-5 rounded-md text-start"
      style={{ minWidth: "400px" }}
    >
      <h1 className="text-gray-800 font-bold text-lg">
        Notify User of Membership End
      </h1>
      <h2 className="text-gray-700 font-semibold text-sm">
        Are you sure you want to send a membership notification to the user?
      </h2>
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
    mutationFn: async () =>
      await fetchFun({
        url: `${"http://localhost:8081/notification"}`,
        options: {
          method: "POST",
          body: JSON.stringify({
            userId: userId,
            title: "Membership End Notification",
            message: `Dear Member,
            We're writing to inform you that your membership with Organization/Service Name is approaching its end. Your access to specific features or benefits will be discontinued as of End Date.`,
              }),
          headers: {
            "x-access-token": getToken(),
            "Content-Type": "application/json",
          },
        },
      })
  });

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
    <>
      <Form onSubmit={mutate}>
        <div className="flex justify-end pt-3 gap-3">
          <CancelButton
            disabled={isFetching}
            onClick={() => dispatch(setModalType())}
          />
          <SubmitButton isFetching={isFetching} />
        </div>
      </Form>
      {content}
    </>
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
          : "bg-green-600 text-white hover:bg-green-500"
      } shadow-sm sm:w-auto`}
    >
      {isFetching ? "Processing..." : "Send Notification"}
    </button>
  );
}
