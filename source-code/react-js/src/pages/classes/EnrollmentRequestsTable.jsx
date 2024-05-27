import { Link } from "react-router-dom";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@tanstack/react-query";
import { fetchFun, getToken, queryClient } from "../../hooks/http";
export default function EnrollmentRequestsTable({ data }) {
  const filteredBookings = data;
  return (
    <div className="flex flex-col bg-white shadow-sm px-2 mt-7">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Request ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Class ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Request Date
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Applicant User ID
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {filteredBookings.map((request, index) => {
                  const date = new Date(request.date).toLocaleDateString(
                    "en-US",
                    { day: "numeric", month: "short", year: "numeric" }
                  );
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                        {request.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium ">
                        {request.class_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                        {date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                        <Link to={`/user/${request.applicant_user_id}`}>
                          {request.applicant_user_id}
                        </Link>
                      </td>
                      <RequestStatus data={request.status} />
                      {request?.status === "pending" && (
                        <ActionButtons data={request.id} />
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
function ActionButtons({ data }) {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
      <div className="flex flex-row gap-2">
        <Button
          onMutate={async () => {
            try {
              return await fetchFun({
                url: "http://localhost:8081/class/class-status/" + data,
                options: {
                  method: "PUT",
                  body: JSON.stringify({ requestId: data, status: "rejected" }),
                  headers: {
                    "x-access-token": getToken(),
                    "Content-Type": "application/json",
                  },
                },
              });
            } catch (error) {
              return;
            }
          }}
        >
          <XMarkIcon className="text-red-500 w-5 h-5" />
        </Button>
        <Button
          onMutate={async () => {
            try {
              return await fetchFun({
                url: "http://localhost:8081/class/class-status/" + data,
                options: {
                  method: "PUT",
                  body: JSON.stringify({
                    requestId: data,
                    status: "confirmed",
                  }),
                  headers: {
                    "x-access-token": getToken(),
                    "Content-Type": "application/json",
                  },
                },
              });
            } catch (error) {
              return;
            }
          }}
        >
          <CheckIcon className="text-emerald-500 w-5 h-5" />
        </Button>
      </div>
    </td>
  );
}
function Button({ children, onMutate }) {
  const { mutate } = useMutation({
    mutationKey: ["enrollments-requests"],
    mutationFn: onMutate,
    onSuccess: () => queryClient.invalidateQueries(["enrollments-requests"]),
  });
  return <button onClick={mutate}>{children}</button>;
}
function RequestStatus({ data }) {
  let color;
  if (data === "pending") {
    color = "text-amber-500";
  } else if (data === "confirmed") {
    color = "text-emerald-500";
  } else {
    color = "text-red-500";
  }
  return (
    <td
      className={
        "px-6 py-4 whitespace-nowrap text-sm " + color + " font-medium"
      }
    >
      {data}
    </td>
  );
}
