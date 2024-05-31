import FallbackText from "../../components/FallbackText";
import ErrorMessage from "../../components/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { fetchFun, getToken } from "../../hooks/http";
import ClientsItems from "./ClientsItems.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ForbiddenPage from "../../components/ForbiddenPage.jsx";
export default function ClientsPage() {
  const userRole = useSelector(
    (state) => state.userRole?.userRole?.toLowerCase() === "coach"
  );

  if (!userRole) {
   return <ForbiddenPage title=" Access Denied: Coaches Only" message="Coaches Only
   Message: This area is reserved for coaches. Please log in with your coach credentials to access this section."/>
  }
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["clients"],
    queryFn: async () =>
      await fetchFun({
        url: "http://localhost:8081/clients",
        options: {
          method: "POST",
          headers: {
            "x-access-token": getToken(),
          },
        },
      }),
  });
  return (
    <div className="bg-gray-100 min-h-[calc(100vh-60px)] px-5  pt-4">
      <h1 className="text-4xl text-black mb-5">Clients</h1>
      <div className="bg-white rounded-md px-3 py-4">
        <div className="w-full flex justify-end ">
          <Link
            className=" bg-blue-600 hover:bg-blue-500 text-white capitalize font-semibold rounded-md px-3 py-2"
            to="requests"
          >
            Clients Requests
          </Link>
        </div>
        <div className="flex flex-row w-full px-4 pt-2 mt-3 justify-between items-center">
          <div />
        </div>
        {isPending ? (
          <FallbackText title="Loading clients..." />
        ) : data && data.length > 0 ? (
          <ClientsItems data={data} />
        ) : (
          <h3 className="text-black text-xl my-5 text-center font-semibold">
            Nothing to show!
          </h3>
        )}
      </div>
      {!isPending &&
        isError &&
        Object.entries(error.info).map(([key, value]) => (
          <li key={key}>
            <ErrorMessage key={key} title={key} message={value} />
          </li>
        ))}
    </div>
  );
}
