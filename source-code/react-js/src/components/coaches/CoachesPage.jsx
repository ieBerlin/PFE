import classes from "./CoachesPage.module.css";
import { DUMMY_COACHES } from "../../dummy_data/dummy_coaches.js";
import { Await, defer, useLoaderData, useRouteLoaderData } from "react-router-dom";
import AvailableCoaches from "./AvailableCoaches.jsx";
import { Suspense } from "react";
export default function CoachesPage() {
  const { timeOut } = useRouteLoaderData('coaches-page');

  return (
    <section className={classes.sectionContainer}>
      <h1>All coaches</h1>
      <Suspense fallback={<FallbackText />}>
        <Await resolve={timeOut}>
          {(resolvedData) => <AvailableCoaches coaches={resolvedData} />}
        </Await>
      </Suspense>
    </section>
  );
}

function FallbackText() {
  return (
    <section className=" flex h-full w-full flex-col">
      <p className="text-gray-700 text-xl font-semibold text-center mt-7">
        Fetching Coaches data...
      </p>
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
