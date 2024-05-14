import { Await, json, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import FallbackText from "../../components/FallbackText.jsx";
import ClassesList from "./ClassesList.jsx";
import { fetchFun, getToken } from "../../hooks/http.js";
export default function ClassesPage() {
  const dataLoader = useRouteLoaderData("classes-page-id");
  return (
    <section className="bg-gray-50 min-h-[calc(100vh-60px)] px-4  pb-40 pt-5 sm:px-6 ">
      <h3 className="font-bold text-xl">Start exploring classes</h3>
      <Suspense fallback={<FallbackText title="Fetching available classes" />}>
        <Await resolve={dataLoader}>
          {(resolvedData) => <ClassesList data={resolvedData} />}
        </Await>
      </Suspense>
    </section>
  );
}
export function loader() {
  const token = getToken();
  if (!token) {
    return json({ status: 403 });
  }
  return fetchFun({
    url: "http://localhost:8081/class",
    options: {
      headers: { "x-access-token": token, method: "GET" },
    },
  });
}
export function action() {
  return;
}
