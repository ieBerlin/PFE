import classes from "./CoachesPage.module.css";
import { DUMMY_COACHES } from "../../dummy_data/dummy_coaches.js";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import AvailableCoaches from "./AvailableCoaches.jsx";
import { Suspense } from "react";
import FallbackText from "../../components/FallbackText.jsx";
export default function CoachesPage() {
  const { timeOut } = useRouteLoaderData("coaches-page");

  return (
    <section className={classes.sectionContainer}>
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
