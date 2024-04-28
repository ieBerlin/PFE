import { DUMMY_CLASSES } from "../../dummy_data/dummy_classes.js";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import FallbackText from "../../components/FallbackText.jsx";
import ClassesList from "./ClassesList.jsx";

export default function ClassesPage() {
  const { timeOut: timeOutLoader } = useRouteLoaderData("classes-page-id");
  return (
    <section className="bg-gray-50 min-h-[calc(100vh-60px)] px-4  pb-40 pt-5 sm:px-6 ">
      <h3 className="font-bold text-xl">Start exploring classes</h3>
      <Suspense fallback={<FallbackText title="Fetching available classes" />}>
        <Await resolve={timeOutLoader}>
          {(resolvedData) => <ClassesList data={resolvedData} />}
        </Await>
      </Suspense>
    </section>
  );
}
export function loader() {
  return defer({
    timeOut: timeOut(),
  });
}
export function action() {
  return;
}
function timeOut() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(DUMMY_CLASSES);
    }, 0)
  );
}
