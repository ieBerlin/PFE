import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchFun, getToken, queryClient } from "../../../hooks/http";
import FallbackText from "../../../components/FallbackText";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import ForbiddenPage from "../../../components/ForbiddenPage";

export default function ClientsRequestsPage() {
  const userRole = useSelector(
    (state) => state.userRole?.userRole?.toLowerCase() === "coach"
  );

  if (!userRole) {
   return <ForbiddenPage title=" Access Denied: Coaches Only" message="Coaches Only
   Message: This area is reserved for coaches. Please log in with your coach credentials to access this section."/>
  }
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["clientsss"],
    queryFn: async () =>
      await fetchFun({
        url: "http://localhost:8081/clients",
        options: {
          method: "POST",
          body: JSON.stringify({ status: "true" }),
          headers: {
            "x-access-token": getToken(),
            "Content-Type": "application/json",
          },
        },
      }),
  });
  if (isFetching) {
    return <FallbackText title="Fetching Available equipments bookings" />;
  }
  console.log(data);
  return (
    <div>
      <main className="bg-gray-50 w-full px-5 pt-4 pb-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
              >
                User Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
              >
                User Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
              >
                ACTIONS
              </th>
            </tr>
          </thead>
          {data && data.length > 0 ? (
            <tbody className="divide-y divide-gray-200">
              {data.map((memberData, index) => {
                const image = memberData?.image
                  ? "http://localhost:8081/uploads/images/profile/" +
                    memberData.image
                  : "http://localhost:8081/uploads/images/profile/default-user-image.webp";
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {memberData.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                      {memberData.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                      <img
                        src={image}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                      <ActionButtons data={memberData.member_id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <h3 className="text-black text-xl my-5 text-center font-semibold bg-gray-100 py-3 rounded-md">
                    Nothing to show!
                  </h3>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </main>
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
                url: "http://localhost:8081/clients/enroll",
                options: {
                  method: "PUT",
                  body: JSON.stringify({ memberId: data, status: "rejected" }),
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
                url: "http://localhost:8081/clients/enroll",
                options: {
                  method: "PUT",
                  body: JSON.stringify({
                    memberId: data,
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
    onError: (err) => console.log(err),
  });
  return <button onClick={mutate}>{children}</button>;
}
