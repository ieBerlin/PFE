import { DUMMY_COACHES } from "../../dummy_data/dummy_coaches.js";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import AvailableCoaches from "./AvailableCoaches.jsx";
import { Suspense } from "react";
import FallbackText from "../../components/FallbackText.jsx";
export default function CoachesPage() {
  const { timeOut } = useRouteLoaderData("coaches-page");

  return (
    <section className="bg-gray-100 px-5   py-4">
      <h1 className="text-4xl text-black">Coaches</h1>
      <Suspense fallback={<FallbackText title="Fetching Coaches data..." />}>
        <Await resolve={timeOut}>
          {(resolvedData) => <AvailableCoaches coaches={resolvedData} />}
        </Await>
      </Suspense>
    </section>
  );
}

export async function loader() {
  return defer({
    timeOut: timeOut(),
  });
}

const timeOut = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(DUMMY_COACHES);
    }, 1000)
  );
};
