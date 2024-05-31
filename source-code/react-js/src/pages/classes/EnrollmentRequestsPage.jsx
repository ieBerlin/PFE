import { fetchFun, getToken } from "../../hooks/http.js";
import FallbackText from "../../components/FallbackText.jsx";
import EnrollmentRequestsTable from "./EnrollmentRequestsTable.jsx";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import { useSelector } from "react-redux";
import ForbiddenPage from "../../components/ForbiddenPage.jsx";
export default function EnrollmentRequestsPage() {
  const userRole = useSelector(
    (state) => state.userRole?.userRole?.toLowerCase() === "admin"
  );

  if (!userRole) {
    return (
      <ForbiddenPage
        title=" Access Denied: Admins Only"
        message="You do not have the necessary permissions to view this area. Admin access is required."
      />
    );
  }
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["enrollments-requests"],
    queryFn: async () => {
      try {
        return await fetchFun({
          url: "http://localhost:8081/class/enrollment-requests",
          options: {
            headers: { "x-access-token": getToken(), method: "GET" },
          },
        });
      } catch (error) {
        return [];
      }
    },
  });
  let content;
  if (isPending) {
    content = <FallbackText title="Fetching enrollement requests" />;
  }
  if (isError) {
    content = (
      <div className="">
        <h1 className="font-medium text-lg text-red-500">Errors </h1>
        {error
          ? Object.entries(error.info).map(([key, value]) => (
              <ErrorMessage key={key} title={key} message={value} />
            ))
          : "An error occured!"}
      </div>
    );
  }
  if (data) {
    content = <EnrollmentRequestsTable data={data} />;
  }
  return (
    <div className="bg-gray-100 min-h-[calc(100vh-60px)] px-5  pb-40 pt-4">
      <h1 className="text-4xl text-black">Enrollement Requests</h1>
      {content}
    </div>
  );
}
