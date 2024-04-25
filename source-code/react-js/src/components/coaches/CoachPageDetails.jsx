import { Suspense } from "react";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import { DUMMY_COACHES } from "../../dummy_data/dummy_coaches.js";
import FallbackText from "../FallbackText.jsx";
import CoachesList from "./CoachesList.jsx";
export async function loader({ params }) {
  const { coachId } = params;
  return defer({
    timeOut: timeOut({ coachId }),
  });
}
const timeOut = ({ coachId }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const coachData = DUMMY_COACHES.find(
        (coach) => coach.coachId === +coachId
      );
      if (coachData) {
        resolve(coachData);
      } else {
        reject(new Error("Coach not found"));
      }
    }, 1000);
  });
};

export default function App() {
  const { timeOut } = useRouteLoaderData("coach-details-id");

  return (
    <div className="bg-white-100">
      <Suspense
        fallback={<FallbackText title="Fetching coach informations..." />}
      >
        <Await resolve={timeOut}>
          {(loadedEvents) => {
            return <CoachesList data={{ ...loadedEvents }} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
