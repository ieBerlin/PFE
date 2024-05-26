import AvailableCoaches from "./AvailableCoaches.jsx";
import FallbackText from "../../components/FallbackText.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import { fetchFun, getToken } from "../../hooks/http.js";
import { useQuery } from "@tanstack/react-query";
export default function CoachesPage() {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["coaches"],
    staleTime: Infinity,
    retry: false,
    queryFn: async () =>
      await fetchFun({
        url: "http://localhost:8081/coaches",
        options: {
          method: "GET",
          headers: {
            "x-access-token": getToken(),
          },
        },
      }),
  });
  if (isPending) {
    return <FallbackText title="Fetching Coaches data..." />;
  }

  if (isError) {
    if (error.code === 404) {
      // throw { status: 404 };
      return <FallbackText title="No coach found!" />;
    }
    return (
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
  }
  if (!data) {
    <p className="text-black text-center text-xl font-semibold my-16">
      Nothing to show
    </p>;
  }

  return (
    <section className="bg-gray-100 px-5   py-4">
      <h1 className="text-4xl text-black">Coaches</h1>
      <AvailableCoaches coaches={data} />
    </section>
  );
}
