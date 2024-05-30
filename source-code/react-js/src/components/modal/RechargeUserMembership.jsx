import { Form, useParams } from "react-router-dom";
import { setModalType } from "../../features/modal/modalSlice";
import ErrorMessage from "../ErrorMessage.jsx";
import { fetchFun, getToken } from "../../hooks/http.js";
import { useDispatch } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../LoadingIndicator.jsx";
import SelectInput from "../SelectInput.jsx";
import PriceInput from "../PriceInput.jsx";
export default function RechargeUserMembership({ remainingDay }) {
  const { userId } = useParams();
  const { data: queryData, isFetching: isQueryPending } = useQuery({
    queryKey: ["membership"],
    queryFn: async () =>
      await fetchFun({
        url: `http://localhost:8081/membership/membership-status/${userId}`,
        options: {
          method: "GET",
          headers: {
            "x-access-token": getToken(),
          },
        },
      }),
  });
  const {
    isPending: isFetching,
    mutate,
    isError,
    error,
  } = useMutation({
    mutationKey: ["recharge"],

    mutationFn: async (data) =>
      await fetchFun({
        url:
          `http://localhost:8081/membership/recharge-user-membership/` + userId,
        options: {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "x-access-token": getToken(),
            "Content-Type": "application/json",
          },
        },
      }),
    onSuccess: () => dispatch(setModalType("confirm-recharge-membership")),
  });
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitted')
    const formData = new FormData(event.target);
    const fd = {
      rechargeAmount: formData.get("price"),
      membershipType: formData.get("membership-type"),
    };
    mutate(fd);
  };
  let errorContent;
  errorContent = !isFetching && isError && (
    <div className="">
      <h1 className="font-medium text-lg text-red-500">Errors </h1>
      {error
        ? Object.entries(error.info).map(([key, value]) => {
            return <ErrorMessage key={key} title={key} message={value} />;
          })
        : "An error occured!"}
    </div>
  );

  let content;
  if (isQueryPending) {
    content = (
      <div className="bg-white flex justify-center">
        <LoadingIndicator />
      </div>
    );
  } else {
    content = (
      <>
        <h1 className="text-gray-800 font-bold text-lg">
          User Has {queryData?.daysLeft ?? 0} Days Left
        </h1>
        {!queryData?.status && (
          <h2 className="text-gray-700 font-semibold text-sm">
            Are you sure you want to recharge it?
          </h2>
        )}
        <Form onSubmit={handleSubmit}>
          {!queryData?.status && (
            <div>
              <div>
                <SelectInput
                  name="membership-type"
                  label="Membership Type"
                  data={[
                    { value: "basic", label: "Basic Membership" },
                    { value: "standard", label: "Standard Membership" },
                    { value: "premium", label: "Premium Membership" },
                  ]}
                  placeholder="Select membership type"
                />
                <PriceInput name="price" />
              </div>
            </div>
          )}

          <div className="pl-24 pt-3 flex flex-row w-full justify-end">
            <button
              disabled={isFetching}
              type="button"
              className={`outline-none mt-3 inline-flex w-full justify-center rounded-md ${
                isFetching ? "bg-gray-100" : "bg-white"
              } px-3 py-2 text-sm font-semibold ${
                isFetching ? "text-gray-400" : "text-gray-900"
              } shadow-sm ${
                !isFetching &&
                "hover:bg-gray-50 ring-gray-300 ring-1 ring-inset  "
              } sm:mt-0 sm:w-auto`}
              onClick={() => dispatch(setModalType())}
            >
              Cancel
            </button>
            <button
              disabled={isFetching || queryData?.status}
              type="submit"
              className={` ${
                isFetching || queryData?.status ? "bg-gray-200" : "bg-cyan-600"
              } ${
                isFetching || queryData?.status ? "text-gray-500" : "text-white"
              } outline-none inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                !isFetching && !queryData?.status && "hover:bg-cyan-500"
              } sm:ml-3 sm:w-auto`}
            >
              {isFetching
                ? "Processing..."
                : queryData?.status
                ? "Already recharged"
                : "Confirm Recharge"}
            </button>
          </div>
        </Form>
        {errorContent}
      </>
    );
  }
  return (
    <div
      className="bg-white px-7 py-5 rounded-md text-start"
      style={{ minWidth: "400px" }}
    >
      {content}
    </div>
  );
}
