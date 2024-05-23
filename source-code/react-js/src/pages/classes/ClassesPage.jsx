import { Await, json, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import FallbackText from "../../components/FallbackText.jsx";
import ClassesList from "./ClassesList.jsx";
import { fetchFun, getToken } from "../../hooks/http.js";
export default function ClassesPage() {
  const dataLoader = useRouteLoaderData("classes-page-id");
  return (
    <section className="bg-gray-100 min-h-[calc(100vh-60px)] px-5  pb-40 pt-4">
      <h1 className="text-4xl text-black">Classes</h1>
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
