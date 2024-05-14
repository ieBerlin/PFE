import { Suspense } from "react";
import FallbackText from "../../components/FallbackText";
import ErrorMessage from "../../components/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { fetchFun, getToken } from "../../hooks/http";
import ClientsItems  from "./ClientsItems.jsx"
export default function ClientsPage() {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["clients"],
    queryFn: async () =>
      await fetchFun({
        url: "http://localhost:8081/clients",
        options: {
          method: "GET",
          headers: {
            "x-access-token": getToken(),
          },
        },
      }),
  });
  return (
    <main className="bg-gray-100 w-full px-5 pt-4 pb-10">
      <h1 className="text-4xl mb-1">Payments</h1>
      <Suspense
        fallback={<FallbackText title="Fetching available transactions data" />}
      >
        {isPending ? (
          <FallbackText title="Loading clients..." />
        ) : data && data.length > 0 ? (
          <ClientsItems data={data} />
        ) : (
          <h3 className="text-black text-xl my-5 text-center font-semibold">
            Nothing to show!
          </h3>
        )}
        {!isPending &&
          isError &&
          Object.entries(error.info).map(([key, value]) => (
            <li key={key}>
              <ErrorMessage key={key} title={key} message={value} />
            </li>
          ))}
      </Suspense>
    </main>
  );
}
